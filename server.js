const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view-engine', 'hbs');

// Middle ware - in req we have access to everything comes from the client
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;

    // Append logs to a file
    fs.appendFile('Server Logs', log + '\n', (err) => {
        if(err){
            console.log('Unable to log to server');
        }
    });
    console.log(log);

    next();
});

// Middle ware - site is under maintenaice and no other code under this functions would be running
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

// Middle ware - for loading public html pages
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        personName: 'Twana Daniel',
        pageTitle: 'Home Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'My About'
    });
});

app.listen(3000, () => {
  console.log('Server is up');
});
