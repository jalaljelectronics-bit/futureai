export interface CourseCurriculumItem {
  title: string;
  dur?: string;
  body?: string;
}

export interface CourseInstructor {
  name?: string;
  role?: string;
  bio?: string;
}

export interface CourseOutline {
  intro?: string;
  outcomes?: string[];
  tools?: string[];
  whoFor?: string;
  instructor?: CourseInstructor;
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