const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');
const url = "mongodb://localhost:27017";

const commentsdir = "datas/comments";

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    let db = client.db("TOL");
    db.collection("comments").remove({});

    collectionsDirectories = fs.readdirSync(commentsdir);
    collectionsDirectories.forEach(function(collectionDirectory) {
	let document = {
	    "collection_name" : collectionDirectory,
	    "content" : [],
	    "images" : []
	};

	let collectionDirectoryPath = commentsdir + "/" + collectionDirectory;
	files = fs.readdirSync(collectionDirectoryPath);
	files.forEach(function (file) {
	    if (file.startsWith("_")) {
		return;
	    }
	    
	    let tokens = file.split(".");

	    if (tokens[1] === "html") {
		document.content.push({
		    "taxon" : tokens[0],
		    "file" : file
		});
	    } else {
		if (fs.lstatSync(collectionDirectoryPath + "/" + tokens[0]).isDirectory()) {
		    imagesDir = fs.readdirSync(collectionDirectoryPath + "/" + tokens[0]);
		    let imagesArray = [];
		    
		    imagesDir.forEach(function (imageFile) {
			imagesArray.push(imageFile);
		    });
		    
		    document.images.push({
			"taxon" : tokens[0],
			"images" : imagesArray
		    });

		}
	    }
	});

	db.collection("comments").insertOne(document);

	console.log(collectionDirectory + " : Done !");
    });
});
				 
				 
