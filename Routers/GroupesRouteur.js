const express = require('express');
const routeur = express.Router();

routeur.get('/dashboard', (req, res) => {
    res.redirect('groupes');
});

// Nouvelle route pour les groupes
routeur.get('/groupes', (req, res) => {
    if (req.session.user) {
      const data = {
        rappels: []
      };
    
      // Données pour les rappels
      for (let i = 1; i <= 10; i++) {
        data.rappels.push({ titre: `titre_rappel ${i}`, date_echeance: `XX/XX/XXXX`, description: `blablalba` });
      }
  
      res.render('groupes', data);
    }
  
    else
      res.render('blocked');
  });

module.exports = routeur;