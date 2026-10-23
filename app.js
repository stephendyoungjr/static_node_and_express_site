

//Loads express library (bringing toolbox into a workshop)
const express = require('express');

//Loads data.json and takes projects array
const { projects } = require('./data.json');

//Creates an express application ( setting up workbench, working server that belongs to me)
const app = express();

//tells express we are using Pug for loading template ( how pages look);
app.set('view engine', 'pug');

//serve a static file (css, images, js) from public folder
app.use('/static',express.static('public'));

app.use('/images', express.static('images'));


// Home page : pass array of projects to index.pug 
// {projects} is the same as {projects : projects }

app.get('/', (req, res)=> {
    //index is where we are passing the array of projects to 
    //left side is key, right side is value (array of projects);
    res.render('index', {projects});
});

//about page
app.get('/about', (req, res)=> {
res.render('about');
});

//:id is placeholder for variable id 
app.get('/project/:id', (req, res, next)=> {
// get project page by id match in url 
//recieve id from url, it will be a string
const idFromUrl = req.params.id;
//convert string to number
const idAsNum = parseInt(idFromUrl);
//p can be anything, find sorts through projects array
const project = projects.find( p => p.id === idAsNum);
//if project is found, render project page, else render error page
if (project){
    //project is the found project by matching it 
    //project.pug render will now render specific project
    //'pug' is the template filename 
    res.render('project', {project});
} else {
    //if no matches, match request to 404 handler 
    next();
}});


//error handle 404 
app.use((req, res, next)=> {
const err = new Error('Sorry, we cannot find that page :(');
err.status = 404;
console.log(`Error ${err.status}: ${err.message}`);
next(err);
})

//error handler global scope
app.use((err, req, res, next)=> {

err.status = err.status || 500;
err.message = err.message || 'Something is wrong with the server';
console.log(`Error ${err.status}: ${err.message}`);

res.status(err.status);
res.render('error', {err});
});



//start server
app.listen(3000, ()=> {
    console.log('The app is running on localhost:3000');
});


