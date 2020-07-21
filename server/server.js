const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs')
const _ = require('lodash');
const jwt = require("jsonwebtoken");

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.use(cors());
app.use(bodyParser.urlencoded({limit: '400mb', extended: true}));
app.use(express.static('datas'));
app.use(bodyParser.json({limit: '400mb'}));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(process.cwd()+"/public/"));

const dlOptions = {
    root : __dirname + '/datas',
    dotfiles: 'deny'
};



// setup db and routes
const url = "mongodb://localhost:27017";
MongoClient.connect(url, {useNewUrlParser: true , useUnifiedTopology: true }, (err, client) => {
    let db = client.db("TOL");

    require('./binaries-controller')(app, db, jwt, dlOptions);
    require('./users-controller')(app, db, jwt);
    require('./images-controller')(app, db, dlOptions);
    require('./comments-controller')(app, db, dlOptions);
    require('./sounds-controller')(app, db, dlOptions);
    require('./setup-controller')(app, db, dlOptions);


    app.get("*", function(req, req) {
	res.sendFile(process.cwd() + "public/index.html");
    });

});

app.listen(8888);
