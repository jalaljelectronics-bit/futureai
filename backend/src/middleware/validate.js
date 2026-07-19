// Usage: router.post('/courses', validate(courseSchema), controller.create)
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.flatten().fieldErrors,
    });
  }
  req.body = result.data; // sanitized/typed data replaces raw body
  next();
};

module.exports = validate;