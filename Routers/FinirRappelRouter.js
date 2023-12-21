const express = require('express');
const routeur = express.Router();
const { CheckAppartenance } = require('../Middleware/appartenanceMiddle');
const { addFini } = require('../Controllers/createControl');
const { removeFini } = require('../Controllers/removeControl');

routeur.get('/finir/:idGroup/:idRappel/:choix', CheckAppartenance, async (req, res, next) => {
    if (parseInt(req.params.choix, 2) === 0) { //Annuler
        removeFini(parseInt(req.params.idRappel, 10), parseInt(req.session.user.IDUser, 10));
    } else { //Finir
        addFini(parseInt(req.params.idRappel, 10), parseInt(req.session.user.IDUser, 10));
    }

    res.redirect('/groupes/' + parseInt(req.params.idGroup, 10));
});

module.exports = routeur;