const express = require('express');
const routeur = express.Router();

routeur.get('/error/:idError', (req, res) => {
    switch (req.params.idError) {
        //Inscription
        case '0':
            res.send('Email déja utilisé');
            break;

        case '1':
            res.send('Confirmation du mot de passe incorrect');
            break;

        //Connexion
        case '2':
            res.send('Email inconnu');
            break;

        case '3':
            res.send('Mot de passe incorrect');
            break;

        //Ajout d'un utilisateur dans un groupe
        case '4':
            res.send("L'utilisateur n'existe pas");
            break;

        case '5':
            res.send("L'utilisateur fait déjà parti du groupe");
            break;

        //Création d'un groupe
        case '6':
            res.send("Ce nom de groupe existe déja");
            break;

        //Accès à un groupe non autorisé (en cas d'accès par l'url)
        case '7':
            res.send("Vous n'avez pas accès à ce groupe");
            break;

        //Erreurs non gérés
        default:
            res.send("ERROR ! Merci de réessayer s'il vous plaît");
            break;
    }
});

module.exports = routeur;
