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
            res.send('ERROR');
            break;
    }
})

routeur.get('/connexion', (req, res) => {
    console.log("hello");
})

routeur.post('/connexion', (req, res, next) => {
    try {
        console.log('essaie connexion');
        const data = req.body
        const user = middleware.findUser(data.email)
        console.log(`user = ${user}`);
        if (user && user.mdp === CryptoJS.SHA256(data.mdp).toString()) {
            req.session.user = user
            res.redirect('/dashboard')
        } else {
            res.redirect('/connexion/1')
        }
    } catch (err) {
        res.redirect('/connexion/0')
    }
})

module.exports = routeur;