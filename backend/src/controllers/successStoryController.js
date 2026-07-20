const prisma = require('../config/prismaClient');
const asyncHandler = require('../middleware/asyncHandler');
const { validateCreateSuccessStory, validateUpdateSuccessStory } = require('../schemas/successStorySchema');

// Turns a Zod safeParse failure into a single readable message, since
// errorHandler.js only ever forwards err.message to the client (learned
// this the hard way on blog_posts — baking details into the message here
// avoids touching the shared errorHandler for every feature).
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
// PUBLIC: GET /api/success-stories
// Only active stories, in display order. No auth required.
// ------------------------------------------------------------
exports.getPublicSuccessStories = asyncHandler(async (req, res) => {
  const stories = await prisma.successStory.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
    include: { course: { select: { title: true, slug: true } } },
  });
  res.json(stories);
});

// ------------------------------------------------------------
// ADMIN: GET /api/admin/success-stories
// Every story regardless of isActive.
// ------------------------------------------------------------
exports.getAllSuccessStories = asyncHandler(async (req, res) => {
  const stories = await prisma.successStory.findMany({
    orderBy: { displayOrder: 'asc' },
    include: { course: { select: { title: true, slug: true } } },
  });
  res.json(stories);
});

// ------------------------------------------------------------
// ADMIN: GET /api/admin/success-stories/:id
// ------------------------------------------------------------
exports.getSuccessStoryById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const story = await prisma.successStory.findUnique({
    where: { id },
    include: { course: { select: { title: true, slug: true } } },
  });

  if (!story) {
    const err = new Error('Success story not found');
    err.statusCode = 404;
    throw err;
  }

  res.json(story);
});

// ------------------------------------------------------------
// ADMIN: POST /api/admin/success-stories
// ------------------------------------------------------------
exports.createSuccessStory = asyncHandler(async (req, res) => {
  const result = validateCreateSuccessStory(req.body);
  if (!result.success) throw validationError(result);

  const data = result.data;

  const story = await prisma.successStory.create({
    data: {
      studentName: data.studentName,
      studentPhoto: data.studentPhoto || null,
      courseId: data.courseId ?? null,
      testimonial: data.testimonial,
      achievementHighlight: data.achievementHighlight ?? null,
      videoUrl: data.videoUrl || null,
      isActive: data.isActive,
      displayOrder: data.displayOrder,
    },
  });

  res.status(201).json(story);
});

// ------------------------------------------------------------
// ADMIN: PUT /api/admin/success-stories/:id
// ------------------------------------------------------------
exports.updateSuccessStory = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const result = validateUpdateSuccessStory(req.body);
  if (!result.success) throw validationError(result);

  const data = result.data;

  const existing = await prisma.successStory.findUnique({ where: { id } });
  if (!existing) {
    const err = new Error('Success story not found');
    err.statusCode = 404;
    throw err;
  }

  const story = await prisma.successStory.update({
    where: { id },
    data: {
      ...(data.studentName !== undefined && { studentName: data.studentName }),
      ...(data.studentPhoto !== undefined && { studentPhoto: data.studentPhoto || null }),
      ...(data.courseId !== undefined && { courseId: data.courseId }),
      ...(data.testimonial !== undefined && { testimonial: data.testimonial }),
      ...(data.achievementHighlight !== undefined && { achievementHighlight: data.achievementHighlight }),
      ...(data.videoUrl !== undefined && { videoUrl: data.videoUrl || null }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
      ...(data.displayOrder !== undefined && { displayOrder: data.displayOrder }),
    },
  });

  res.json(story);
});

// ------------------------------------------------------------
// ADMIN: DELETE /api/admin/success-stories/:id
// ------------------------------------------------------------
exports.deleteSuccessStory = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const existing = await prisma.successStory.findUnique({ where: { id } });
  if (!existing) {
    const err = new Error('Success story not found');
    err.statusCode = 404;
    throw err;
  }

  await prisma.successStory.delete({ where: { id } });
  res.json({ success: true, message: 'Success story deleted' });
});
