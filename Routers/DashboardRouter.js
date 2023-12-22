const express = require('express');
const routeur = express.Router();
const controller = require('../Controllers/dashboardControl');

routeur.get('/dashboard', async (req, res) => {
  const resultat = await controller.GetParamsDashboard(req);

  switch (resultat) {
    case '1':
      res.render('blocked');
      break;

    case 'X':
      res.redirect('/error/X');
      break;

    default:
      res.render('home', resultat);
      break;
  }
});

routeur.post('/dashboard', async (req, res) => {
  const resultat = await controller.AddGroup(req);

  switch (resultat) {
    case '6':
      res.redirect('/error/6');
      break;

    case 'X':
      res.redirect('/error/X');
      break;

    default:
      res.redirect('/groupes/' + groupId);
      break;
  }
});


module.exports = routeur;