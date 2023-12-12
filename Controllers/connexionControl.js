const express = require('express');
const app = express();
const crypto = require('crypto');

const middleware = require('../Middleware/connexionMiddle');

app.get('/login/:error', (req, res) => {
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

app.post('/login', (req, res, next) => {
    try {
        const data = req.body
        const user = middleware.findUser(data.email)

        if (user && user.mdp === crypto.createHash('sha256').update(data.mdp).digest('hex')) {
            req.session.userId = user.IDUser
            req.session.userNom = user.nom
            req.session.userPrenom = user.prenom

            res.redirect('/dashboard')
        } else {
            res.redirect('/login/1')
        }
    } catch (err) {
        res.redirect('/login/0')
    }
})