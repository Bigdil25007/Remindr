const { PrismaClient, Prisma } = require('@prisma/client');
const express = require('express');
const routeur = express.Router();
const prisma = new PrismaClient();

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

async function findRappels(groupId) {
  return rappels = await prisma.reminders.findMany({
    where: {
      IDGroup: groupId,
    },
  });
}

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
  //try {
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
  /*} catch (err) {
    res.redirect('/error/X');
  }*/
});

routeur.post('/dashboard', async (req, res) => {
  //try {
  //Ajout d'un groupe
  const nomGroup = req.body.nomGroupe;

  //On regarde si le nom existe déja
  const group = await findGroupByName(nomGroup);

  if (group) {
    res.redirect('/error/6');
    return;
  }

  //On crée le groupe, on ajoute l'utilisateur et on redirige
  const groupId = await createGroup(nomGroup);
  await addMember(req.session.user.IDUser, groupId);

  res.redirect('/groupes/' + groupId);

  /*} catch (err) {
    console.log(err);
    res.redirect('/error/X');
  }*/
});


module.exports = routeur;