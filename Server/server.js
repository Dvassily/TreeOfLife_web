const buildr = require('xmlbuilder');
const express = require('express');
const app = express();

function formatCollectionXML(collection) {
    let doc = builder.create('ArrayOfImageLink')
	.att("xmlns:xsd", "http://www.w3.org/2001/XMLSchema")
	.att("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");

    for (let taxon of collection) {
	let taxonName = taxon.taxon;

	for (let image of taxon['images']) {
	    doc = doc
		.elt('ImageLink')
		.att('Key', taxonName)
	}
    }
}

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
});

app.listen(8888);
