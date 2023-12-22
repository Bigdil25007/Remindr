const express = require('express');
const routeur = express.Router();

// Les messages d'erreur sont stockés dans un objet
const errorMessages = {
    '0': 'Email déjà utilisé',
    '1': 'Confirmation du mot de passe incorrect',
    '2': 'Email inconnu',
    '3': 'Mot de passe incorrect',
    '4': "L'utilisateur n'existe pas",
    '5': "L'utilisateur fait déjà partie du groupe",
    '6': "Ce nom de groupe existe déjà",
    '7': "Vous n'avez pas accès à ce groupe",
    '8': "Vous n'avez pas sélectionné de couleur"
};

routeur.get('/error/:idError', (req, res) => {
    // Obtenez le message d'erreur à partir de l'objet errorMessages en utilisant l'idError, ou un message par défaut
    const errorMessage = errorMessages[req.params.idError] || "Erreur non spécifiée. Merci de réessayer s'il vous plaît.";

    // Envoyez le message d'erreur au template erreur.handlebars
    res.render('erreurs', { message: errorMessage });
});

module.exports = routeur;
