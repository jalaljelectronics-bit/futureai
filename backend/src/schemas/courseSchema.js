const { z } = require('zod');

const courseCurriculumItemSchema = z.object({
  title: z.string(),
  dur: z.string().optional(),
  body: z.string().optional(),
});

const courseOutlineSchema = z.object({
  intro: z.string().optional(),
  outcomes: z.array(z.string()).optional(),
  tools: z.array(z.string()).optional(),
  whoFor: z.string().optional(),
  curriculum: z.array(courseCurriculumItemSchema).optional(),
});

const courseSchema = z.object({
  title: z.string().min(2).max(150),
  category: z.string().max(100).optional(),
  duration: z.string().max(50).optional(),
  description: z.string().optional(),
  thumbnailImage: z.string().max(255).optional(),
  courseOutline: courseOutlineSchema.optional(),
  isActive: z.boolean().optional(),
});

module.exports = courseSchema;