
module.exports = function (req, res, next) {
    if (req.session.user) {
        res.locals.layout = 'connecte';
        res.locals.username = req.session.user.prenom;
    } else {
        res.locals.layout = 'main';
    }
    next();
}