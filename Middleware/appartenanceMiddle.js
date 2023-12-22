const { IsUserFromGroup } = require('../Controllers/CRUD_traitement/findControl');

async function CheckAppartenance(req, res, next) {
    try {
        //Si l'utilisateur n'est pas connecté, on affiche la page pour proposer de se connecter ou inscrire
        if (!req.session.user) {
            res.render('blocked');
            return;
        }

        const check = await IsUserFromGroup(req.session.user.IDUser, parseInt(req.params.idGroup, 10));

        //Si la fonction renvoie false c'est que l'utilisateur ne fait partie du groupe (= accès interdit)
        if (!check) {
            res.redirect('/error/7');
            return;
        }
        next();

    } catch (err) {
        res.redirect('/error/X');
    }
}


module.exports = { CheckAppartenance };