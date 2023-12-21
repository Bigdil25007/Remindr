function FormaterTab(tableau) {
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

    //On passe les rappels en format utilisable
    for (let i = 0; i < rappelsAfaire.length; i++) {
        rappelsAfaire[i].dateCreation = FormaterDate(rappelsAfaire[i].dateCreation);
        rappelsAfaire[i].dateFin = FormaterDate(rappelsAfaire[i].dateFin);
    }

    for (let i = 0; i < rappelsDepasse.length; i++) {
        rappelsDepasse[i].dateCreation = FormaterDate(rappelsDepasse[i].dateCreation);
        rappelsDepasse[i].dateFin = FormaterDate(rappelsDepasse[i].dateFin);
    }

    return { rappelsAfaire, rappelsDepasse };
};

function FormaterDate(dateBase) {
    const date = new Date(dateBase);
    const deuxChiffres = (num) => num.toString().padStart(2, '0');

    const jour = deuxChiffres(date.getDate());
    const mois = deuxChiffres(date.getMonth() + 1); // Les mois sont indexés à partir de 0
    const annee = date.getFullYear();
    const heure = deuxChiffres(date.getHours());
    const minutes = deuxChiffres(date.getMinutes());

    return `${jour}/${mois}/${annee} ${heure}:${minutes}`;
}

module.exports = {
    FormaterTab,
    FormaterDate
};