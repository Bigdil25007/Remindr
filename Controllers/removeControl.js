const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();


async function RemoveReminder(rappelId) {
    const deletedReminder = await prisma.reminders.delete({
        where: {
            IDRappel: rappelId
        }
    });
}

async function removeFini(rappelId, userId) {
    return deletedFini = await prisma.finir.delete({
        where: {
            IDUser_IDRappel: {
                IDUser: userId,
                IDRappel: rappelId
            }
        }
    });
}

module.exports = {
    RemoveReminder,
    removeFini
};