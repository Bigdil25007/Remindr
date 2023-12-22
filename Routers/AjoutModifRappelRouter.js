const express = require('express');
const routeur = express.Router();
const controller = require('../Controllers/AjoutModifRappelControl');
const { CheckAppartenance } = require('../Middleware/appartenanceMiddle');

//Création Rappel
routeur.get('/rappel/:idGroup', CheckAppartenance, (req, res, next) => {
    const params = controller.GetParamsCreateRappel(req);
    res.render('rappel', params);
})

routeur.post('/rappel/:idGroup', async (req, res) => {
    const resultat = await controller.PostNewRappel(req);

    if (resultat === 'X') {
        res.redirect('/error/X');
    } else {
        res.redirect('/groupes/' + idGroup);
    }
})



//Modification Rappel
routeur.get('/rappel/:idGroup/:idRappel', CheckAppartenance, async (req, res, next) => {
    const params = await controller.GetParamsModifyRappel(req);

    if (params === 'X') {
        res.redirect('/error/X');
    } else {
        res.render('rappel', params);
    }
})

routeur.post('/rappel/:idGroup/:idRappel', async (req, res) => {
    const resultat = await controller.ModifyRappel(req);

    if (resultat === 'X') {
        res.redirect('/error/X');
    } else {
        res.redirect('/groupes/' + idGroup);
    }
})




module.exports = routeur;