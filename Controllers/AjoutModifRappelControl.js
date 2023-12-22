const { addRappel } = require('./CRUD_traitement/createControl');
const { findRappel } = require('./CRUD_traitement/findControl');
const { updateRappel } = require('./CRUD_traitement/updateControl');

const Couleur = [
    'red',
    'green',
    'blue',
    'aqua',
    'orange',
    'brown',
    'grey',
    'violet'
]

const GetParamsCreateRappel = (req) => {
    const idGroup = parseInt(req.params.idGroup, 10);
    return { Couleur, idGroup };
}

const PostNewRappel = async (req) => {
    try {
        const idGroup = parseInt(req.params.idGroup, 10);
        const data = req.body;

        let rappel = {
            titre: data.titre,
            description: data.description,
            dateFin: new Date(data.dateFin),
            IDGroup: idGroup,
            couleur: data.couleur
        }

        //On ajoute le rappel à la base de données et on renvoie l'utilisateur dans l'affichage du groupe
        await addRappel(rappel);

        return idGroup;
    } catch (err) {
        return 'X';
    }
}

const GetParamsModifyRappel = async (req) => {
    try {
        const rappel = await findRappel(parseInt(req.params.idRappel, 10));
        const idGroup = parseInt(req.params.idGroup, 10);
        return { rappel, Couleur, idGroup };
    } catch (err) {
        return 'X';
    }
}

const ModifyRappel = async (req) => {
    try {
        const idGroup = parseInt(req.params.idGroup, 10);
        const idRappel = parseInt(req.params.idRappel, 10);
        const data = req.body;

        let rappel = {
            titre: data.titre,
            description: data.description,
            dateFin: data.dateFin,
            couleur: data.couleur
        }

        //On modifie le rappel et on renvoie l'utilisateur dans l'affichage du groupe
        await updateRappel(idRappel, rappel);

        return idGroup;
    } catch (err) {
        return 'X';
    }
}

module.exports = {
    GetParamsCreateRappel,
    PostNewRappel,
    GetParamsModifyRappel,
    ModifyRappel
}
