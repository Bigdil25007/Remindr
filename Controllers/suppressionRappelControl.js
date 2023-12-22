const { RemoveReminder } = require('./CRUD_traitement/removeControl');

const GetParamsSuppression = (req) => {
    const idGroup = parseInt(req.params.idGroup, 10);
    const idRappel = parseInt(req.params.idRappel, 10);

    return { idGroup, idRappel };
}

const ConfirmSupression = async (req) => {
    const idRappel = parseInt(req.params.idRappel, 10);

    if (parseInt(req.params.choix, 2) === 1) { //Confirmation
        await RemoveReminder(idRappel);
    }
}

module.exports = {
    GetParamsSuppression,
    ConfirmSupression
};