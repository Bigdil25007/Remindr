DashboardRouter.get('/inscription', (req, res) => {
    res.render('Inscription');
  });
  
  DashboardRouter.get('/contact', (req, res) => {
    res.render('Contact');
  });
  
  DashboardRouter.get('/connexion', (req, res) => {
    res.render('Connexion');
  });

//   module.exports = DashboardRouter;