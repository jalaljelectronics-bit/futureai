const { PrismaClient } = require('@prisma/client');

// One shared instance, imported everywhere instead of creating
// a new PrismaClient() in every controller (avoids exhausting
// the connection pool).
const prisma = new PrismaClient();

module.exports = prisma;