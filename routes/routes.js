const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

module.exports = app => {
    app.get('*', (req, res) =>
        res.sendFile(path.join(__dirname, '../public/index.html'))
    );

    app.get('/notes', (req, res) =>
        res.sendFile(path.join(__dirname, '../public/notes.html'))
    );

    // return all saved notes as json
    app.get('/api/notes', (req, res) => {
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
            const newNote = req.body;
            newNote.id = uuid.v4();
            notes.push(newNote);

            const createNew = JSON.stringify(notes);
            fs.writeFile(path.join(__dirname, '../db/db.json'), createNew, (err) => {
                if (err) throw err;
            })
            res.json(newNote);
        })
    });
}

