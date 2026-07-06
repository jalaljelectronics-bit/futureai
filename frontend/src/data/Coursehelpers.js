// ============================================================
// Bridges the admin panel's course records (db.courses, from the
// shared DataContext) with the original hand-written rich content
// in courseData.js (intro, outcomes, tools, instructor bio, etc).
//
// Why this exists: the admin panel only manages the "database"
// shape of a course (title, slug, duration, modules...). The
// original 6 courses also have long-form marketing copy that
// isn't something you'd want to manage as a plain-text admin
// field. So for courses that match one of the original 6 slugs,
// we keep the rich copy. Any brand-new course added purely
// through the admin panel still renders correctly with a
// simpler layout (those extra sections just don't show).
// ============================================================
import COURSE_DATA from './courseData.js';

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
  const extra = COURSE_DATA[adminCourse.slug];
  const tag = extra ? { tagLabel: extra.tagLabel, tagClass: extra.tagClass } : tagFor(adminCourse.category);

  const curriculum = adminCourse.modules && adminCourse.modules.length
    ? adminCourse.modules.map((m) => ({ title: m.module_title, dur: m.module_duration || '', body: m.module_description || '' }))
    : (extra?.curriculum || []);

  return {
    slug: adminCourse.slug,
    title: adminCourse.title,
    category: adminCourse.category,
    duration: adminCourse.duration,
    thumbnail: adminCourse.thumbnail_image || '',
    rating: adminCourse.rating ?? extra?.rating ?? '5.0',
    reviews: adminCourse.review_count ?? extra?.reviews ?? 0,
    summary: adminCourse.description || extra?.summary || '',
    intro: extra?.intro || adminCourse.description || '',
    outcomes: extra?.outcomes || null,
    tools: extra?.tools || null,
    whoFor: extra?.whoFor || null,
    instructor: extra?.instructor || null,
    curriculum,
    isFeatured: !!adminCourse.is_featured,
    displayOrder: adminCourse.display_order ?? 999,
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
