const express = require('express');
const fs = require('fs');

const hbs = require('hbs');
const app = express();

// using hbs as view engine
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// maintenance route
app.use((req,res,next) => {
      res.render('maintenance.hbs', {
            pageTitle: 'Maintenance Page'
      });
});

// serving static sites
app.use(express.static(__dirname + '/public'));

// logging requests
app.use((req, res, next) => {
      
      let now = new Date().toString();
      let log = `${now}: ${req.method} ${req.url}`;
      fs.appendFileSync('server.log', log + '\n');


      console.log(log);

      next();
});

// hbs helper functions
hbs.registerHelper('getCurrentYear', () => {
      return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
      return text.toUpperCase();
});


// site routes
app.get('/', (req, res) => {

      res.render('home.hbs', {
            pageTitle: 'Home Page',
            welcomeMsg: 'Welcome to our website'
      });
});

app.get('/about', (req, res) => {
      res.render('about.hbs', {
            pageTitle: 'About Page'
      });
});


// listening to requests
app.listen(3000, () => {
      console.log('Server is up on port 3000');
});