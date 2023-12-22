const express = require('express');
const routeur = express.Router();
const { CheckAppartenance } = require('../Middleware/appartenanceMiddle');
const controller = require('../Controllers/groupeControl');

routeur.get('/groupes/:idGroup', CheckAppartenance, async (req, res, next) => {
  const params = await controller.GetParamsGroupes(req);

  if (params === 'X') {
    res.redirect('/error/X');
  } else {
    res.render('groupes', params);
  }
});


routeur.post('/groupes/:idGroup', async (req, res) => {
  const resultat = await controller.AddMemberGroup(req);

  switch (resultat) {
    case '4':
      res.redirect('/error/4');
      break;

    case '5':
      res.redirect('/error/5');
      break;

    case 'X':
      res.redirect('/error/X');
      break;

    default:
      res.redirect('/groupes/' + resultat);
      break;
  }
});

module.exports = routeur;