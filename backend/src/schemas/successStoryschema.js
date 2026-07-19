const { z } = require('zod');

// Matches SuccessStory Prisma model exactly (camelCase, real column types).
// courseId is a real FK (Int, nullable) — not a slug. Admin form will show
// a dropdown of course titles but submit the numeric id.

const createSuccessStorySchema = z.object({
  studentName: z.string().min(1, 'Student name is required').max(150),
  studentPhoto: z.string().max(255).url('Must be a valid URL').optional().nullable().or(z.literal('')),
  courseId: z.number().int().positive().optional().nullable(),
  testimonial: z.string().min(1, 'Testimonial is required'),
  achievementHighlight: z.string().max(255).optional().nullable(),
  videoUrl: z.string().max(255).url('Must be a valid URL').optional().nullable().or(z.literal('')),
  isActive: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

const updateSuccessStorySchema = createSuccessStorySchema.partial();

function validateCreateSuccessStory(data) {
  return createSuccessStorySchema.safeParse(data);
}

function validateUpdateSuccessStory(data) {
  return updateSuccessStorySchema.safeParse(data);
}

module.exports = {
  createSuccessStorySchema,
  updateSuccessStorySchema,
  validateCreateSuccessStory,
  validateUpdateSuccessStory,
};