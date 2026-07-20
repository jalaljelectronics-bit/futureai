// Same bridge pattern as courseHelpers.js — merges admin-panel
// blog_posts records with the original hand-written placeholder
// articles when the slug matches, and falls back to a simple
// paragraph-split layout for brand-new posts added purely
// through the admin panel.
import BLOG_DATA from './blogData.js';

const CAT_MAP = {
  Content: { key: 'content', label: 'Content' },
  Marketing: { key: 'marketing', label: 'Marketing' },
  Design: { key: 'design', label: 'Design' },
  Freelancing: { key: 'freelancing', label: 'Freelancing' },
  'E-commerce': { key: 'ecommerce', label: 'E-commerce' },
};

function catFor(category) {
  const found = CAT_MAP[category];
  return found ? { cat: found.key, catLabel: found.label } : { cat: 'content', catLabel: category || 'Content' };
}

function readTime(text) {
  const words = (text || '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function mergeBlog(adminPost) {
  const extra = BLOG_DATA[adminPost.slug];
  const cat = extra ? { cat: extra.cat, catLabel: extra.catLabel } : catFor(adminPost.category);
  const mins = readTime(adminPost.content);

  return {
    slug: adminPost.slug,
    title: adminPost.title,
    img: extra?.img || 'Future+AI+Skills',
    meta: extra?.meta || `${cat.catLabel} · ${mins} min read`,
    teaser: adminPost.excerpt || extra?.teaser || '',
    body: extra?.body || (adminPost.content || '').split(/\n\s*\n/).filter(Boolean),
    featuredImage: adminPost.featuredImage || null,
    publishedAt: adminPost.publishedAt || '',
    ...cat,
  };
}

// Only published posts, for list pages.
export function getBlogList(dbPosts) {
  return dbPosts.filter((p) => p.status === 'published').map(mergeBlog);
}

export function getBlogBySlug(dbPosts, slug) {
  const found = dbPosts.find((p) => p.slug === slug && p.status === 'published');
  return found ? mergeBlog(found) : null;
}
