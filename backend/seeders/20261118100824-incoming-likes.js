"use strict";

module.exports = {
  async up(queryInterface) {
    const incomingLikes = [2, 4, 5, 6, 12, 18, 23, 29];

    const swipes = incomingLikes.map((userId) => ({
      swiper_id: userId,
      target_id: 1,
      action: "like",
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Swipes", swipes);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Swipes", {
      swiper_id: [2, 4, 5, 6, 12, 18, 23, 29],
      target_id: 1,
      action: "like",
    });
  },
};