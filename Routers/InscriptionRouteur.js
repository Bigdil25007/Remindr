const express = require('express');
const SHA256 = require("crypto-js/sha256");
const routeur = express.Router();
const { findUserWithEmail } = require('../Controllers/findControl');
const { addUser } = require('../Controllers/createControl');


routeur.get('/inscription', (req, res) => {
  res.render('Inscription');
});

routeur.post('/inscription', async (req, res) => {
  //try {
  const data = req.body;
  const test = await findUserWithEmail(data.email);

  // S'il existe déjà un utilisateur avec le même email
  if (test) {
    res.redirect('/error/0');
    return;
  }

  // Si la confirmation du mot de passe n'est pas bonne
  if (data.mdp != data.confirmation) {
    res.redirect('/error/1');
    return;
  }

  const profil = {
    mail: data.email,
    nom: data.nom,
    prenom: data.prenom,
    mdp: SHA256(data.mdp).toString()
  }

  //Ajout de l'utilisateur dans la base de données et stockage en session
  const user = await addUser(profil);
  req.session.user = user;
  res.redirect('/dashboard');

  /*} catch (err) {
    res.redirect('/error/X');
  }*/
})

module.exports = routeur;