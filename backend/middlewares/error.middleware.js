const errorHandler = (err, req, res, next) => {
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      success: false,
      message: "This profile has already been swiped on",
    });
  }

  if (err.original?.code === "SQLITE_BUSY") {
    return res.status(503).json({
      success: false,
      message: "Database is busy. Please try again.",
    });
  }

  const statusCode = err.statusCode || 500;

  if (statusCode === 500) {
    console.error(err);
  }

  return res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "Internal server error"
        : err.message,
  });
};

module.exports = errorHandler;