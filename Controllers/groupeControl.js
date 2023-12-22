const { findUserWithEmail, IsUserFromGroup, findRappelsFromGroup, findMembres, findFinishPerson } = require('./CRUD_traitement/findControl');
const { addMember } = require('./CRUD_traitement/createControl');
const { FormaterTab } = require('./CRUD_traitement/traitementControl');


const GetParamsGroupes = async (req) => {
    try {
        const idGroup = parseInt(req.params.idGroup, 10);

        let rappels = {
            IDRappel: null,
            titre: "",
            description: "",
            dateCreation: new Date(),
            dateFin: new Date(),
            IDGroup: null,
            couleur: null,
            checkNom: [], //liste les personnes ayant fini la tâche
            fait: null  //permet de savoir si l'utilisateur a déjà fini la tâche
        }

        //On stocke les données de base des rappels
        rappels = await findRappelsFromGroup(idGroup);

        //On stocke en plus la liste des membres ayant fini la tâche
        for (let ind = 0; ind < rappels.length; ind++) {
            rappels[ind].checkNom = await findFinishPerson(rappels[ind].IDRappel);
            rappels[ind].fait = rappels[ind].checkNom.some(person => person.prenom === req.session.user.prenom);
        }

        const { rappelsAfaire, rappelsDepasse } = FormaterTab(rappels);

        const data = {
            rappelsAfaire: rappelsAfaire,
            rappelsDepasse: rappelsDepasse,
            membres: await findMembres(idGroup),
            IdGroup: idGroup
        }

        return data;
    } catch (err) {
        return 'X';
    }
}


const AddMemberGroup = async (req) => {
    try {
        //Ajout d'un utilisateur 
        const idGroup = parseInt(req.params.idGroup, 10);
        const email = req.body.emailUtilisateur;

        const user = await findUserWithEmail(email);

        //Utilisateur introuvable
        if (!user) {
            return '4';
        }

        //On regarde si la personne n'est pas deja sur le groupe
        const check = await IsUserFromGroup(user.IDUser, idGroup);

        if (check) {
            return '5';
        }

        await addMember(user.IDUser, idGroup);
        return idGroup;

    } catch (err) {
        res.redirect('/error/X');
    }
}

module.exports = { GetParamsGroupes, AddMemberGroup };