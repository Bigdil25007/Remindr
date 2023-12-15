const express = require('express');
const routeur = express.Router();

routeur.get('/dashboard', (req, res) => {
  if (req.session.user) {
    const data = {
      groups: [],
      rappels: []
    };

    // Données pour les groupes
    for (let i = 1; i <= 10; i++) {
      data.groups.push({ nom: `nom_groupe ${i}`, GroupeID: i });
    }

    // Données pour les rappels
    for (let i = 1; i <= 10; i++) {
      data.rappels.push({ titre: `titre_rappel ${i}`, date: `date_rappel ${i}`, GrRef: `GroupeID : ${i}` });
    }

    res.render('home', data);
  }

  else
    res.render('blocked');
});


module.exports = routeur;