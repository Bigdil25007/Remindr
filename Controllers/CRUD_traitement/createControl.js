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
            user: {
                connect: { IDUser: userId }
            },
            group: {
                connect: { IDGroup: groupId }
            }
        },
    })
}

async function addUser(user) {
    return createUser = await prisma.users.create({ data: user })
}

async function addRappel(rappel) {
    return createRappel = await prisma.reminders.create({ data: rappel })
}

async function addFini(rappelId, userId) {
    return createFini = await prisma.finir.create({
        data: {
            IDUser: userId,
            IDRappel: rappelId,
            Check: true
        }
    })
}

module.exports = {
    createGroup,
    addMember,
    addUser,
    addRappel,
    addFini
};