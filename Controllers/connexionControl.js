const SHA256 = require("crypto-js/sha256");
const { findUserWithEmail } = require('./CRUD_traitement/findControl');


const connectUser = async (req) => {
    try {
        const data = req.body;
        const user = await findUserWithEmail(data.email);

        // Si l'utilisateur n'est pas trouvé => email incorrect
        if (!user) {
            return '2';
        }

        // Si le mot de passe est incorrect
        if (user.mdp !== SHA256(data.mdp).toString()) {
            return '3';
        }

        //On enregistre l'utilisateur en session
        req.session.user = user;
        return '0';

    } catch (err) {
        return 'X';
    }
}

module.exports = { connectUser };