const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');

const app = express();
const port = 3010;

//Include fichier JS
const connexionController = require('./Controllers/connexionControl');
const inscriptionController = require('./Controllers/inscriptionControl');

const connexionRouteur = require('./Routers/ConnexionRouteur');
const dashboardRouteur = require('./Routers/DashboardRouter');
const inscriptionRouteur = require('./Routers/InscriptionRouteur');


app.use(express.static('static'));

//Body-parser pour récupérer les POST
app.use(express.urlencoded({ extended: true }));

// Configuration de la session
app.use(session({
  secret: 'SECRET',
  resave: false,
  saveUninitialized: true
}));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
// Configuration du dossier des vues
app.set('views', './views');

//Ajout des modifs sur les routes
app.use(dashboardRouteur);
app.use(inscriptionRouteur);
app.use(connexionRouteur);

app.use(connexionController);
app.use(inscriptionController);


app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
  const data = {
    groups: [],
    rappels: []
  };

  // Données pour les groupes
  for (let i = 1; i <= 10; i++) {
    data.groups.push({ nom: `nom_groupe ${i}`, GroupeID: i });
  }

  // Données pour les rappels
  for (let i = 1; i <= 10; i++) {
    data.rappels.push({ titre: `titre_rappel ${i}`, date: `date_rappel ${i}`, description: `description ${i}` });
  }

  res.render('home', data);
});


// Gestion des erreurs 404 pour les routes non définies
app.use((req, res, next) => {
  res.status(404).send('erreur 404 Page not found');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});