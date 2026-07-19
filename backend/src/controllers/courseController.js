const prisma = require('../config/prismaClient');
const asyncHandler = require('../middleware/asyncHandler');

// small helper: "E-Commerce Bootcamp!" -> "e-commerce-bootcamp"
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

// Turn the stored courseOutline string back into an object before
// sending a course to the client. Malformed/missing JSON -> null,
// rather than crashing the response.
function serializeCourse(course) {
  if (!course) return course;
  let courseOutline = null;
  if (course.courseOutline) {
    try {
      courseOutline = JSON.parse(course.courseOutline);
    } catch (err) {
      courseOutline = null;
    }
  }
  return { ...course, courseOutline };
}

// ------------------------------------------------------------
// PUBLIC: GET /api/courses
// Query params: ?category=E-Commerce
// ------------------------------------------------------------
exports.getAllCourses = asyncHandler(async (req, res) => {
  const { category } = req.query;

  const courses = await prisma.course.findMany({
    where: {
      isActive: true,
      ...(category ? { category } : {}),
    },
    orderBy: {
      displayOrder: "asc",
    },
  });

  res.json(courses.map(serializeCourse));
});

// ------------------------------------------------------------
// PUBLIC: GET /api/courses/:slug
// ------------------------------------------------------------
exports.getCourseBySlug = asyncHandler(async (req, res) => {
  const course = await prisma.course.findUnique({
    where: {
      slug: req.params.slug,
    },
  });

  if (!course) {
    const err = new Error("Course not found");
    err.statusCode = 404;
    throw err;
  }

  res.json(serializeCourse(course));
});

// ------------------------------------------------------------
// ADMIN: POST /api/admin/courses
// ------------------------------------------------------------
exports.createCourse = asyncHandler(async (req, res) => {
  const { courseOutline, ...rest } = req.body;
  const slug = rest.slug && rest.slug.trim() ? slugify(rest.slug) : slugify(req.body.title);

  const course = await prisma.course.create({
    data: {
      ...rest,
      slug,
      courseOutline: courseOutline ? JSON.stringify(courseOutline) : undefined,
    },
  });

  res.status(201).json(serializeCourse(course));
});

// ------------------------------------------------------------
// ADMIN: PUT /api/admin/courses/:id
// ------------------------------------------------------------
exports.updateCourse = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const { courseOutline, ...rest } = req.body;

  const course = await prisma.course.update({
    where: { id },
    data: {
      ...rest,
      ...(courseOutline !== undefined ? { courseOutline: JSON.stringify(courseOutline) } : {}),
    },
  });

  res.json(serializeCourse(course));
});

// ------------------------------------------------------------
// ADMIN: DELETE /api/admin/courses/:id
// ------------------------------------------------------------
exports.deleteCourse = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  await prisma.course.delete({ where: { id } });

  res.json({ success: true, message: 'Course deleted' });
});