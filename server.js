const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');

const app = express();
const port = 3010;

//Include fichier JS
const layout = require('./Middleware/layoutMiddle');
const connexionRouteur = require('./Routers/ConnexionRouteur');
const deconnexionRouteur = require('./Routers/DeconnexionRouteur');
const dashboardRouteur = require('./Routers/DashboardRouter');
const inscriptionRouteur = require('./Routers/InscriptionRouteur');
const groupesRouteur = require('./Routers/GroupesRouteur');
const erreurRouteur = require('./Routers/ErreurRouteur');
const rappelRouteur = require('./Routers/RappelRouteur');
const suppressionRouteur = require('./Routers/SuppressionRappelRouter');


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
app.use(layout);
app.use(dashboardRouteur);
app.use(inscriptionRouteur);
app.use(connexionRouteur);
app.use(deconnexionRouteur);
app.use(groupesRouteur);
app.use(erreurRouteur);
app.use(rappelRouteur);
app.use(suppressionRouteur);


app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

// Gestion des erreurs 404 pour les routes non définies
app.use((req, res, next) => {
  res.status(404).send('erreur 404 Page not found');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});