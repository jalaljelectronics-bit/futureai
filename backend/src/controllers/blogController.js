const prisma = require('../config/prismaClient');
const asyncHandler = require('../middleware/asyncHandler');
const slugify = require('slugify');
const { validateCreateBlog, validateUpdateBlog } = require('../schemas/blogSchema');

function generateSlug(title) {
  return slugify(title, { lower: true, strict: true });
}

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

exports.getPublishedBlogPosts = asyncHandler(async (req, res) => {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
  });
  res.json(posts);
});

exports.getPublishedBlogPostBySlug = asyncHandler(async (req, res) => {
  const post = await prisma.blogPost.findFirst({
    where: { slug: req.params.slug, status: 'published' },
  });
  if (!post) {
    const err = new Error('Blog post not found');
    err.statusCode = 404;
    throw err;
  }
  res.json(post);
});

exports.getAllBlogPosts = asyncHandler(async (req, res) => {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(posts);
});

exports.getBlogPostById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) {
    const err = new Error('Blog post not found');
    err.statusCode = 404;
    throw err;
  }
  res.json(post);
});

exports.createBlogPost = asyncHandler(async (req, res) => {
  console.log('BLOG BODY RECEIVED:', req.body);

  const result = validateCreateBlog(req.body);
  if (!result.success) {
    console.log('BLOG VALIDATION ERRORS:', JSON.stringify(result.error.flatten(), null, 2));
    throw validationError(result);
  }

  const data = result.data;
  const slug = data.slug && data.slug.trim() ? slugify(data.slug) : generateSlug(data.title);
  const publishedAt =
    data.status === 'published' && !data.publishedAt ? new Date() : data.publishedAt ?? null;

  try {
    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt ?? null,
        content: data.content,
        featuredImage: data.featuredImage || null,
        category: data.category ?? null,
        authorId: data.authorId ?? null,
        status: data.status,
        publishedAt,
      },
    });
    res.status(201).json(post);
  } catch (err) {
    if (err.code === 'P2002') {
      const conflictErr = new Error('A post with that slug already exists');
      conflictErr.statusCode = 409;
      throw conflictErr;
    }
    throw err;
  }
});

exports.updateBlogPost = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const result = validateUpdateBlog(req.body);
  if (!result.success) throw validationError(result);

  const data = result.data;

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) {
    const err = new Error('Blog post not found');
    err.statusCode = 404;
    throw err;
  }

  const slug = data.slug !== undefined && data.slug.trim() !== '' ? slugify(data.slug) : existing.slug;

  let publishedAt = existing.publishedAt;
  const newStatus = data.status ?? existing.status;
  const isNewlyPublished = existing.status !== 'published' && newStatus === 'published';
  if (isNewlyPublished && data.publishedAt === undefined) {
    publishedAt = new Date();
  } else if (data.publishedAt !== undefined) {
    publishedAt = data.publishedAt;
  }

  try {
    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        slug,
        ...(data.excerpt !== undefined && { excerpt: data.excerpt }),
        ...(data.content !== undefined && { content: data.content }),
        ...(data.featuredImage !== undefined && { featuredImage: data.featuredImage || null }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.authorId !== undefined && { authorId: data.authorId }),
        status: newStatus,
        publishedAt,
      },
    });
    res.json(post);
  } catch (err) {
    if (err.code === 'P2002') {
      const conflictErr = new Error('A post with that slug already exists');
      conflictErr.statusCode = 409;
      throw conflictErr;
    }
    throw err;
  }
});

exports.deleteBlogPost = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) {
    const err = new Error('Blog post not found');
    err.statusCode = 404;
    throw err;
  }
  await prisma.blogPost.delete({ where: { id } });
  res.json({ success: true, message: 'Blog post deleted' });
});
