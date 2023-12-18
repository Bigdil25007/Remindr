const { PrismaClient, Prisma } = require('@prisma/client');
const express = require('express');
const routeur = express.Router();
const prisma = new PrismaClient();

async function findGroup(userId, groupId) {
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
            is: {
              IDUser: userId,
            },
          },
        },
      ],
    },
  });
}

async function findRappels(groupId) {
  return rappels = await prisma.reminders.findMany({
    where: {
      IDGroup: groupId,
    },
  });
}

async function findMembres(groupId) {
  return membres = await prisma.users.findMany({
    where: {
      appartenir: {
        is: {
          IDGroup: groupId,
        },
      },
    },
  });
}


function FormatterTab(tableau) {
  /*
  On récupère le tableau de rappels et on passe tous les éléments à la même profondeur
  On a donc un tableau à 1 dimension au lieu de 2
  Ensuite on trie le tableau en fonction des dates dans l'ordre décroissant
  */
  let tabFormat = tableau.sort(function (a, b) {
    // Convertir les dates en objets Date
    let dateA = new Date(a.dateFin);
    let dateB = new Date(b.dateFin);

    return dateB - dateA;
  });

  /* 
  On va séparer le tableau en 2 sous tableaux pour séparer les rappels dépassés de ceux à faire
  */
  let rappelsAfaire = [];
  let rappelsDepasse = [];
  const currentTimestamp = new Date();

  tabFormat.forEach(rappel => {
    if (rappel.dateFin < currentTimestamp) {
      rappelsDepasse.push(rappel);
    } else {
      rappelsAfaire.push(rappel);
    }
  });

  return { rappelsAfaire, rappelsDepasse };
};

routeur.get('/groupes/:idGroup', async (req, res) => {
  if (!req.session.user) {
    res.render('blocked');
    return;
  }

  const group = await findGroup(req.session.user.IDUser, parseInt(req.params.idGroup, 10));

  //Sécurité si une personne essaye d'accèder à un groupe par l'url
  if (!group) {
    res.send("Vous ne faites pas partie de ce groupe !");
    return;
  }

  const rappels = await findRappels(group.IDGroup);
  const data = FormatterTab(rappels);
  data.membres = await findMembres(group.IDGroup);

  res.render('groupes', data);
});

module.exports = routeur;