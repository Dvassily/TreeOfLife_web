module.exports = function(app, db, dlOptions) {

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
}
