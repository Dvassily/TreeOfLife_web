module.exports = function(app, db, dlOptions) {

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
}
