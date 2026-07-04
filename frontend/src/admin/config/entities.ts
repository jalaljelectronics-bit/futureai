import type { ManagedTable } from "../types";

/* ============================================================
   ENTITY CONFIG
   One object per manageable table. Add a field here and it
   shows up in the Add/Edit form automatically; add a column and
   it shows up in the table automatically. This is the only file
   you touch to change what the admin panel manages.
   ============================================================ */

export type FieldType = "text" | "textarea" | "number" | "date" | "checkbox" | "select";

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
  /** custom line-based editors for sub-structures */
  special?: "modules" | "faqs" | "list" | "curriculum";
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
      { key: "message", label: "Message", primary: true, sub: "cta_text" },
      { key: "start_date", label: "Window" },
      { key: "is_active", label: "Status", render: "boolean" }
    ],
    fields: [
      { name: "message", label: "Message", type: "textarea", required: true, hint: "Shown in the notification bar (max ~300 characters)." },
      { name: "cta_text", label: "Button text", type: "text" },
      { name: "cta_link", label: "Button link", type: "text" },
      { name: "start_date", label: "Start date", type: "date" },
      { name: "end_date", label: "End date", type: "date" },
      { name: "is_active", label: "Active", type: "checkbox", default: true }
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
      { name: "category", label: "Category", type: "text", required: true },
      { name: "duration", label: "Duration", type: "text", required: true, hint: "e.g. 3 Months or 12 Weeks" },
      { name: "thumbnailImage", label: "Cover Image URL", type: "text" },
      { name: "description", label: "Description", type: "textarea" },

      // --- everything below gets packaged into courseOutline by EntityForm ---
      { name: "intro", label: "Intro", type: "textarea", hint: "Shown at the top of the course detail page." },
      { name: "outcomes", label: "Outcomes", type: "textarea", special: "list", hint: "One outcome per line." },
      { name: "tools", label: "Tools / Tech Covered", type: "textarea", special: "list", hint: "One tool per line." },
      { name: "whoFor", label: "Who This Course Is For", type: "textarea" },
      { name: "instructor_name", label: "Instructor Name", type: "text" },
      { name: "instructor_role", label: "Instructor Role", type: "text" },
      { name: "instructor_bio", label: "Instructor Bio", type: "textarea" },
      { name: "curriculum", label: "Curriculum", type: "textarea", special: "curriculum", hint: "Format: Title | Duration | Body (one module per line)" },

      { name: "isActive", label: "Status", type: "checkbox", default: true }
    ]
  },

  success_stories: {
    key: "success_stories",
    label: "Success Stories",
    icon: "⭐",
    description: "Student testimonials shown on the About and Home pages.",
    columns: [
      { key: "student_name", label: "Student", primary: true, sub: "course_slug" },
      { key: "achievement_highlight", label: "Highlight" },
      { key: "is_active", label: "Status", render: "boolean" }
    ],
    fields: [
      { name: "student_name", label: "Student name", type: "text", required: true },
      { name: "course_slug", label: "Course slug", type: "text", hint: "Matches a course's slug, e.g. shopify" },
      { name: "testimonial", label: "Testimonial", type: "textarea", required: true },
      { name: "achievement_highlight", label: "Highlight line", type: "text" },
      { name: "video_url", label: "Video URL (optional)", type: "text" },
      { name: "display_order", label: "Display order", type: "number" },
      { name: "is_active", label: "Active", type: "checkbox", default: true }
    ]
  },

  team_members: {
    key: "team_members",
    label: "Team Members",
    description: "Manage the core team and instructors shown on the About page.",
    icon: "👥",
    columns: [
      { key: "image_url", label: "Image", render: "image" },
      { key: "name", label: "Name", primary: true, sub: "designation" },
      { key: "designation", label: "Designation" },
      { key: "display_order", label: "Order" }
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "designation", label: "Designation", type: "text", required: true },
      { name: "image_url", label: "Profile Image URL", type: "text", hint: "e.g. /images/team/member.jpg or a remote URL" },
      { name: "bio", label: "Bio", type: "textarea" },
      { name: "display_order", label: "Display Order", type: "number", default: 0 }
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
      { key: "published_at", label: "Published Date" }
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true, hint: "e.g. future-of-ai-2026" },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: ["Artificial Intelligence", "Tech Trends", "Programming", "Machine Learning", "General"],
        required: true
      },
      { name: "status", label: "Status", type: "select", options: ["draft", "published"], default: "draft" },
      { name: "image_url", label: "Featured Image URL", type: "text" },
      { name: "summary", label: "Summary", type: "textarea", hint: "Short excerpt shown on the blog feed index grid." },
      { name: "content", label: "Body Content", type: "textarea", rows: 12 }
    ]
  },

  media_uploads: {
    key: "media_uploads",
    label: "Media Library",
    icon: "🖼️",
    description: "Reusable image/file references for use across the site.",
    columns: [
      { key: "file_url", label: "File", primary: true, sub: "file_type" },
      { key: "alt_text", label: "Alt text" }
    ],
    fields: [
      { name: "file_url", label: "File URL", type: "text", required: true, hint: "In production this comes from your upload handler." },
      { name: "file_type", label: "File type", type: "text", hint: "e.g. image/jpeg" },
      { name: "alt_text", label: "Alt text", type: "text" }
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
      { key: "is_read", label: "Status", render: "readpill" }
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
  "media_uploads"
];

export function singularize(label: string): string {
  if (label.endsWith("ies")) return label.slice(0, -3) + "y";
  if (label.endsWith("s")) return label.slice(0, -1);
  return label;
}