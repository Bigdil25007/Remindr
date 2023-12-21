const express = require('express');
const routeur = express.Router();
const { CheckAppartenance } = require('../Middleware/appartenanceMiddle');
const { findUserWithEmail, IsUserFromGroup, findRappelsFromGroup, findMembres, findFinishPerson } = require('../Controllers/findControl');
const { addMember } = require('../Controllers/createControl');
const { FormaterTab } = require('../Controllers/traitementControl');

routeur.get('/groupes/:idGroup', CheckAppartenance, async (req, res, next) => {
  //try {
  const idGroup = parseInt(req.params.idGroup, 10);

  let rappels = {
    IDRappel: null,
    titre: "",
    description: "",
    dateCreation: new Date(),
    dateFin: new Date(),
    IDGroup: null,
    couleur: null,
    checkNom: []
  }

  //On stocke les données de base des rappels
  rappels = await findRappelsFromGroup(idGroup);

  //On stocke en plus la liste des membres ayant fini la tâche
  for (let ind = 0; ind < rappels.length; ind++) {
    rappels[ind].checkNom = await findFinishPerson(rappels[ind].IDRappel);
  }

  const { rappelsAfaire, rappelsDepasse } = FormaterTab(rappels);

  const data = {
    rappelsAfaire: rappelsAfaire,
    rappelsDepasse: rappelsDepasse,
    membres: await findMembres(idGroup),
    IdGroup: idGroup
  }

  res.render('groupes', data);
  /*} catch (err) {
    res.redirect('/error/X');
  }*/
});


routeur.post('/groupes/:idGroup', async (req, res) => {
  //try {
  //Ajout d'un utilisateur 
  const idGroup = parseInt(req.params.idGroup, 10);
  const email = req.body.emailUtilisateur;

  const user = await findUserWithEmail(email);

  //Utilisateur introuvable
  if (!user) {
    res.redirect('/error/4');
    return;
  }

  //On regarde si la personne n'est pas deja sur le groupe
  const check = await IsUserFromGroup(user.IDUser, idGroup);

  if (check) {
    res.redirect('/error/5');
    return;
  }

  await addMember(user.IDUser, idGroup);
  res.redirect('/groupes/' + idGroup);

  /*} catch (err) {
    res.redirect('/error/X');
  }*/
});

module.exports = routeur;