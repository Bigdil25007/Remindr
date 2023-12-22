//Permet d'afficher le bon en tête en fonction de si l'utilisateur est connecté
module.exports = function (req, res, next) {
    if (req.session.user) {
        res.locals.layout = 'connecte';
        res.locals.username = req.session.user.prenom;
    } else {
        res.locals.layout = 'main';
    }
    next();
}