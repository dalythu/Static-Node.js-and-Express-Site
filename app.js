const express = require('express');
const { projects } = require('./data.json');
const path = require("path");

const app = express();

//view engine is set to pug
app.set('view engine', 'pug');

//static files and path
app.use('/static', express.static('public'));

//Routes
app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('./about');
});

app.get("/projects/:id", (req, res) => {
    const projectId = req.params.id;
    res.render('project', { project: projects[projectId] });
});

app.get('/projects', (req, res) => {
    res.redirect('/projects/0');
});


//404 error
app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 400;
    next(err);
});

//Global Error
app.use((err, req, res, next) => {
    res.locals.error = err; 
    if(err.status === 404) {
        console.log('404 error handler called');
        err.message = `Page not found`;
        res.status(404).render('page-not-found', {err});
    } else {
        err.message = `It looks like something went wrong on the server.`;
        console.log(err.message);
        res.status(err.status || 500).render('error', {err});
    }
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000')
});
