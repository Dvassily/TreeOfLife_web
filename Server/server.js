const express = require('express');
const app = express();

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();
});

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;
const url = "mongodb://localhost:27017";
const dlOptions = {
	root: __dirname + '/datas',
	dotfiles: 'deny'
};

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
	let db = client.db("TOL");

	app.get("/members/:mail/:password", (req, res) => {

	});


	app.get("/auth/register", (req, res) => {

		try {
			db.collection("members").find().toArray((err, documents) => {
				for (let document of documents) {
					if (document.mail === req.params.mail && document.password === req.params.password) {
						// return user already exist
					}
				}

				// save user
			});
		} catch (e) {
			res.end(JSON.stringify([]));
		}
	})


	app.get("/auth/login", (req, res) => {
		try {
			db.collection("members").find().toArray((err, documents) => {
				for (let document of documents) {
					if (document.mail === req.params.mail && document.password === req.params.password) {
						// return user already exist
					}
				}

				// save user
			});
		} catch (e) {
			res.end(JSON.stringify([]));
		}
	})

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
		res.sendFile('binaries/' + req.params.file, dlOptions, function (err) {
			if (err) {
				res.status(err.status);
				res.end();
			} else {
				console.log('Info: Sent binary /binaries/' + req.params.file);
			}
		});
	});
});

app.listen(8888);
