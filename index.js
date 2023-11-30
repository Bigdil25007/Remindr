const express = require('express');
const { engine } = require('express-handlebars');

const app = express();
const port = 3010;

app.use(express.static('static'));

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