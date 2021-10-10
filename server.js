// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

// express
const app = express();
const PORT = 3001;

// parse
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + '/js'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route
require('./routes/routes')(app);

// listening at port 
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);
