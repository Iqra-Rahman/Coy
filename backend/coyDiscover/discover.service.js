const { User, Swipe, Match, sequelize } = require("../models");
const { Op, Transaction } = require("sequelize");
const AppError = require("../utils/appError");

const DEMO_USER_ID = Number(process.env.DEMO_USER_ID || 1);

const getCurrentUserName = async () => {
  const user = await User.findByPk(DEMO_USER_ID, {
    attributes: ["name"],
  });

  if (!user) {
    throw new AppError("Profile not found", 404);
  }

  return user.name;
};

const PROFILE_ATTRIBUTES = [
  "id",
  "name",
  "age",
  "photo_url",
  "bio",
  "city",
  "interests",
];

const getFeed = async () => {
  const swipes = await Swipe.findAll({
    where: {
      swiper_id: DEMO_USER_ID,
    },
    attributes: ["target_id"],
    raw: true,
  });

  const excludedIds = [
    DEMO_USER_ID,
    ...swipes.map((swipe) => swipe.target_id),
  ];

  const profiles = await User.findAll({
    where: {
      id: {
        [Op.notIn]: excludedIds,
      },
    },
    attributes: PROFILE_ATTRIBUTES,
    order: [["id", "ASC"]],
  });

  return profiles;
};

const recordSwipe = async (targetId, action) => {
  if (!Number.isInteger(targetId) || targetId <= 0) {
    throw new AppError("Invalid profile ID", 400);
  }

  if (!["like", "pass"].includes(action)) {
    throw new AppError("Action must be like or pass", 400);
  }

  if (targetId === DEMO_USER_ID) {
    throw new AppError("You cannot swipe on yourself", 400);
  }

  return sequelize.transaction(
    {
      type: Transaction.TYPES.IMMEDIATE,
    },
    async (transaction) => {
      // check target profile exists
      const targetUser = await User.findByPk(targetId, {
        attributes: PROFILE_ATTRIBUTES,
        transaction,
      });

      if (!targetUser) {
        throw new AppError("Profile not found", 404);
      }

      // prevent duplicate swipes
      const existingSwipe = await Swipe.findOne({
        where: {
          swiper_id: DEMO_USER_ID,
          target_id: targetId,
        },
        transaction,
      });

      if (existingSwipe) {
        throw new AppError(
          "You have already swiped on this profile",
          409
        );
      }

      // record the swipe
      await Swipe.create(
        {
          swiper_id: DEMO_USER_ID,
          target_id: targetId,
          action,
        },
        { transaction }
      );

      if (action === "pass") {
        return {
          matched: false,
        };
      }

      // check whether the target has already liked
      const reciprocalLike = await Swipe.findOne({
        where: {
          swiper_id: targetId,
          target_id: DEMO_USER_ID,
          action: "like",
        },
        transaction,
      });

      if (!reciprocalLike) {
        return {
          matched: false,
        };
      }

      const userOneId = Math.min(DEMO_USER_ID, targetId);
      const userTwoId = Math.max(DEMO_USER_ID, targetId);

      const match = await Match.create(
        {
          user_one_id: userOneId,
          user_two_id: userTwoId,
        },
        { transaction }
      );

      return {
        matched: true,
        match: {
          id: match.id,
          profile: targetUser,
          matchedAt: match.createdAt,
        },
      };
    }
  );
};

const getMatches = async () => {
  const matches = await Match.findAll({
    where: {
      [Op.or]: [
        { user_one_id: DEMO_USER_ID },
        { user_two_id: DEMO_USER_ID },
      ],
    },
    include: [
      {
        model: User,
        as: "userOne",
        attributes: PROFILE_ATTRIBUTES,
      },
      {
        model: User,
        as: "userTwo",
        attributes: PROFILE_ATTRIBUTES,
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return matches.map((match) => ({
    id: match.id,
    profile:
      match.user_one_id === DEMO_USER_ID
        ? match.userTwo
        : match.userOne,
    matchedAt: match.createdAt,
  }));
};

module.exports = {
  getCurrentUserName,
  getFeed,
  recordSwipe,
  getMatches,
};
