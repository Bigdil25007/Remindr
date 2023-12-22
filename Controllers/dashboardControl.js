const { findGroupByName, findGroups, findRappelsFromGroup, findGroupNameById } = require('./CRUD_traitement/findControl');
const { addMember, createGroup } = require('./CRUD_traitement/createControl');
const { FormaterTab } = require('./CRUD_traitement/traitementControl');

const GetParamsDashboard = async (req) => {
    try {
        if (!req.session.user) {
            return '1';
        }

        //Récupération des groupes et des rappels de chaque groupe
        let groups = await findGroups(req.session.user.IDUser);

        let rappels = [];

        for (const group of groups) {
            resultat = await findRappelsFromGroup(group.IDGroup);
            rappels.push(resultat);
        }

        const { rappelsAfaire, rappelsDepasse } = FormaterTab(rappels.flat());

        //Récupération du nom de chaque groupe (ajouté au tableau rappelsAfaire)
        for (let ind = 0; ind < rappelsAfaire.length; ind++) {
            const groupInfo = await findGroupNameById(rappelsAfaire[ind].IDGroup);
            rappelsAfaire[ind].nomGroup = groupInfo.nom;
        }

        let data = {
            groups: groups,
            rappelsAfaire: rappelsAfaire
        };

        return data;
    } catch (err) {
        return 'X';
    }
}

const AddGroup = async (req) => {
    try {
        //Ajout d'un groupe
        const nomGroup = req.body.nomGroupe;

        //On regarde si un groupe avec le même nom existe déja
        const group = await findGroupByName(nomGroup);

        if (group) {
            return '6';
        }

        //On crée le groupe, on ajoute l'utilisateur et on redirige
        const groupId = await createGroup(nomGroup);
        await addMember(req.session.user.IDUser, groupId);

        return groupId;
    } catch (err) {
        return 'X';
    }
}

module.exports = {
    GetParamsDashboard,
    AddGroup
};