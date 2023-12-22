const SHA256 = require("crypto-js/sha256");
const { findUserWithEmail } = require('./CRUD_traitement/findControl');
const { addUser } = require('./CRUD_traitement/createControl');

const inscriptionMember = async (req) => {
    try {
        const data = req.body;
        const test = await findUserWithEmail(data.email);

        // S'il existe déjà un utilisateur avec le même email
        if (test) {
            return '0';
        }

        // Si la confirmation du mot de passe n'est pas bonne
        if (data.mdp != data.confirmation) {
            return '1';
        }

        const profil = {
            mail: data.email,
            nom: data.nom,
            prenom: data.prenom,
            mdp: SHA256(data.mdp).toString()
        }

        //Ajout de l'utilisateur dans la base de données et stockage en session
        const user = await addUser(profil);
        req.session.user = user;
    } catch (err) {
        return 'X';
    }
}

module.exports = { inscriptionMember };