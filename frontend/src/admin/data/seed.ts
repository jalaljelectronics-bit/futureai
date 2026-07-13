import type { DB } from "../types";
import directorPhoto from "../../assets/director.jpg";

/* ============================================================
   SEED DATA — starting content shown in the admin panel.
   Replace this whole file's export with a real fetch from your
   API on app start once the backend exists (see DataContext.tsx).
   ============================================================ */

export const seedDB: DB = {
  admin_users: [{ id: 1, username: "director", email: "director@futureaiskills.pk", role: "admin" }],

  announcements: [
    {
      id: 1,
      message: "New batch for Video Editing & YouTube Automation starts soon — limited seats in Shujabad.",
      cta_text: "Reserve a seat",
      cta_link: "/contact",
      is_active: true,
      start_date: "2026-06-01",
      end_date: "2026-08-31"
    }
  ],

  courses: [
    {
      id: 1,
      title: "YouTube Automation",
      slug: "youtube-automation",
      category: "Content & Media",
      duration: "6 Weeks",
      description:
        "Build and run faceless YouTube channels — niche research, scripting, voiceover, editing, thumbnails, and monetization, without ever appearing on camera.",
      thumbnail_image: "",
      rating: 4.8,
      review_count: 62,
      is_featured: true,
      is_active: true,
      display_order: 1,
      modules: [
        { module_title: "Niche & Channel Strategy", module_description: "Picking a profitable niche, competitor research, channel branding.", module_duration: "Week 1" },
        { module_title: "Scripting & AI Voiceover", module_description: "Writing scripts that retain viewers, AI voice tools, pacing.", module_duration: "Week 2" },
        { module_title: "Editing & Visuals", module_description: "Stock footage, captions, pacing edits.", module_duration: "Week 3-4" },
        { module_title: "Thumbnails & SEO", module_description: "Click-through design, titles, tags, algorithm basics.", module_duration: "Week 5" },
        { module_title: "Monetization & Outsourcing", module_description: "AdSense, sponsorships, building a small editing team.", module_duration: "Week 6" }
      ],
      faqs: [
        { question: "Do I need to show my face?", answer: "No — this course is built entirely around faceless, automated channels." },
        { question: "Do I need expensive equipment?", answer: "No, a laptop and stable internet is enough to start." }
      ]
    },
    {
      id: 2,
      title: "Digital Marketing",
      slug: "digital-marketing",
      category: "Marketing",
      duration: "8 Weeks",
      description: "Meta & Google Ads, SEO, email marketing, and content strategy — taught with real ad accounts.",
      thumbnail_image: "",
      rating: 4.7,
      review_count: 54,
      is_featured: true,
      is_active: true,
      display_order: 2,
      modules: [
        { module_title: "Marketing Foundations", module_description: "Funnels, personas, positioning.", module_duration: "Week 1-2" },
        { module_title: "Meta & Google Ads", module_description: "Campaign structure, targeting, budgets.", module_duration: "Week 3-4" },
        { module_title: "SEO & Content", module_description: "Keyword research, on-page SEO.", module_duration: "Week 5-6" },
        { module_title: "Email & Analytics", module_description: "Email flows, GA4 basics, reporting.", module_duration: "Week 7-8" }
      ],
      faqs: [{ question: "Will I run live ad campaigns?", answer: "Yes, with small supervised budgets." }]
    },
    {
      id: 3,
      title: "Graphic Designing",
      slug: "graphic-designing",
      category: "Design",
      duration: "6 Weeks",
      description: "Photoshop, Illustrator and Canva for logos, social posts, and brand kits.",
      thumbnail_image: "",
      rating: 4.9,
      review_count: 71,
      is_featured: true,
      is_active: true,
      display_order: 3,
      modules: [
        { module_title: "Design Fundamentals", module_description: "Color theory, typography, layout.", module_duration: "Week 1" },
        { module_title: "Adobe Photoshop", module_description: "Photo manipulation, social creatives.", module_duration: "Week 2-3" },
        { module_title: "Adobe Illustrator", module_description: "Vector logos, icons, brand marks.", module_duration: "Week 4" },
        { module_title: "Branding & Portfolio", module_description: "Full brand kits, client-ready portfolio.", module_duration: "Week 5-6" }
      ],
      faqs: []
    },
    {
      id: 4,
      title: "Video Editing",
      slug: "video-editing",
      category: "Content & Media",
      duration: "6 Weeks",
      description: "Premiere Pro and CapCut editing for YouTube, Reels, and client work.",
      thumbnail_image: "",
      rating: 4.8,
      review_count: 58,
      is_featured: false,
      is_active: true,
      display_order: 4,
      modules: [
        { module_title: "Editing Fundamentals", module_description: "Timeline, cuts, transitions, pacing.", module_duration: "Week 1-2" },
        { module_title: "Color Grading & Audio", module_description: "Color correction, mixing, sound design.", module_duration: "Week 3-4" },
        { module_title: "Motion Graphics", module_description: "Text animation, lower thirds, simple VFX.", module_duration: "Week 5" },
        { module_title: "Client Delivery", module_description: "Working with client footage, fast delivery.", module_duration: "Week 6" }
      ],
      faqs: []
    },
    {
      id: 5,
      title: "eBay Selling",
      slug: "ebay-selling",
      category: "E-commerce & Freelancing",
      duration: "4 Weeks",
      description: "Sourcing, listing optimization, and store management to sell to global buyers on eBay.",
      thumbnail_image: "",
      rating: 4.6,
      review_count: 33,
      is_featured: false,
      is_active: true,
      display_order: 5,
      modules: [
        { module_title: "Account & Store Setup", module_description: "Seller account, policies, branding.", module_duration: "Week 1" },
        { module_title: "Sourcing & Pricing", module_description: "Product research, supplier sourcing.", module_duration: "Week 2" },
        { module_title: "Listing Optimization", module_description: "Titles, photos, item specifics, SEO.", module_duration: "Week 3" },
        { module_title: "Fulfilment & Feedback", module_description: "Shipping, disputes, seller ratings.", module_duration: "Week 4" }
      ],
      faqs: []
    },
    {
      id: 6,
      title: "Upwork Freelancing",
      slug: "upwork-freelancing",
      category: "E-commerce & Freelancing",
      duration: "4 Weeks",
      description: "Profile optimization, proposal writing, and client communication to win consistent projects.",
      thumbnail_image: "",
      rating: 4.7,
      review_count: 47,
      is_featured: true,
      is_active: true,
      display_order: 6,
      modules: [
        { module_title: "Profile That Converts", module_description: "Portfolio, title, overview that gets clicks.", module_duration: "Week 1" },
        { module_title: "Winning Proposals", module_description: "Structure, pricing, first 90-day strategy.", module_duration: "Week 2" },
        { module_title: "Client Communication", module_description: "Calls, scope setting, expectations.", module_duration: "Week 3" },
        { module_title: "Scaling to Long-Term Clients", module_description: "Retainers, referrals, raising rates.", module_duration: "Week 4" }
      ],
      faqs: []
    },
    {
      id: 7,
      title: "Daraz Selling",
      slug: "daraz-selling",
      category: "E-commerce & Freelancing",
      duration: "4 Weeks",
      description: "Set up and grow a Daraz seller account for the Pakistani market.",
      thumbnail_image: "",
      rating: 4.5,
      review_count: 28,
      is_featured: false,
      is_active: true,
      display_order: 7,
      modules: [
        { module_title: "Seller Account Setup", module_description: "Registration, verification, store setup.", module_duration: "Week 1" },
        { module_title: "Product Listing & Pricing", module_description: "Photos, descriptions, pricing.", module_duration: "Week 2" },
        { module_title: "Daraz Ads & Promotions", module_description: "Sponsored listings, vouchers.", module_duration: "Week 3" },
        { module_title: "Order & Return Management", module_description: "Fulfilment, ratings, returns.", module_duration: "Week 4" }
      ],
      faqs: []
    },
    {
      id: 8,
      title: "Etsy Selling",
      slug: "etsy-selling",
      category: "E-commerce & Freelancing",
      duration: "4 Weeks",
      description: "Sell digital products and handmade goods to international buyers on Etsy.",
      thumbnail_image: "",
      rating: 4.7,
      review_count: 24,
      is_featured: false,
      is_active: true,
      display_order: 8,
      modules: [
        { module_title: "Shop Setup & Niche", module_description: "Branding, niche selection, policies.", module_duration: "Week 1" },
        { module_title: "Product Creation", module_description: "Digital products & print-on-demand.", module_duration: "Week 2" },
        { module_title: "Etsy SEO", module_description: "Tags, titles, ranking factors.", module_duration: "Week 3" },
        { module_title: "Traffic & Repeat Sales", module_description: "Ads, reviews, repeat customers.", module_duration: "Week 4" }
      ],
      faqs: []
    },
    {
      id: 9,
      title: "Shopify Store Management",
      slug: "shopify",
      category: "E-commerce & Freelancing",
      duration: "5 Weeks",
      description: "Build, launch, and run a Shopify store — theme setup, product pages, apps, and paid traffic.",
      thumbnail_image: "",
      rating: 4.8,
      review_count: 39,
      is_featured: true,
      is_active: true,
      display_order: 9,
      modules: [
        { module_title: "Store Setup", module_description: "Theme, domain, essential apps.", module_duration: "Week 1" },
        { module_title: "Product & Checkout", module_description: "Product pages, payments, shipping.", module_duration: "Week 2" },
        { module_title: "Traffic & Ads", module_description: "Meta ads for e-commerce, retargeting.", module_duration: "Week 3-4" },
        { module_title: "Fulfilment & Client Stores", module_description: "Order flow and freelance store setup.", module_duration: "Week 5" }
      ],
      faqs: []
    },
    {
      id: 10,
      title: "Fiverr Freelancing",
      slug: "fiverr-freelancing",
      category: "E-commerce & Freelancing",
      duration: "3 Weeks",
      description: "Turn any skill into a Fiverr gig that ranks and converts, with a pricing and delivery system.",
      thumbnail_image: "",
      rating: 4.6,
      review_count: 41,
      is_featured: false,
      is_active: true,
      display_order: 10,
      modules: [
        { module_title: "Gig Strategy", module_description: "Picking a category, positioning.", module_duration: "Week 1" },
        { module_title: "Gig That Ranks", module_description: "Titles, tags, images, pricing tiers.", module_duration: "Week 2" },
        { module_title: "Orders & Reviews", module_description: "Delivery systems, upsells, ratings.", module_duration: "Week 3" }
      ],
      faqs: []
    },
    {
      id: 11,
      title: "Amazon Selling",
      slug: "amazon-selling",
      category: "E-commerce & Freelancing",
      duration: "5 Weeks",
      description: "Private label and dropshipping fundamentals for Amazon — research, listings, and FBA basics.",
      thumbnail_image: "",
      rating: 4.7,
      review_count: 30,
      is_featured: false,
      is_active: true,
      display_order: 11,
      modules: [
        { module_title: "Business Model Choice", module_description: "Private label vs dropshipping vs wholesale.", module_duration: "Week 1" },
        { module_title: "Product Research", module_description: "Demand & competition analysis tools.", module_duration: "Week 2" },
        { module_title: "Listing & Launch", module_description: "Listing creation, keywords, launch.", module_duration: "Week 3-4" },
        { module_title: "FBA & Operations", module_description: "Fulfilment basics, reviews, ads.", module_duration: "Week 5" }
      ],
      faqs: []
    }
  ],

  success_stories: [
    {
      id: 1, student_name: "Ayesha Bibi", student_photo: null, course_slug: "video-editing",
      testimonial: "I started editing wedding reels for local shops in Shujabad. Six months later I'm editing for two YouTube channels remotely.",
      achievement_highlight: "Now earning from remote editing clients", video_url: null, is_active: true, display_order: 1
    },
    {
      id: 2, student_name: "Hamza Iqbal", student_photo: null, course_slug: "upwork-freelancing",
      testimonial: "My first Upwork proposal after the course got me a $150 project. I've kept two long-term clients since.",
      achievement_highlight: "First $150 project within 3 weeks", video_url: null, is_active: true, display_order: 2
    },
    {
      id: 3, student_name: "Areeba Fatima", student_photo: null, course_slug: "shopify",
      testimonial: "I built my own Shopify store selling embroidery pieces and now I set up stores for two other sellers too.",
      achievement_highlight: "Runs her own Shopify store + client stores", video_url: null, is_active: true, display_order: 3
    },
    {
      id: 4, student_name: "Bilal Ahmed", student_photo: null, course_slug: "youtube-automation",
      testimonial: "My faceless channel crossed monetization in month four. I still can't believe I never had to be on camera.",
      achievement_highlight: "Monetized channel in 4 months", video_url: null, is_active: true, display_order: 4
    }
  ],

  team_members: [
    { id: 1, name: "Syed Hassan Ishtiaq Bukhari", designation: "Founder & Director", photo: directorPhoto, bio: "Founded Future AI Skills to bring practical, income-generating skills to Shujabad.", specialty: "Institute Leadership", social_links: {}, is_active: true, display_order: 1 },
    { id: 2, name: "Ahmad Fraz", designation: "Lead Instructor — Video Editing & YouTube", photo: null, bio: "Runs multiple faceless YouTube channels and trains students on the exact editing pipeline used for clients.", specialty: "Video Editing, YouTube Automation", social_links: {}, is_active: true, display_order: 2 },
    { id: 3, name: "Mahnoor Ali", designation: "Lead Instructor — Digital Marketing", photo: null, bio: "Manages ad accounts for local businesses and teaches Meta & Google Ads with real campaign data.", specialty: "Digital Marketing, SEO", social_links: {}, is_active: true, display_order: 3 },
    { id: 4, name: "Sara Khalid", designation: "Lead Instructor — Graphic Design", photo: null, bio: "Freelance designer with client work across Photoshop, Illustrator, and brand identity.", specialty: "Graphic Design, Branding", social_links: {}, is_active: true, display_order: 4 },
    { id: 5, name: "Zain Malik", designation: "Lead Instructor — E-commerce & Freelancing", photo: null, bio: "Active seller across Daraz, Etsy, and Amazon, teaching the marketplace courses from first-hand experience.", specialty: "Shopify, Amazon, Daraz, Etsy, eBay, Fiverr", social_links: {}, is_active: true, display_order: 5 }
  ],

  branches: [
    { id: 1, name: "Vision Giants", description: "Our sister institute, expanding the same mission of practical, income-focused skills to more students.", website_url: "https://visiongiants.com", logo: null, display_order: 1 }
  ],

  blog_categories: [
    { id: 1, name: "Freelancing Tips", slug: "freelancing-tips" },
    { id: 2, name: "YouTube Automation", slug: "youtube-automation" },
    { id: 3, name: "Digital Marketing", slug: "digital-marketing" },
    { id: 4, name: "Student Success", slug: "student-success" }
  ],

  blog_posts: [
    {
      id: 1, title: "5 Freelance Skills Worth Learning in 2026", slug: "5-freelance-skills-2026",
      excerpt: "Not every online skill pays the same. Here's what's actually in demand on Upwork and Fiverr right now.",
      content: "Clients on Upwork and Fiverr are paying consistently for a short list of skills: short-form video editing, Shopify store setup, performance ad management, and AI-assisted content production. Students who pick one of these and get genuinely fast at it tend to land their first paid project within a few weeks.",
      featured_image: "", category_id: 1, author_id: 1, status: "published", published_at: "2026-05-12"
    },
    {
      id: 2, title: "How Faceless YouTube Channels Actually Make Money", slug: "faceless-youtube-channels-money",
      excerpt: "AdSense is only one of several ways a faceless channel earns — here's the full picture.",
      content: "A faceless channel earns from AdSense once it crosses Partner Program thresholds, but that's rarely the first or biggest income source. Many channels get their first payment from sponsorships once they show a consistent posting schedule and a defined niche audience.",
      featured_image: "", category_id: 2, author_id: 1, status: "published", published_at: "2026-05-28"
    },
    {
      id: 3, title: "Why Ad Budgets Fail Before the Ads Even Start", slug: "ad-budgets-fail-before-ads-start",
      excerpt: "Most failed ad campaigns were never really about the ad creative.",
      content: "The most common reason a small ad budget underperforms has nothing to do with the ad copy. It's an unclear offer, a landing page that doesn't match the ad's promise, or a product page that loads slowly on mobile.",
      featured_image: "", category_id: 3, author_id: 1, status: "published", published_at: "2026-06-10"
    },
    {
      id: 4, title: "From Shujabad to a Global Client List", slug: "shujabad-to-global-clients",
      excerpt: "A look at how local students are landing international clients without ever leaving home.",
      content: "Students trained in video editing, design, and marketing are now delivering work to clients across the Gulf, Europe, and North America, all from Shujabad, thanks to structured, hands-on training instead of scattered tutorials.",
      featured_image: "", category_id: 4, author_id: 1, status: "published", published_at: "2026-06-20"
    }
  ],


  contact_submissions: [
    { id: 1, name: "Sara Khan", email: "sara.k@example.com", phone: "0300-1234567", message: "Hi, when does the next Digital Marketing batch start?", is_read: false, submitted_at: "2026-06-28" },
    { id: 2, name: "Usman Tariq", email: "usman.t@example.com", phone: "0321-9876543", message: "Can I get the fee details for Video Editing?", is_read: true, submitted_at: "2026-06-25" }
  ]
};
