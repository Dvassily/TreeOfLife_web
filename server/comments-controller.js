module.exports = function(app, db, dlOptions) {
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
    		    console.log('Info: Sent comment /comments/' + req.params.collection + "/" + req.params.taxon + "/" + req.params.file);
    		}
    	    });
    	} catch (err) {
    	    res.end(JSON.stringify(err));
    	}
    });
}
