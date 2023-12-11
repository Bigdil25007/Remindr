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
app.set('views', './views');

DashboardRouter.get('/', (req, res) => {
    res.render('home');
});

app.get('/', (req, res) => {
    res.redirect('/dashboard');
});

app.listen(port, () => {
    console.log(`New user at http://localhost:${port}`);
});