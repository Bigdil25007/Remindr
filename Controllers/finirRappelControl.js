const { addFini } = require('./CRUD_traitement/createControl');
const { removeFini } = require('./CRUD_traitement/removeControl');


const ManageFinishRappel = async (req) => {
    try {
        const IdUser = parseInt(req.session.user.IDUser, 10);
        const idRappel = parseInt(req.params.idRappel, 10);
        const choix = parseInt(req.params.choix, 2); //base 2 car booléen

        if (choix === 0) { //Annuler
            await removeFini(idRappel, IdUser);
        } else { //Finir
            await addFini(idRappel, IdUser);
        }
    } catch (err) {
        return 'X';
    }
}

module.exports = { ManageFinishRappel };