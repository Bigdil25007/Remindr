
module.exports = function (req, res, next) {
    if (req.session.user) {
        res.locals.layout = 'connecte';
    } else {
        res.locals.layout = 'main';
    }
    next();
}