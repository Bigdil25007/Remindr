const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

async function createGroup(nomGroupe) {
    const groupe = await prisma.groups.create({
        data: {
            nom: nomGroupe,
        },
    });

    return groupe.IDGroup;
}

async function addMember(userId, groupId) {
    const appartenance = await prisma.appartenir.create({
        data: {
            IDUser: userId,
            IDGroup: groupId,
        },
    })
}

async function addUser(user) {
    return createUser = await prisma.users.create({ data: user })
}

module.exports = {
    createGroup,
    addMember,
    addUser
};