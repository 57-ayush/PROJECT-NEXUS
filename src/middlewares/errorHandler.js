export const notFound = (req, res, next) => {
    const error = new Error(`Route not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  export const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
  
    // Mongoose bad ObjectId
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      statusCode = 404;
      message = 'Resource not found';
    }
  
    // Mongoose duplicate key
    if (err.code === 11000) {
      statusCode = 409;
      const field = Object.keys(err.keyValue)[0];
      message = `${field} already in use`;
    }
  
    console.error(err.stack);
  
    res.status(statusCode).json({
      message,
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
  };