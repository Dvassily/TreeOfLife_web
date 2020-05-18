const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');
const url = "mongodb://localhost:27017";

const imagedir = "datas/images";

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    fillDatabase(client.db("TOL"));
});

async function fillDatabase(db) {
    await db.collection("images").remove({});

    collectionsDirectories = fs.readdirSync(imagedir);

    let collections = []
    collectionsDirectories.forEach(function(collectionDirectory) {
	let currentTaxon = undefined;
	let document = {
	    "collection_name" : collectionDirectory,
	    "content" : []
	};

	imageFiles = fs.readdirSync(imagedir + "/" + collectionDirectory);
	imageFiles.forEach(function (imageFile) {
	    imageSplit = splitFileName(imageFile);

	    if (currentTaxon === imageSplit.taxon) {
		document.content[document.content.length - 1].images.push({
		    "id" : imageSplit.index,
		    "file" : imageFile
		});
	    } else {
		currentTaxon = imageSplit.taxon;
		
		document.content.push({
		    "taxon" : imageSplit.taxon,
		    "images" : [ {
			"id" : imageSplit.index,
			"file" : imageFile
		    }]
		});
	    }
	});

	collections.push(document);

	console.log(collectionDirectory + " : Done !");
    });

    await db.collection("images").insertMany(collections);

    process.exit(0);
}

function splitFileName(imageFile) {
    let index = -1;
    let taxon = null;
    let extension = null;

    let tokens = imageFile.split(".");
    let withoutExtension = tokens[0];
    extension = tokens[1];

    tokens = withoutExtension.split("_");

    if (tokens.length > 1) {
	index = Number(tokens[1]);
    }

    taxon = tokens[0];

    return {
	"taxon" : taxon,
	"index" : index,
	"extension" : extension
    };
}
