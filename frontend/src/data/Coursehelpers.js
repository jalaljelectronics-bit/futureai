// ============================================================
// Bridges the admin panel's course records (db.courses, from the
// shared DataContext) into the shape the course pages render.
// ============================================================

const TAG_RULES = [
  { match: /market/i, label: 'Marketing', cls: 'tag-marketing' },
  { match: /design/i, label: 'Design', cls: 'tag-design' },
  { match: /freelanc/i, label: 'Freelancing', cls: 'tag-freelancing' },
  { match: /(e-?commerce|shop)/i, label: 'E-commerce', cls: 'tag-ecommerce' },
];

function tagFor(category) {
  const rule = TAG_RULES.find((r) => r.match.test(category || ''));
  return rule ? { tagLabel: rule.label, tagClass: rule.cls } : { tagLabel: category || 'Content', tagClass: 'tag-content' };
}

export function mergeCourse(adminCourse) {
  const tag = tagFor(adminCourse.category);
  const outline = adminCourse.courseOutline || {};

  return {
    slug: adminCourse.slug,
    title: adminCourse.title,
    category: adminCourse.category,
    duration: adminCourse.duration,
    thumbnail: adminCourse.thumbnailImage || '',
    rating: adminCourse.rating ?? null,
    reviews: adminCourse.reviewCount ?? null,
    summary: adminCourse.description || '',
    intro: outline.intro || adminCourse.description || '',
    outcomes: outline.outcomes || null,
    tools: outline.tools || null,
    whoFor: outline.whoFor || null,
    curriculum: outline.curriculum || [],
    displayOrder: adminCourse.displayOrder ?? 999,
    ...tag,
  };
}

// All active courses, in admin display-order, for list pages.
export function getCourseList(dbCourses) {
  return dbCourses
    .filter((c) => c.is_active !== false)
    .map(mergeCourse)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getCourseBySlug(dbCourses, slug) {
  const found = dbCourses.find((c) => c.slug === slug && c.is_active !== false);
  return found ? mergeCourse(found) : null;
}