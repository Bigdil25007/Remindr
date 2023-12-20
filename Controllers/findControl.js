const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

async function findUserWithEmail(email) {
    return user = await prisma.users.findUnique({
        where: {
            mail: email,
        },
    })
}


async function findGroups(userId) {
    return groups = await prisma.groups.findMany({
        where: {
            appartenir: {
                some: {
                    IDUser: userId,
                },
            },
        },
    });
}

async function findGroupByName(nameGroup) {
    return group = await prisma.groups.findUnique({
        where: {
            nom: nameGroup,
        },
    });
}

async function findRappelsFromGroup(groupId) {
    return rappels = await prisma.reminders.findMany({
        where: {
            IDGroup: groupId,
        },
    });
}

async function findRappel(rappelId) {
    return rappels = await prisma.reminders.findUnique({
        where: {
            IDRappel: rappelId,
        },
    });
}

async function findMembres(groupId) {
    return membres = await prisma.users.findMany({
        where: {
            appartenir: {
                some: {
                    IDGroup: groupId,
                },
            },
        },
    });
}

async function IsUserFromGroup(userId, groupId) {
    /*
    On regarde si on trouve le groupe qui correspond à l'ID de groupe et qui contient l'id de l'user
    */
    return group = await prisma.groups.findMany({
        where: {
            AND: [
                {
                    IDGroup: groupId,
                },
                {
                    appartenir: {
                        some: {
                            IDUser: userId,
                        },
                    },
                },
            ],
        },
    });
}


module.exports = {
    findGroupByName,
    findGroups,
    findMembres,
    findRappelsFromGroup,
    findUserWithEmail,
    IsUserFromGroup,
    findRappel
};