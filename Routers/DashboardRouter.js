const express = require('express');
const routeur = express.Router();

routeur.get('/dashboard', (req, res) => {
  //if (req.session.user)
    // res.render('home');
  //else
    res.render('blocked');
});


module.exports = routeur;