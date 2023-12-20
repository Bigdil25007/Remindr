const express = require('express');
const routeur = express.Router();
const { CheckAppartenance } = require('../Middleware/appartenanceMiddle');
const { IsUserFromGroup, findRappelsFromGroup, findMembres } = require('../Controllers/findControl');
const { addMember } = require('../Controllers/createControl');
const { FormatterTab } = require('../Controllers/traitementControl');

routeur.get('/groupes/:idGroup', CheckAppartenance, async (req, res, next) => {
  //try {
  const idGroup = parseInt(req.params.idGroup, 10);
  const rappels = await findRappelsFromGroup(idGroup);
  const data = FormatterTab(rappels);
  data.membres = await findMembres(idGroup);

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

  //On regarde si la personne n'est pas deja sur le groupe (si on a un résultat c'est qu'elle est déja présente)
  const checkGroup = await IsUserFromGroup(user.IDUser, idGroup);

  if (checkGroup) {
    res.redirect('/error/5');
    return;
  }

  await addMember(user.userID, idGroup);
  res.redirect('/groupes/' + idGroup);

  /*} catch (err) {
    res.redirect('/error/X');
  }*/
});

module.exports = routeur;