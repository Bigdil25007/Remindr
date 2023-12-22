const express = require('express');
const routeur = express.Router();
const { CheckAppartenance } = require('../Middleware/appartenanceMiddle');
const controller = require('../Controllers/finirRappelControl');

routeur.get('/finir/:idGroup/:idRappel/:choix', CheckAppartenance, async (req, res, next) => {
    /*
    Cette route sert seuleument à gérer la complétion d'un rappel et n'a donc pas de render()
    Elle permet seuleument d'appeler la fonction ManageFinishRappel() puis rediriger sur la page de groupe
    */
    const resultat = await controller.ManageFinishRappel(req);

    if (resultat === 'X') {
        res.redirect('/error/X');
    } else {
        res.redirect('/groupes/' + parseInt(req.params.idGroup, 10));
    }
});

module.exports = routeur;