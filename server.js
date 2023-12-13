const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');

const app = express();
const port = 3010;

app.use(express.static('static'));

//Body-parser pour récupérer les POST
app.use(express.urlencoded({ extended: true }));

// Configuration de la session
app.use(session({
  secret: 'SECRET',
  resave: false,
  saveUninitialized: true
}));

const DashboardRouter = express.Router();
app.use('/dashboard', DashboardRouter);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
// Configuration du dossier des vues
app.set('views', './views');

app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

DashboardRouter.get('/', (req, res) => {
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

app.get('/inscription', (req, res) => {
  res.render('Inscription');
});

app.get('/connexion', (req, res) => {
  res.render('Connexion');
});

// Gestion des erreurs 404 pour les routes non définies
app.use((req, res, next) => {
  res.status(404).send('erreur 404 Page not found');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
