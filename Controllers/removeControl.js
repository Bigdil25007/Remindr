const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();


async function RemoveReminder(rappelId) {
    const deletedReminder = await prisma.reminders.delete({
        where: {
            IDRappel: rappelId
        }
    });
}

module.exports = { RemoveReminder };