const { PrismaClient, Prisma } = require('@prisma/client');
const express = require('express');
const SHA256 = require("crypto-js/sha256");
const routeur = express.Router();
const prisma = new PrismaClient();

async function findUser(email) {
  return user = await prisma.users.findUnique({
    where: {
      mail: email,
    },
  })
}

routeur.get('/connexion', (req, res) => {
  res.render('Connexion');
});


routeur.post('/connexion', async (req, res) => {
  try {
    const data = req.body;
    const user = await findUser(data.email);

    // Si l'utilisateur n'est pas trouvé => email incorrect
    if (!user) {
      res.redirect('/error/2');
      return;
    }

    // Si le mot de passe est incorrect
    if (user.mdp !== SHA256(data.mdp).toString()) {
      res.redirect('/error/3');
      return;
    }

    req.session.user = user;
    res.redirect('/dashboard');

  } catch (err) {
    res.redirect('/error/X');
  }
})

module.exports = routeur;