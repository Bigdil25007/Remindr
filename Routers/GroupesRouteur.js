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
            some: {
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
        some: {
          IDGroup: groupId,
        },
      },
    },
  });
}

async function CheckUserOutsideGroup(email, groupId) {
  const user = await prisma.users.findUnique({
    where: {
      mail: email,
    },
  });

  //Utilisateur introuvable
  if (!user) {
    res.redirect('/error/4');
    return;
  }

  //On va réutiliser findGroup() pour voir si l'utilisateur fait déjà parti du groupe
  const checkGroup = await findGroup(user.IDUser, groupId);

  if (checkGroup) {
    res.redirect('/error/5');
    return;
  }

  //L'utilisateur existe et n'est pas dans le groupe
  return user.IDUser;
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
  try {
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
  } catch (err) {
    console.log(err);
    res.redirect('/error/X');
  }
});


routeur.post('/groupes/:idGroup', async (req, res) => {
  //try {
  //Ajout d'un utilisateur 
  const email = req.body.mail;

  //On regarde si la personne existe et si la personne n'est pas deja sur le groupe
  const userID = await CheckUserOutsideGroup(email, parseInt(req.params.idGroup, 10));

  if (!userID) {
    return;
  }

  await addMember(userID, parseInt(req.params.idGroup, 10));
  /*} catch (err) {
    console.log(err);
    res.redirect('/error/X');
  }*/
});

module.exports = routeur;