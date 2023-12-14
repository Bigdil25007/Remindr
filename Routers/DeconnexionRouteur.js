const express = require('express');
const router = express.Router();

router.get('/deconnexion', (req, res) => {
    // Supprimer les informations de l'utilisateur de la session
    delete req.session.user;

    // Rediriger l'utilisateur vers '/dashboard'
    res.redirect('/dashboard');
});

module.exports = router;
