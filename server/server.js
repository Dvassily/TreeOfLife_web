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


    // auth and login

    // 	app.post("/user/bin", async (req, res) => {
    //     let name = req.body.name;
    //     let content = req.body.content;


    //     try{
    //         const mail = await jwt.verify(req.query.accessToken, "e1231");<

    //         db.collection("members").find({
    //             mail,
    //         }).toArray((err, documents) => {

    //             let user = documents[0];
    //             let buffer =  Buffer.from(content, 'base64')
    //             fs.writeFileSync(__dirname + `/datas/binaries/${name}`, buffer)


    //             db.collection("binaries").insertOne({
    //                 "path" : name,
    //                 "author" : user.mail,
    //                 "lastmodified" : "25/02/20 - 17:35"
    //             });

    //             res.status(200);
    //             res.end();
    //         });

    //     } catch (e) {
    //         console.error(e)
    //     }


    // });
});

app.listen(8888);
