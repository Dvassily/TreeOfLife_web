const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;


module.exports = async () => {
    let connection = await MongoClient.connect(url, {useNewUrlParser: true , useUnifiedTopology: true })
    return client.db("TOL");
}
