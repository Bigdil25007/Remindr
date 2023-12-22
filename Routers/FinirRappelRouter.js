const express = require('express');
const routeur = express.Router();
const { CheckAppartenance } = require('../Middleware/appartenanceMiddle');
const controller = require('../Controllers/finirRappelControl');

routeur.get('/finir/:idGroup/:idRappel/:choix', CheckAppartenance, async (req, res, next) => {
    const resultat = await controller.ManageFinishRappel(req);

    if (resultat === 'X') {
        res.redirect('/error/X');
    } else {
        res.redirect('/groupes/' + parseInt(req.params.idGroup, 10));
    }
});

module.exports = routeur;