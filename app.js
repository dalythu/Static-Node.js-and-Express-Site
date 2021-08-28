const express = require('express');
const { data } = require('./data.json');
const path = require("path");

const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { data });
});

app.get('/about', (req, res) => {
    res.render('./about');
});

//
app.get("/projects/:id", (req, res) => {
    const projectId = req.params.id;
    res.render('project', { data: projects[projectId]});
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});

