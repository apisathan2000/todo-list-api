export function validateBody(schema) {
  return function (req, res, next) {
    
    // First check whether the body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        source: "Payload Validation",
        message: "Request body cannot be empty.",
      });
    }

    // Then check for the validation errors
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        source: "Payload Validation",
        message: error.details[0].message,
      });
    }
    next();
  };
}
