const prisma = require('../config/prismaClient');
const asyncHandler = require('../middleware/asyncHandler');

// ------------------------------------------------------------
// PUBLIC: POST /api/contact
// ------------------------------------------------------------
exports.submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  const submission = await prisma.contactSubmission.create({
    data: { name, email, phone, message },
  });

  res.status(201).json(submission);
});

// ------------------------------------------------------------
// ADMIN: GET /api/admin/contact-submissions
// ------------------------------------------------------------
exports.getAllSubmissions = asyncHandler(async (req, res) => {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { submittedAt: 'desc' },
  });

  res.json(submissions);
});

// ------------------------------------------------------------
// ADMIN: PUT /api/admin/contact-submissions/:id
// Used to toggle isRead (or update any other allowed field later).
// ------------------------------------------------------------
exports.updateSubmission = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const { isRead } = req.body;

  const submission = await prisma.contactSubmission.update({
    where: { id },
    data: { ...(isRead !== undefined ? { isRead } : {}) },
  });

  res.json(submission);
});

// ------------------------------------------------------------
// ADMIN: DELETE /api/admin/contact-submissions/:id
// ------------------------------------------------------------
exports.deleteSubmission = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  await prisma.contactSubmission.delete({ where: { id } });

  res.json({ success: true, message: 'Submission deleted' });
});