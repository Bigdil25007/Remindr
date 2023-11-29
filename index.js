const express = require('express');

const app = express();
const port = 3010;

app.use(express.static('static'));

const DashboardRouter = express.Router();
app.use('/dashboard', DashboardRouter);

app.get('/', (req, res) => {
    res.sendFile(/* Fichier handlebar */);
    res.redirect(DashboardRouter)
});

app.listen(port, () => {
    console.log(`New user at http://localhost:${port}`);
});