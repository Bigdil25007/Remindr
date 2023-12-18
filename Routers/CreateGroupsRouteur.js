const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    // Rediriger l'utilisateur vers '/dashboard'
    res.redirect('/CreateGroups');
});

router.get('/dashboard', (req, res) => {
    res.render('/CreateGroups');
});

module.exports = router;