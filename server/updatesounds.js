const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');
const url = "mongodb://localhost:27017";

const soundsDir = "datas/sounds";

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    let db = client.db("TOL");

    db.collection("sounds").remove({});

    soundsFiles = fs.readdirSync(soundsDir);
    soundsFiles.forEach(function(file) {
	if (! file.endsWith(".wma")) {
	    return;
	}

	let tokens = file.split(".");
	db.collection("sounds").insertOne({
	    "name" : tokens[0]
	});
    });

    console.log("Done !");
    process.exit(0);
});
