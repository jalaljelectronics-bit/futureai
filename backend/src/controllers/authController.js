const prisma = require("../config/prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const admin = await prisma.adminUser.findUnique({
    where: { username },
  });

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }

  const validPassword = await bcrypt.compare(
    password,
    admin.passwordHash
  );

  if (!validPassword) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }

  const token = jwt.sign(
    {
      adminId: admin.id,
      username: admin.username,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

const isProduction = process.env.NODE_ENV === "production";

res.cookie("token", token, {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

  res.json({
    success: true,
    admin: {
      id: admin.id,
      username: admin.username,
      role: admin.role,
    },
  });
};

exports.logout = (req, res) => {
  res.clearCookie("token");

  res.json({
    success: true,
    message: "Logged out",
  });
};
// exports.me = asyncHandler(async (req, res) => {
//   const admin = await prisma.adminUser.findUnique({
//     where: {
//       id: req.admin.id,
//     },
//     select: {
//       id: true,
//       username: true,
//       role: true,
//     },
//   });

//   if (!admin) {
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized",
//     });
//   }

//   res.json({
//     success: true,
//     admin,
//   });
// });


exports.me = async (req, res) => {
  const admin = await prisma.adminUser.findUnique({
    where: {
      id: req.admin.id,
    },
    select: {
      id: true,
      username: true,
      role: true,
    },
  });

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  res.json({
    success: true,
    admin,
  });
};