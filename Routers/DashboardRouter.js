const { PrismaClient, Prisma } = require('@prisma/client');
const express = require('express');
const routeur = express.Router();
const prisma = new PrismaClient();

async function findGroups(userId) {
  return groups = await prisma.groups.findMany({
    where: {
      Appartenir: {
        is: {
          IDUser: userId,
        },
      },
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

function FormatterTab(tableau) {
  /*
  On récupère le tableau de rappels et on passe tous les éléments à la même profondeur
  On a donc un tableau à 1 dimension au lieu de 2
  Ensuite on trie le tableau en fonction des dates dans l'ordre décroissant
  */
  let tabFormat = tableau.flat().sort(function (a, b) {
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


routeur.get('/dashboard', async (req, res) => {
  if (!req.session.user) {
    res.render('blocked');
    return;
  }

  let data = {
    groups: [],
    rappelsAfaire: [],
    rappelsDepasse: []
  };

  //Récupération des groupes
  data.groups = await findGroups(req.session.user.IDUser);

  //Récupération des rappels de chaque groupe
  let rappels = [];

  for (group in data.groups) {
    resultat = await findRappels(group.IDGroup);
    rappels.push(resultat);
  }

  const { rappelsAfaire, rappelsDepasse } = FormatterTab(rappels);

  data.rappelsAfaire = rappelsAfaire;
  data.rappelsDepasse = rappelsDepasse;

  res.render('home', data);
});


module.exports = routeur;