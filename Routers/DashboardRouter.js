const express = require('express');
const routeur = express.Router();

routeur.get('/dashboard', (req, res) => {
  res.render('home');
});


module.exports = routeur;