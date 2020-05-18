const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');
const url = "mongodb://localhost:27017";

const soundsDir = "datas/sounds";

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    fillDatabase(client.db("TOL"));
});

async function fillDatabase(db) {
    await db.collection("sounds").remove({});

    sounds = []
    soundsFiles = fs.readdirSync(soundsDir);
    soundsFiles.forEach(function(file) {
	if (! file.endsWith(".wma")) {
	    return;
	}

	let tokens = file.split(".");
	sounds.push({
	    "name" : tokens[0]
	});
	
    });

    db.collection("sounds").insertMany(sounds);

    console.log("Done !");
    process.exit(0);
}
