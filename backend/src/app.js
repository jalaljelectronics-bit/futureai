const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const errorHandler = require("./middleware/errorHandler");

const coursesRouter = require("./routes/courses");
const adminCoursesRouter = require("./routes/adminCourses");
const authRouter = require("./routes/auth");
const blogPublicRoutes = require("./routes/blogPublicRoutes");
const adminBlogRoutes = require("./routes/adminBlogs");
const successStoriesPublicRoutes = require("./routes/successStoriesPublicRoutes");
const adminSuccessStoriesRouter = require("./routes/adminSuccessStories");
const teamMembersPublicRoutes = require("./routes/teamMembersPublicRoutes");
const adminTeamMembersRouter = require("./routes/adminTeamMembers");

const app = express();

const allowedOrigins = [
     process.env.FRONTEND_URL,
   ].filter(Boolean);

   app.use(cors({
     origin: (origin, callback) => {
       if (
         !origin ||
         /^http:\/\/localhost:\d+$/.test(origin) ||
         allowedOrigins.includes(origin)
       ) {
         callback(null, true);
       } else {
         callback(new Error("Not allowed by CORS"));
       }
     },
     credentials: true,
   }));
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Authentication
app.use("/api/admin", authRouter);

// Public routes
app.use("/api/courses", coursesRouter);
app.use("/api/blog-posts", blogPublicRoutes);

// Protected routes
app.use("/api/admin/courses", adminCoursesRouter);
app.use("/api/admin/blog-posts", adminBlogRoutes);
app.use("/api/success-stories", successStoriesPublicRoutes);
app.use("/api/team-members", teamMembersPublicRoutes);
app.use("/api/admin/success-stories", adminSuccessStoriesRouter);
app.use("/api/admin/team-members", adminTeamMembersRouter);
app.use('/api/contact', require('./routes/contact'));
app.use('/api/admin/contact-submissions', require('./routes/adminContact'));
app.use('/api/announcements', require('./routes/Announcement'));
app.use('/api/admin/announcements', require('./routes/AdminAnnouncement'));
// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

module.exports = app;
