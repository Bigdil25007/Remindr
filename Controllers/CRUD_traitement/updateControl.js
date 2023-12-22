const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateRappel(idRappel, rappel) {
    const updateUser = await prisma.reminders.update({
        where: {
            IDRappel: idRappel,
        },
        data: {
            titre: rappel.titre,
            description: rappel.description,
            dateFin: rappel.dateFin,
            couleur: rappel.couleur,
        },
    })
}

module.exports = { updateRappel };