const express = require('express');
const routeur = express.Router();
const { CheckAppartenance } = require('../Middleware/appartenanceMiddle');
const { addRappel } = require('../Controllers/createControl');
const { findRappel } = require('../Controllers/findControl');
const { updateRappel } = require('../Controllers/updateControl');

const Couleur = [
    'red',
    'green',
    'blue',
    'aqua',
    'orange',
    'brown',
    'grey',
    'violet'
]


//Création Rappel
routeur.get('/rappel/:idGroup', CheckAppartenance, async (req, res, next) => {
    const idGroup = parseInt(req.params.idGroup, 10);
    res.render('rappel', { Couleur, idGroup });
})

routeur.post('/rappel/:idGroup', async (req, res) => {
    const idGroup = parseInt(req.params.idGroup, 10);
    const data = req.body;

    let rappel = {
        titre: data.titre,
        description: data.description,
        dateFin: new Date(data.dateFin),
        IDGroup: idGroup,
        couleur: data.couleur
    }

    //On ajoute le rappel à la base de données et on renvoie l'utilisateur dans l'affichage du groupe
    await addRappel(rappel);
    res.redirect('/groupes/' + idGroup);
})

//Modification Rappel
routeur.get('/rappel/:idGroup/:idRappel', CheckAppartenance, async (req, res, next) => {
    //Récupération des données du rappel
    const rappel = await findRappel(parseInt(req.params.idRappel, 10));
    const idGroup = parseInt(req.params.idGroup, 10);
    res.render('rappel', { rappel, Couleur, idGroup });
})

routeur.post('/rappel/:idGroup/:idRappel', async (req, res) => {
    const idGroup = parseInt(req.params.idGroup, 10);
    const idRappel = parseInt(req.params.idRappel, 10);
    const data = req.body;

    let rappel = {
        titre: data.titre,
        description: data.description,
        dateFin: data.dateFin,
        couleur: data.couleur
    }

    //On modifie le rappel et on renvoie l'utilisateur dans l'affichage du groupe
    await updateRappel(idRappel, rappel);
    res.redirect('/groupes/' + idGroup);
})




module.exports = routeur;