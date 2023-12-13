const express = require('express');
const routeur = express.Router();

routeur.get('/inscription', (req, res) => {
  res.render('Inscription');
});

module.exports = routeur;