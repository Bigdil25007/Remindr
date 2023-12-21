
function FormatterTab(tableau) {
    /*
    On récupère le tableau de rappels et on passe tous les éléments à la même profondeur
    On a donc un tableau à 1 dimension au lieu de 2
    Ensuite on trie le tableau en fonction des dates dans l'ordre décroissant
    */
    let tabFormat = tableau.sort(function (a, b) {
        // Convertir les dates en objets Date
        let dateA = new Date(a.dateFin);
        let dateB = new Date(b.dateFin);

        return dateA - dateB;
    });

    /* 
    On va séparer le tableau en 2 sous tableaux pour séparer les rappels dépassés de ceux à faire
    */
    let rappelsAfaire = [];
    let rappelsDepasse = [];
    const currentTimestamp = new Date();

    tabFormat.forEach(rappel => {
        if (rappel.dateFin < currentTimestamp) {
            rappelsDepasse.push(rappel);
        } else {
            rappelsAfaire.push(rappel);
        }
    });

    return { rappelsAfaire, rappelsDepasse };
};

module.exports = { FormatterTab };