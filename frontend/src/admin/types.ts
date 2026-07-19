export interface AdminUser {
  id: number;
  username: string;
  email?: string;
  role: string;
  lastLoginAt?: string | null;
}

export interface Announcement {
  id: number;
  message: string;
  ctaText?: string;
  ctaLink?: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CourseCurriculumItem {
  title: string;
  dur?: string;
  body?: string;
}

export interface CourseOutline {
  intro?: string;
  outcomes?: string[];
  tools?: string[];
  whoFor?: string;
  curriculum?: CourseCurriculumItem[];
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  category?: string | null;
  duration?: string | null;
  description?: string | null;
  courseOutline?: CourseOutline | null;
  thumbnailImage?: string | null;
  rating?: number | null;
  reviewCount: number;
  isActive: boolean;
  displayOrder: number;
  createdBy?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface SuccessStory {
  id: number;
  studentName: string;
  studentPhoto?: string | null;
  courseId?: number | null;
  course?: { title: string; slug: string } | null;
  testimonial: string;
  achievementHighlight?: string | null;
  videoUrl?: string | null;
  isActive: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  designation?: string | null;
  photo?: string | null;
  bio?: string | null;
  specialty?: string | null;
  socialLinks?: Record<string, string> | null;
  isActive: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  featuredImage?: string | null;
  category?: string | null;
  authorId?: number | null;
  status: "draft" | "published";
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  isRead: boolean;
  submittedAt?: string;
}

/** All CRUD-manageable tables (admin_users is intentionally excluded — it's
 *  managed through the login flow, not a generic table editor). */
export interface DB {
  admin_users: AdminUser[];
  announcements: Announcement[];
  courses: Course[];
  success_stories: SuccessStory[];
  team_members: TeamMember[];
  blog_posts: BlogPost[];
  contact_submissions: ContactSubmission[];
}

export type ManagedTable = Exclude<keyof DB, "admin_users">;

export type AnyRecord = Record<string, any> & { id: number };