const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.use(fileUpload({
    createParentPath : true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;
const url = "mongodb://localhost:27017";
const dlOptions = {
    root : __dirname + '/datas',
    dotfiles: 'deny'
};


app.use(fileUpload({
    createParentPath : true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));


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
	
	app.get("/inscriptions/:nom/:prenom/:email/:mdp", (req, res)=>{
		let Existsmail = false;

		console.log("/inscriptions/" + req.params.email + "/" + req.params.mdp);
		try{
			db.collection("members").find().toArray((err, documents) => {
				//console.log(documents);
				for (let document of documents) {
					if (document.mail === req.params.email) {
					Existsmail = true;
					console.log("Le mail existe deja");
					res.status(404);
					res.end(JSON.stringify({}));
					}
				}
				

				if(!Existsmail){
					try{
						db.collection("members").insertOne({
							mail : req.params.email,
							name : req.params.nom,
							firstname : req.params.prenom,
							password : req.params.mdp
					});		
						console.log("client inserer")
					res.end(JSON.stringify([]));
			
					}catch(e){
			
						console.log("Error with inscriptions/");
						res.end(JSON.stringify([]));
					}
				}
			});

		
		} catch (e) {
	    	    console.log("Error on /members/:mail/:password : " + e);
	    	    res.end(JSON.stringify([]));
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
});

app.listen(8888);
