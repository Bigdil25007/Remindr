const express = require('express');
const routeur = express.Router();

routeur.get('/connexion', (req, res) => {
  res.render('Connexion');
});

module.exports = routeur;