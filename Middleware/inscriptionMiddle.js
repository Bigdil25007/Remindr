const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

async function findUser(email) {
    return user = await prisma.users.findUnique({
        where: {
            mail: email,
        },
    })
}

async function addUser(user) {
    const createUser = await prisma.users.create({ data: user })
}

module.exports = { findUser, addUser };