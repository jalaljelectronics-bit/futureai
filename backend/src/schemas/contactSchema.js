const { z } = require('zod');

const contactSchema = z.object({
  name: z.string().min(2).max(150),
  email: z.string().email().max(255),
  phone: z.string().min(5).max(50),
  message: z.string().min(1),
});

module.exports = contactSchema;