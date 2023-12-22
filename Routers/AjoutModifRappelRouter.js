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

    switch (resultat) {
        case '8':
            res.redirect('/error/8');
            break;
        case 'X':
            res.redirect('/error/X');
            break;

        default:
            res.redirect('/groupes/' + resultat);
            break;
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

    switch (resultat) {
        case '8':
            res.redirect('/error/8');
            break;
        case 'X':
            res.redirect('/error/X');
            break;

        default:
            res.redirect('/groupes/' + resultat);
            break;
    }
})




module.exports = routeur;