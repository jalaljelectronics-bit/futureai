const { z } = require('zod');

const baseShape = {
  message: z.string().min(1).max(300),
  ctaText: z.string().max(50).optional().nullable(),
  ctaLink: z.string().max(255).optional().nullable(),
  isActive: z.boolean().optional(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
};

const createAnnouncementSchema = z.object(baseShape);
const updateAnnouncementSchema = z.object(baseShape).partial();

function validateCreateAnnouncement(body) {
  return createAnnouncementSchema.safeParse(body);
}

function validateUpdateAnnouncement(body) {
  return updateAnnouncementSchema.safeParse(body);
}

module.exports = { validateCreateAnnouncement, validateUpdateAnnouncement };