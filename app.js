const express = require('express');
const { projects } = require('./data.json');
const path = require("path");

const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

//Routes
app.get('/', (req, res) => {
    res.render('index', { projects });
});

//
app.get('/about', (req, res) => {
    res.render('./about');
});

//
app.get("/projects/:id", (req, res) => {
    const projectId = req.params.id;
    res.render('project', { project: projects[projectId] });
});

app.get('/projects', (req, res) => {
    res.redirect('/projects/0');
});

//404 error
// app.use((req, res, next) => {
//     const err = new Error('Page not found');
//     err.status = 400;
//     next(err);
// });

// //Global Error
// app.use((err, req, res, next) => {
//     if (err.status === 400) {
//         res.locals.error = err;
//         err.message = 'Page not found';
//         res.status(err.status);
//         res.render('error');
//         console.log(err.message, err.status);
//     } else {
//         res.locals.error = err;
//         err.message = 'It looks like something went wrong on the server.';
//         err.status = 500;
//         render('error');
//         console.log(err.message, err.status);
//     }
//   });

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});
