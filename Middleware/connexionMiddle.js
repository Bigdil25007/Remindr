const { PrismaClient, Prisma } = require('@prisma/client')


const prisma = new PrismaClient()

async function findUser(email) {
    return user = await prisma.users.findUnique({
        where: {
            mail: email,
        },
    })
}

module.exports = { findUser };