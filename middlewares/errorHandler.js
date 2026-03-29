const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const response = {
    success: false,
    status: err.status || "error",
    message: err.message || "An unexpected error occurred",
  };

  if (err.details) {
    response.details = err.details;
  }

  res.status(err.statusCode || 500).json(response);
};

export default errorHandler;
