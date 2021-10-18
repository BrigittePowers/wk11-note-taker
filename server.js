// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

// express
const app = express();
var port = process.env.PORT;

// parse
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + '/js'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route
require('./routes/routes')(app);

// listening at port 
if(port == null || port == "") {
    port = 3001;
}
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
