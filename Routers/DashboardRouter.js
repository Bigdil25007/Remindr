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


routeur.get('/dashboard', async (req, res) => {
  if (!req.session.user) {
    res.render('blocked');
    return;
  }

  let data = {
    groups: [],
    rappels: []
  };

  //Récupération des groupes
  data.groups = await findGroups(req.session.user.IDUser);

  //Récupération des rappels de chaque groupe
  let rappels = [];

  for (group in data.groups) {
    rappels = await findRappels(group.IDGroup);
    data.rappels.push(rappels);
  }

  data.rappels = data.rappels.flat();

  res.render('home', data);

});


module.exports = routeur;