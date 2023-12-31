const express = require('express');
const routeur = express.Router();
const controller = require('../Controllers/connexionControl');

routeur.get('/connexion', (req, res) => {
  res.render('Connexion');
});


routeur.post('/connexion', async (req, res) => {
  const resultat = await controller.connectUser(req);

  switch (resultat) {
    case '2': //Email inconnu
      res.redirect('/error/2');
      break;

    case '3': //mot de passe incorrect
      res.redirect('/error/3');
      break;

    case '0': // email déjà utilisé
      res.redirect('/dashboard');
      break;

    default:
      res.redirect('/error/X');
      break;
  }
})

module.exports = routeur;