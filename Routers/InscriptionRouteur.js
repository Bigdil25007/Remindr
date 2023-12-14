const express = require('express');
const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()
const SHA256 = require("crypto-js/sha256");
const routeur = express.Router();

async function findUser(email) {
  return user = await prisma.users.findUnique({
    where: {
      mail: email,
    },
  })
}

async function addUser(user) {
  const createUser = await prisma.users.create({ data: user })
}

routeur.get('/inscription', (req, res) => {
  res.render('Inscription');
});

routeur.get('/inscription/:error', (req, res) => {
  switch (req.params.error) {
    case '0':
      res.send('Email déja utilisé');
      break;

    case '1':
      res.send('Confirmation du mot de passe incorrect');
      break;

    default:
      res.send("ERROR ! Merci de réessayer s'il vous plaît");
      break;
  }
})


routeur.post('/inscription', async (req, res) => {
  try {
    const data = req.body;
    const test = await findUser(data.email);

    // S'il existe déjà un utilisateur avec le même email
    if (test) {
      res.redirect('/inscription/0');
      return;
    }

    // Si la confirmation du mot de passe n'est pas bonne
    if (data.mdp != data.confirmation) {
      res.redirect('/inscription/1');
      return;
    }

    const profil = {
      mail: data.email,
      nom: data.nom,
      prenom: data.prenom,
      mdp: SHA256(data.mdp).toString()
    }

    //Ajout de l'utilisateur dans la base de données
    await addUser(profil);

    //Récupération du profil depuis la BdD et stockage en session
    const user = await findUser(data.email);
    req.session.user = user;
    res.redirect('/dashboard');

  } catch (err) {
    res.redirect('/inscription/3');
  }
})

module.exports = routeur;