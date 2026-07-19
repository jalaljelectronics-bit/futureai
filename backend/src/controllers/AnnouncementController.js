const prisma = require('../config/prismaClient');
const asyncHandler = require('../middleware/asyncHandler');
const { validateCreateAnnouncement, validateUpdateAnnouncement } = require('../schemas/announcementSchema');

// Same pattern as successStoryController: flatten a Zod failure into one
// readable message, since errorHandler.js only forwards err.message.
function validationError(zodResult) {
  const flat = zodResult.error.flatten();
  const fieldMsgs = Object.entries(flat.fieldErrors)
    .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`)
    .join('; ');
  const err = new Error(fieldMsgs || 'Validation failed');
  err.statusCode = 400;
  return err;
}

// ------------------------------------------------------------
// PUBLIC: GET /api/announcements
// Only active announcements whose date window (if set) includes
// today. No auth required. Returns an array — the notification
// bar can just show the first one, or cycle through them.
// ------------------------------------------------------------
exports.getPublicAnnouncements = asyncHandler(async (req, res) => {
  const now = new Date();

  const announcements = await prisma.announcement.findMany({
    where: {
      isActive: true,
      AND: [
        { OR: [{ startDate: null }, { startDate: { lte: now } }] },
        { OR: [{ endDate: null }, { endDate: { gte: now } }] },
      ],
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json(announcements);
});

// ------------------------------------------------------------
// ADMIN: GET /api/admin/announcements
// Every announcement regardless of isActive or date window.
// ------------------------------------------------------------
exports.getAllAnnouncements = asyncHandler(async (req, res) => {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: 'desc' },
  });

  res.json(announcements);
});

// ------------------------------------------------------------
// ADMIN: POST /api/admin/announcements
// ------------------------------------------------------------
exports.createAnnouncement = asyncHandler(async (req, res) => {
  const result = validateCreateAnnouncement(req.body);
  if (!result.success) throw validationError(result);

  const data = result.data;

  const announcement = await prisma.announcement.create({
    data: {
      message: data.message,
      ctaText: data.ctaText || null,
      ctaLink: data.ctaLink || null,
      isActive: data.isActive ?? true,
      startDate: data.startDate ?? null,
      endDate: data.endDate ?? null,
      createdBy: req.admin?.id ?? null,
    },
  });

  res.status(201).json(announcement);
});

// ------------------------------------------------------------
// ADMIN: PUT /api/admin/announcements/:id
// ------------------------------------------------------------
exports.updateAnnouncement = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const result = validateUpdateAnnouncement(req.body);
  if (!result.success) throw validationError(result);

  const data = result.data;

  const existing = await prisma.announcement.findUnique({ where: { id } });
  if (!existing) {
    const err = new Error('Announcement not found');
    err.statusCode = 404;
    throw err;
  }

  const announcement = await prisma.announcement.update({
    where: { id },
    data: {
      ...(data.message !== undefined && { message: data.message }),
      ...(data.ctaText !== undefined && { ctaText: data.ctaText || null }),
      ...(data.ctaLink !== undefined && { ctaLink: data.ctaLink || null }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
      ...(data.startDate !== undefined && { startDate: data.startDate }),
      ...(data.endDate !== undefined && { endDate: data.endDate }),
    },
  });

  res.json(announcement);
});

// ------------------------------------------------------------
// ADMIN: DELETE /api/admin/announcements/:id
// ------------------------------------------------------------
exports.deleteAnnouncement = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const existing = await prisma.announcement.findUnique({ where: { id } });
  if (!existing) {
    const err = new Error('Announcement not found');
    err.statusCode = 404;
    throw err;
  }

  await prisma.announcement.delete({ where: { id } });
  res.json({ success: true, message: 'Announcement deleted' });
});