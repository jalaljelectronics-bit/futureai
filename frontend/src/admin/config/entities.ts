import type { ManagedTable } from "../types";

export type FieldType = "text" | "textarea" | "number" | "date" | "checkbox" | "select" | "file";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  default?: any;
  hint?: string;
  rows?: number;
  step?: string;
  options?: string[];
  special?: "modules" | "faqs" | "list" | "curriculum" | "course-select";
}

export type ColumnRender = "boolean" | "status" | "draftpill" | "readpill" | "image";

export interface ColumnConfig {
  key: string;
  label: string;
  primary?: boolean;
  sub?: string;
  render?: ColumnRender;
}

export interface EntityConfig {
  key: ManagedTable;
  label: string;
  icon: string;
  description: string;
  readOnly?: boolean;
  columns: ColumnConfig[];
  fields: FieldConfig[];
}

export const ENTITIES: Record<string, EntityConfig> = {
  announcements: {
    key: "announcements",
    label: "Announcements",
    icon: "📣",
    description: "The notification bar shown at the top of every page.",
    columns: [
      { key: "message", label: "Message", primary: true, sub: "ctaText" },
      { key: "startDate", label: "Window" },
      { key: "isActive", label: "Status", render: "boolean" }
    ],
    fields: [
      { name: "message", label: "Message", type: "textarea", required: true, hint: "Shown in the notification bar (max ~300 characters)." },
      { name: "ctaText", label: "Button text", type: "text" },
      { name: "ctaLink", label: "Button link", type: "text" },
      { name: "startDate", label: "Start date", type: "date" },
      { name: "endDate", label: "End date", type: "date" },
      { name: "isActive", label: "Active", type: "checkbox", default: true }
    ]
  },

  courses: {
    key: "courses",
    label: "Courses",
    description: "Manage your academic courses, outlines, and FAQs.",
    icon: "📚",
    columns: [
      { key: "title", label: "Course Title", primary: true, sub: "slug" },
      { key: "category", label: "Category" },
      { key: "duration", label: "Duration" },
      { key: "isActive", label: "Status", render: "boolean" }
    ],
    fields: [
      { name: "title", label: "Course Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", hint: "e.g. video-editing-mastery — leave blank to auto-generate from title" },
      { name: "category", label: "Category", type: "text", required: true },
      { name: "duration", label: "Duration", type: "text", required: true, hint: "e.g. 3 Months or 12 Weeks" },
      { name: "thumbnailImage", label: "Cover Image URL", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "curriculum", label: "Course Outline", type: "textarea", special: "curriculum", hint: "Format: Title | Duration | Body (one module per line)" },
      { name: "isActive", label: "Status", type: "checkbox", default: true }
    ]
  },

  success_stories: {
    key: "success_stories",
    label: "Success Stories",
    icon: "⭐",
    description: "Student testimonials shown on the About and Home pages.",
    columns: [
      { key: "studentName", label: "Student", primary: true, sub: "testimonial" },
      { key: "achievementHighlight", label: "Highlight" },
      { key: "isActive", label: "Status", render: "boolean" }
    ],
    fields: [
      { name: "studentName", label: "Student name", type: "text", required: true },
      { name: "studentPhoto", label: "Student Photo URL (optional)", type: "text" },
      { name: "courseId", label: "Course", type: "select", special: "course-select", hint: "Which course is this testimonial about?" },
      { name: "testimonial", label: "Testimonial", type: "textarea", required: true },
      { name: "achievementHighlight", label: "Highlight line", type: "text" },
      { name: "videoUrl", label: "Video URL (optional)", type: "text" },
      { name: "displayOrder", label: "Display order", type: "number", default: 0 },
      { name: "isActive", label: "Active", type: "checkbox", default: true }
    ]
  },

  team_members: {
  key: "team_members",
  label: "Team Members",
  description: "Manage the core team and instructors shown on the About page.",
  icon: "👥",
  columns: [
    { key: "photo", label: "Image", render: "image" },
    { key: "name", label: "Name", primary: true, sub: "designation" },
    { key: "designation", label: "Designation" },
    { key: "displayOrder", label: "Order" }
  ],
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "designation", label: "Designation", type: "text", required: true },
    { name: "photo", label: "Profile Image", type: "file", hint: "Upload a JPG or PNG profile picture" },
    { name: "bio", label: "Bio", type: "textarea" },
    { name: "displayOrder", label: "Display Order", type: "number", default: 0 }
  ]
},

  branches: {
    key: "branches",
    label: "Branches",
    icon: "🏢",
    description: "Sister institutes / branches, shown on the About page (e.g. Vision Giants).",
    columns: [
      { key: "name", label: "Name", primary: true, sub: "website_url" },
      { key: "description", label: "Description" }
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "website_url", label: "Website URL", type: "text" },
      { name: "display_order", label: "Display order", type: "number" }
    ]
  },

  blog_posts: {
    key: "blog_posts",
    label: "Blog Posts",
    description: "Manage your articles, news updates, and insights.",
    icon: "✍️",
    columns: [
      { key: "title", label: "Title", primary: true, sub: "slug" },
      { key: "category", label: "Category" },
      { key: "status", label: "Status", render: "draftpill" },
      { key: "publishedAt", label: "Published Date" }
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", hint: "e.g. future-of-ai-2026 — leave blank to auto-generate from title" },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: ["Content", "Marketing", "Design", "Freelancing", "E-commerce"],
        required: true
      },
      { name: "status", label: "Status", type: "select", options: ["draft", "published"], default: "draft" },
      { name: "featuredImage", label: "Featured Image URL", type: "text" },
      { name: "excerpt", label: "Excerpt", type: "textarea", hint: "Short excerpt shown on the blog feed index grid." },
      { name: "content", label: "Body Content", type: "textarea", rows: 12 }
    ]
  },

  contact_submissions: {
    key: "contact_submissions",
    label: "Contact Submissions",
    icon: "✉️",
    description: "Messages received through the Contact page form.",
    readOnly: true,
    columns: [
      { key: "name", label: "From", primary: true, sub: "email" },
      { key: "message", label: "Message" },
      { key: "isRead", label: "Status", render: "readpill" }
    ],
    fields: []
  }
};

export const ENTITY_ORDER: ManagedTable[] = [
  "announcements",
  "courses",
  "success_stories",
  "team_members",
  "branches",
  "blog_posts",
  "contact_submissions",
];

export function singularize(label: string): string {
  if (label.endsWith("ies")) return label.slice(0, -3) + "y";
  if (label.endsWith("s")) return label.slice(0, -1);
  return label;
}