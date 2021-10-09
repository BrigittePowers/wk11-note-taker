const express = require('express');
const path = require('path');
const notesData = require('./db/db.json');
const PORT = 3001;

const app = express();


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

//ROUTES
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

// return all saved notes as json
app.get('/api/notes', (req, res) => res.json(notesData));

// recieve new note to save and add to db.json


// listening at port 
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);