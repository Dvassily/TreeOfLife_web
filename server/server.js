
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;
const _ = require('lodash');

let jwt = require("jsonwebtoken");


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});


app.use(fileUpload({
    createParentPath : true
}));

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('datas'));
app.use(bodyParser.json());
app.use(express.json())
app.use(morgan('dev'));

const dlOptions = {
    root : __dirname + '/datas',
    dotfiles: 'deny'
};

// setup db and routes
const url = "mongodb://localhost:27017";
MongoClient.connect(url, {useNewUrlParser: true , useUnifiedTopology: true }, (err, client) => {
    let db = client.db("TOL");

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

    app.get("/TreeOfLife.exe", (req, res) => {
		res.sendFile('/bin/TreeOfLife.exe', dlOptions, function(err) {
			if (err) {
			    res.status(err.status);
			    res.end();
			} else {
			    console.log('Info: Sent binary /bin/TreeOfLife.exe');
			}
		});
	});


    // auth and login


	app.get("/user", async (req, res) => {

		try{
			const mail = await jwt.verify(req.query.accessToken, "e1231");

			db.collection("members").find({
				mail,
			}).toArray((err, documents) => {

				if(err) {
					console.log("Error on /user : " + e);
					res.status(500);
					return res.end(JSON.stringify([{"error": "Unknown error while retriving user"}]));
				}

				if(documents.length <= 0) {
					console.log("Invalid access Token /user")
					res.status(404);
					return res.end(JSON.stringify({"error": "Invalid access Token"}));
				}

				res.status(200);
				res.end(JSON.stringify(documents[0]));
			})

		} catch (e) {
			console.log("Error on /user : " + e);
			res.end(JSON.stringify([{"error": "Unknown error while doing retriving user"}]));
		}
	})


	app.post("/auth/login", (req, res) => {
		const mail = req.body.mail;
		const password = req.body.password;

		try{
			db.collection("members").find({
				mail: mail,
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

				const accessToken = jwt.sign(mail, "e1231")
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
		const mail = req.body.mail;
		const password = req.body.password;


		try{
			db.collection("members").find({
				mail: mail,
			}).toArray((err, documents) => {

				if(documents.length > 0) {
					console.log("Email already exist in database")
					res.status(404);
					return res.end(JSON.stringify({"error": "Email already exist in database"}));
				}

				db.collection("members").insertOne({
					mail : req.body.mail,
					password : req.body.password,

				});

				const accessToken = jwt.sign(mail, "e1231")
				res.end(JSON.stringify({
					accessToken,
				}));
			})

		} catch (e) {
			console.log("Error on /auth/register : " + e);
			res.end(JSON.stringify([{"error": "Unknown error while doing the registration"}]));
		}
	});

    
    app.get("/images/:collection", (req, res) => {
	try {
	    db.collection("images").find().toArray((err, collections) => {
		let collection_found = false;
		
		for (let collection of collections) {
		    if (collection.collection_name === req.params.collection) {
			collection_found = true;

			res.end(JSON.stringify(collection.content));
		    }
		}

		if (! collection_found) {
		    res.status(404);
		    res.end();
		}
	    });
	} catch (e) {
	    console.log("Error on /images/" + req.params.collection);
	    res.end(JSON.stringify([]));
	}
    });

    app.get("/images/:collection/:species/:index", (req, res) => {
	try {
	    db.collection("images").find().toArray((err, collections) => {
		let collection_found = false;
		let taxon_found = false;
		let image_found = false;
		
		for (let collection of collections) {
		    if (collection.collection_name === req.params.collection) {
			collection_found = true;

			for (let taxon of collection.content) {
			    if (taxon.taxon === req.params.species) {
				taxon_found = true;

				for (let image of taxon.images) {
				    if (image.id == req.params.index) {
					console.log("foo");
					image_found = true;

					console.log('images/' + req.params.collection + "/" + image.file);

					res.sendFile('images/' + req.params.collection + "/" + image.file, dlOptions, function (err) {
					    if (err) {
						console.log(err);
						res.status(err.status);
						res.end();
					    } else {

					    }
					});
				    }
				}

				if (! image_found) {
				    res.status(404);
				    res.end();
				}
			    }
			}

			if (! taxon_found) {
			    res.status(404);
			    res.end();
			}
		    }
		}

		if (! collection_found) {
		    res.status(404);
		    res.end();
		}
	    });

	} catch (e) {
	    console.log("Error on /images/" + req.params.collection);
	    res.end(JSON.stringify([]));
	}
    });

    app.get('/appdata/:file', (req, res) => {
	res.sendFile('appdata/' + req.params.file, dlOptions, function (err) {
	    if (err) {
		res.status(err.status);
		res.end();
	    } else {
		console.log('Info: Sent binary /appdata/' + req.params.file);
	    }
	});
    });

    app.get("/comments/:collection", (req, res) => {
	try {
	    db.collection("comments").find().toArray((err, collections) => {
		let collection_found = false;
		
		for (let collection of collections) {
		    console.log(collection);
		    if (collection.collection_name === req.params.collection) {
			collection_found = true;

			res.end(JSON.stringify(collection.content));
		    }
		}

		if (! collection_found) {
		    res.status(404);
		    res.end();
		}
	    });
	} catch (e) {
	    console.log("Error on /comments/" + req.params.collection);
	    res.end(JSON.stringify([]));
	}
    });

    app.get("/comments/:collection/:taxon", (req, res) => {
    	try {
    	    db.collection("comments").find().toArray((err, collections) => {
    		let collection_found = false;
    		let taxon_found = false;
		
    		for (let collection of collections) {
    		    if (collection.collection_name === req.params.collection) {
    			collection_found = true;

    			for (let entry of collection.content) {
    			    if (entry.taxon === req.params.taxon) {
    				taxon_found = true;
				
    				res.sendFile('comments/' + collection.collection_name + "/" + entry.file, dlOptions, function (err) {
    				    if (err) {
    					res.status(err.status);
    					res.end(JSON.stringify(err));
    				    } else {
    					console.log('Info: Sent binary /comments/' + req.params.collection + "/" + req.params.file);
    				    }
    				});
    			    }
    			}
    		    }
    		}

    		if (! collection_found || ! taxon_found) {
    		    res.status(404);
    		    res.end();
    		}
    	    });
    	} catch (e) {
    	    console.log("Error on /comments/" + req.params.collection);
    	    res.end(JSON.stringify([]));
    	}
    });

    app.get("/comments/:collection/:taxon/:file", (req, res) => {
	try {
	    res.sendFile('comments/' + req.params.collection + "/" + req.params.taxon + "/" + req.params.file, dlOptions, function (err) {
		if (err) {
		    res.status(err.status);
		    res.end(JSON.stringify(err));
		} else {
		    console.log('Info: Sent image /comments/' + req.params.collection + "/" + req.params.taxon + "/" + req.params.file);
		}
	    });
	} catch (err) {
	    res.end(JSON.stringify(err));
	}
    });

    app.get("/sounds/:taxon", (req, res) => {
	try {
	    res.sendFile('sounds/' + req.params.taxon + ".wma", dlOptions, function (err) {
		if (err) {
		    res.status(err.status);
		    res.end(JSON.stringify(err));
		} else {
		    console.log('Info: Sent sound /sounds/' + req.params.taxon + ".wma");
		}
	    });
	} catch (err) {
	    console.log(err);
	    res.status(500);
	    res.end(JSON.stringify(err));
	}
    });

    app.get("/sounds", (req, res) => {
	console.log("/sounds");

	try {
	    db.collection("sounds").find().toArray((err, documents) => {
		let result = [];

		for (let document of documents) {
		    result.push(document.name);
		}
		
		res.end(JSON.stringify(result));
	    });
	} catch (e) {
	    console.log("Error on /sounds");
	    res.end(JSON.stringify([]));
	}
    });
});

app.listen(8888);
