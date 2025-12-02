export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Något gick fel";

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route hittades inte",
  });
};
