const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

module.exports = app => {
    app.get('/notes', (req, res) => {
        console.log('Hit /notes route')
        res.sendFile(path.join(__dirname, '../public/notes.html'))
    });

    app.get('/', (req, res) => {
        console.log('Hit / route')
        res.sendFile(path.join(__dirname, '../public/index.html'))
    });

    // return all saved notes as json
    app.get('/api/notes', (req, res) => {
        console.log('Hit /api/notes route')
        fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
            if (err) throw err;
            const notes = JSON.parse(data);
            res.json(notes);
        })
    });

    // post request to add a note
    app.post('/api/notes', (req, res) => {
        fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
            if (err) throw err;
            const notes = JSON.parse(data);
            const addNote = req.body;
            addNote.id = uuid.v4();
            notes.push(addNote);

            const createNew = JSON.stringify(notes);
            fs.writeFile(path.join(__dirname, '../db/db.json'), createNew, (err) => {
                if (err) throw err;
            });
            res.json(addNote);
        });
    });

    // delete
    app.delete('/api/notes/:id', (req, res) => {
        const uniqueID = req.params.id;
        fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
            if (err) throw err;
            const notes = JSON.parse(data);
            const notesArr = notes.filter(item => {
                return item.id !== uniqueID
            });
            fs.writeFile('../db/db.json', JSON.stringify(notesArr), (err, data) => {
                if (err) throw err; 
                res.json(notesArr) 
            });
        });
    });

    app.get('*', (req, res) => {
        console.log('Hit * route')
        res.sendFile(path.join(__dirname, '../public/index.html'))
    });
}