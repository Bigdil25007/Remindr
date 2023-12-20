const express = require('express');
const routeur = express.Router();
const { findGroupByName, findGroups, findRappelsFromGroup } = require('../Controllers/findControl');
const { addMember, createGroup } = require('../Controllers/createControl');
const { FormatterTab } = require('../Controllers/traitementControl');


routeur.get('/dashboard', async (req, res) => {
  //try {
  if (!req.session.user) {
    res.render('blocked');
    return;
  }

  let data = {
    groups: [],
    rappelsAfaire: [],
    rappelsDepasse: []
  };

  //Récupération des groupes
  data.groups = await findGroups(req.session.user.IDUser);

  //Récupération des rappels de chaque groupe
  let rappels = [];

  for (group in data.groups) {
    resultat = await findRappelsFromGroup(group.IDGroup);
    rappels.push(resultat);
  }

  const { rappelsAfaire, rappelsDepasse } = FormatterTab(rappels.flat());

  data.rappelsAfaire = rappelsAfaire;
  data.rappelsDepasse = rappelsDepasse;

  res.render('home', data);
  /*} catch (err) {
     res.redirect('/error/X');
   }*/
});

routeur.post('/dashboard', async (req, res) => {
  //try {
  //Ajout d'un groupe
  const nomGroup = req.body.nomGroupe;

  //On regarde si un groupe avec le même nom existe déja
  const group = await findGroupByName(nomGroup);

  if (group) {
    res.redirect('/error/6');
    return;
  }

  //On crée le groupe, on ajoute l'utilisateur et on redirige
  const groupId = await createGroup(nomGroup);
  await addMember(req.session.user.IDUser, groupId);

  res.redirect('/groupes/' + groupId);

  /*} catch (err) {
    res.redirect('/error/X');
  }*/
});


module.exports = routeur;