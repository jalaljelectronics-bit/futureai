const { z } = require('zod');

// Matches TeamMember Prisma model exactly. photo is a plain URL string
// (no real file upload endpoint exists — see EntityForm fix). socialLinks
// is a free-form JSON object (e.g. { twitter: "...", linkedin: "..." }).

const createTeamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required').max(150),
  designation: z.string().max(150).optional().nullable(),
  photo: z.string().max(255).url('Must be a valid URL').optional().nullable().or(z.literal('')),
  bio: z.string().optional().nullable(),
  specialty: z.string().max(255).optional().nullable(),
  socialLinks: z.record(z.string(), z.string()).optional().nullable(),
  isActive: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

const updateTeamMemberSchema = createTeamMemberSchema.partial();

function validateCreateTeamMember(data) {
  return createTeamMemberSchema.safeParse(data);
}

function validateUpdateTeamMember(data) {
  return updateTeamMemberSchema.safeParse(data);
}

module.exports = {
  createTeamMemberSchema,
  updateTeamMemberSchema,
  validateCreateTeamMember,
  validateUpdateTeamMember,
};