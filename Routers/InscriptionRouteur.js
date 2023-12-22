const express = require('express');
const routeur = express.Router();
const controller = require('../Controllers/inscriptionControl');


routeur.get('/inscription', (req, res) => {
  res.render('Inscription');
});

routeur.post('/inscription', async (req, res) => {
  const resultat = await controller.inscriptionMember(req);

  switch (resultat) {
    case '0': //email déja utilisé
      res.redirect('/error/0');
      break;

    case '1': //confirmation mot de passe incorrect
      res.redirect('/error/1');
      break;

    case 'X':
      res.redirect('/error/X');
      break;

    default:
      res.redirect('/dashboard');
      break;
  }
})

module.exports = routeur;