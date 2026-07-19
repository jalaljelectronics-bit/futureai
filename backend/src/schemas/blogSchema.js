const { z } = require('zod');

const STATUS_VALUES = ['draft', 'published'];

const createBlogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z
    .string()
    .max(220)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase, alphanumeric, hyphen-separated')
    .optional()
    .nullable()
    .or(z.literal('')),
  excerpt: z.string().max(500).optional().nullable(),
  content: z.string().min(1, 'Content is required'),
  featuredImage: z.string().max(255).url('Must be a valid URL').optional().nullable().or(z.literal('')),
  category: z.string().max(100).optional().nullable(),
  authorId: z.number().int().positive().optional().nullable(),
  status: z.enum(STATUS_VALUES).default('draft'),
  publishedAt: z.coerce.date().optional().nullable(),
});

const updateBlogSchema = createBlogSchema.partial();

function validateCreateBlog(data) {
  return createBlogSchema.safeParse(data);
}

function validateUpdateBlog(data) {
  return updateBlogSchema.safeParse(data);
}

module.exports = {
  createBlogSchema,
  updateBlogSchema,
  validateCreateBlog,
  validateUpdateBlog,
};