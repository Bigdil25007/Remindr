const { IsUserFromGroup } = require('../Controllers/findControl');

//Permet de vérifier que l'utilisateur est connecté et fais partie du groupe
async function CheckAppartenance(req, res, next) {
    try {
        if (!req.session.user) {
            res.render('blocked');
            return;
        }

        const group = await IsUserFromGroup(req.session.user.IDUser, parseInt(req.params.idGroup, 10));

        //Si la fonction ne renvoie rien c'est que l'utilisateur ne fait partie du groupe (= accès interdit)
        if (!group) {
            res.redirect('/error/7');
            return;
        }
        next();

    } catch (err) {
        res.redirect('/error/X');
    }
}


module.exports = { CheckAppartenance };