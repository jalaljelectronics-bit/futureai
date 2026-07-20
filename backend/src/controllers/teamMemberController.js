const prisma = require('../config/prismaClient');
const asyncHandler = require('../middleware/asyncHandler');
const { validateCreateTeamMember, validateUpdateTeamMember } = require('../schemas/teamMemberSchema');

function validationError(zodResult) {
  const flat = zodResult.error.flatten();
  const fieldMsgs = Object.entries(flat.fieldErrors)
    .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`)
    .join('; ');
  const formMsgs = flat.formErrors.join('; ');
  const message = [fieldMsgs, formMsgs].filter(Boolean).join(' | ') || 'Validation failed';
  const err = new Error(message);
  err.statusCode = 400;
  return err;
}

// Multipart fields all arrive as strings; the uploaded file (if any)
// lands on req.file, not req.body. Normalize both before Zod sees it.
function normalizeBody(req) {
  const body = { ...req.body };
  if (req.file) body.photo = req.file.path;
  if (body.isActive !== undefined) body.isActive = body.isActive === 'true' || body.isActive === true;
  if (body.displayOrder !== undefined && body.displayOrder !== '') body.displayOrder = Number(body.displayOrder);
  return body;
}

exports.getPublicTeamMembers = asyncHandler(async (req, res) => {
  const members = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
  });
  res.json(members);
});

exports.getAllTeamMembers = asyncHandler(async (req, res) => {
  const members = await prisma.teamMember.findMany({ orderBy: { displayOrder: 'asc' } });
  res.json(members);
});

exports.getTeamMemberById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) {
    const err = new Error('Team member not found');
    err.statusCode = 404;
    throw err;
  }
  res.json(member);
});

exports.createTeamMember = asyncHandler(async (req, res) => {
  const body = normalizeBody(req);
  const result = validateCreateTeamMember(body);
  if (!result.success) throw validationError(result);
  const data = result.data;

  const member = await prisma.teamMember.create({
    data: {
      name: data.name,
      designation: data.designation ?? null,
      photo: data.photo || null,
      bio: data.bio ?? null,
      specialty: data.specialty ?? null,
      socialLinks: data.socialLinks ?? undefined,
      isActive: data.isActive,
      displayOrder: data.displayOrder,
    },
  });
  res.status(201).json(member);
});

exports.updateTeamMember = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const body = normalizeBody(req);
  const result = validateUpdateTeamMember(body);
  if (!result.success) throw validationError(result);
  const data = result.data;

  const existing = await prisma.teamMember.findUnique({ where: { id } });
  if (!existing) {
    const err = new Error('Team member not found');
    err.statusCode = 404;
    throw err;
  }

  const member = await prisma.teamMember.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.designation !== undefined && { designation: data.designation }),
      ...(data.photo !== undefined && { photo: data.photo || null }),
      ...(data.bio !== undefined && { bio: data.bio }),
      ...(data.specialty !== undefined && { specialty: data.specialty }),
      ...(data.socialLinks !== undefined && { socialLinks: data.socialLinks }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
      ...(data.displayOrder !== undefined && { displayOrder: data.displayOrder }),
    },
  });
  res.json(member);
});

exports.deleteTeamMember = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.teamMember.findUnique({ where: { id } });
  if (!existing) {
    const err = new Error('Team member not found');
    err.statusCode = 404;
    throw err;
  }
  await prisma.teamMember.delete({ where: { id } });
  res.json({ success: true, message: 'Team member deleted' });
});
