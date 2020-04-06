
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;
let passport = require("passport");

let jwt = require("jsonwebtoken");


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.use(express.static('datas'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json())




const dlOptions = {
    root : __dirname + '/datas',
    dotfiles: 'deny'
};

// setup db and routes
const url = "mongodb://localhost:27017";
MongoClient.connect(url, {useNewUrlParser: true , useUnifiedTopology: true }, (err, client) => {
    let db = client.db("TOL");

    app.get("/members/:mail/:password", (req, res) => {
		console.log("/members/" + req.params.mail + "/" + req.params.password);

		try {
			db.collection("members").find().toArray((err, documents) => {
			console.log(documents);
			for (let document of documents) {
				if (document.mail === req.params.mail && document.password === req.params.password) {
				res.end(JSON.stringify(document));
				}
			}

			res.status(404);
			res.end(JSON.stringify({}));
			});
		} catch (e) {
			console.log("Error on /members/:mail/:password : " + e);
			res.end(JSON.stringify([]));
		}
    });

    app.get("/binaries", (req, res) => {
		console.log("/binaries");

		try {
			db.collection("binaries").find().toArray((err, documents) => {
			res.end(JSON.stringify(documents));
			});
		} catch (e) {
			console.log("Error on /binaries");
			res.end(JSON.stringify([]));
		}
    });

    app.get("/binaries/:file", (req, res) => {
		res.sendFile('binaries/' + req.params.file, dlOptions, function(err) {
			if (err) {
			res.status(err.status);
			res.end();
			} else {
			console.log('Info: Sent binary /binaries/' + req.params.file);
			}
		});
	});


    // auth and login
	app.post("/auth/login", (req, res) => {
		const email = req.body.email;
		const password = req.body.password;

		try{
			db.collection("members").find({
				mail: email,
			}).toArray((err, documents) => {

				if(err) {
					console.log("Error on /auth/login : " + e);
					res.status(500);
					return res.end(JSON.stringify([{"error": "Unknown error while doing the login"}]));
				}

				if(documents.length <= 0 || documents[0].password != password) {


					console.log("Email or password Incorrect")
					res.status(404);
					return res.end(JSON.stringify({"error": "Email or password Incorrect"}));
				}

				const accessToken = jwt.sign(email, "e1231")
				res.end(JSON.stringify({
					accessToken,
				}));
			})

		} catch (e) {
			console.log("Error on /auth/register : " + e);
			res.end(JSON.stringify([{"error": "Unknown error while doing the registration"}]));
		}
	});


	app.post("/auth/register", (req, res) => {
		const email = req.body.email;
		const password = req.body.password;


		try{
			db.collection("members").find({
				mail: email,
			}).toArray((err, documents) => {

				if(documents.length > 0) {
					console.log("Email already exist in database")
					res.status(404);
					return res.end(JSON.stringify({"error": "Email already exist in database"}));
				}

				db.collection("members").insertOne({
					mail : req.body.email,
					password : req.body.password,

				});

				const accessToken = jwt.sign(req.body.email, "e1231")
				res.end(JSON.stringify({
					accessToken,
				}));
			})

		} catch (e) {
			console.log("Error on /auth/register : " + e);
			res.end(JSON.stringify([{"error": "Unknown error while doing the registration"}]));
		}
	});


});

app.listen(8888);
