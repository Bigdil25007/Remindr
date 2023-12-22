const express = require('express');
const routeur = express.Router();
const { CheckAppartenance } = require('../Middleware/appartenanceMiddle');
const controller = require('../Controllers/suppressionRappelControl');

routeur.get('/suppression/:idGroup/:idRappel', CheckAppartenance, (req, res, next) => {
    const params = controller.GetParamsSuppression(req);
    res.render('supprimer', params);
});

routeur.get('/suppression/:idGroup/:idRappel/:choix', CheckAppartenance, async (req, res, next) => {
    await controller.ConfirmSupression(req);
    res.redirect('/groupes/' + parseInt(req.params.idGroup, 10));
});

module.exports = routeur;