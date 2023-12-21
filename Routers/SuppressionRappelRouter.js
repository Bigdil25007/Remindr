const express = require('express');
const routeur = express.Router();
const { CheckAppartenance } = require('../Middleware/appartenanceMiddle');
const { RemoveReminder } = require('../Controllers/removeControl');

routeur.get('/suppression/:idGroup/:idRappel', CheckAppartenance, (req, res, next) => {
    res.render('supprimer');
});

routeur.post('/suppression/:idGroup/:idRappel/:choix', CheckAppartenance, async (req, res, next) => {
    const idRappel = parseInt(req.params.idRappel, 10);

    if (parseInt(req.params.choix, 2) === 1) {
        await RemoveReminder(idRappel);
    }

    res.redirect('/groupes/' + parseInt(req.params.idGroup, 10));
});

module.exports = routeur;