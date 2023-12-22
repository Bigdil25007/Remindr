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

async function findGroupNameById(groupId) {
    return group = await prisma.groups.findUnique({
        where: {
            IDGroup: groupId,
        },
        select: {
            nom: true
        }
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
    const appartenance = await prisma.appartenir.findUnique({
        where: {
            IDUser_IDGroup: {
                IDUser: userId,
                IDGroup: groupId
            }
        },
    });

    if (appartenance)
        return true;
    else
        return false;
}

async function findFinishPerson(rappelId) {
    // Rechercher dans la table 'finir' où 'Check' est true et 'IDRappel' correspond au rappelId donné
    const finishedTasks = await prisma.finir.findMany({
        where: {
            IDRappel: rappelId,
            Check: true
        },
        include: {
            user: {
                select: {
                    nom: true,
                    prenom: true
                }
            }
        }
    });

    return finishedTasks.map(task => ({
        nom: task.user.nom,
        prenom: task.user.prenom
    }));
}


module.exports = {
    findGroupByName,
    findGroups,
    findMembres,
    findRappelsFromGroup,
    findUserWithEmail,
    IsUserFromGroup,
    findRappel,
    findFinishPerson,
    findGroupNameById
};