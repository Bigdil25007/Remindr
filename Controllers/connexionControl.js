const express = require('express');
const routeur = express.Router();
const SHA256 = require("crypto-js/sha256");
const middleware = require('../Middleware/connexionMiddle');

routeur.get('/connexion/:error', (req, res) => {
    switch (req.params.error) {
        case '0':
            res.send('Email incorrect');
            break;

        case '1':
            res.send('Mot de passe incorrect');
            break;

        default:
            res.send("ERROR ! Merci de réessayer s'il vous plaît");
            break;
    }
})

routeur.post('/connexion', async (req, res) => {
    try {

        const data = req.body;
        const user = await middleware.findUser(data.email);

        // Si l'utilisateur n'est pas trouvé
        if (!user) {
            res.redirect('/connexion/0'); // Redirige si l'email est incorrect
            return;
        }

        // Si le mot de passe est incorrect
        if (user.mdp !== SHA256(data.mdp).toString()) {
            res.redirect('/connexion/1'); // Redirige si le mot de passe est incorrect
            return;
        }

        req.session.user = user;
        res.redirect('/dashboard');

    } catch (err) {
        res.redirect('/connexion/3')
    }
})

module.exports = routeur;