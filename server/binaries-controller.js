module.exports = function(app, db, jwt, dlOptions) {
    const multer = require('multer');

    
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

    app.get("/user-binaries", async (req, res) => {

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
                console.log("Invalid access Token /user");
                res.status(404);
                return res.end(JSON.stringify({"error": "Invalid access Token"}));
            }

            let user = documents[0];


            db.collection("binaries").find({
                author: {$in: [user.mail, 'global@mtp.com']},
            }).toArray((err, doc) => {
                if(err) {
                    console.log("Error on /user-binaries : " + e);
                    res.status(500);
                    return res.end(JSON.stringify([{"error": "Unknown error while retriving user-binaries"}]));
                }

                res.status(200);
                res.end(JSON.stringify(doc))
            })
        });
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


    var storage = multer.diskStorage({
	destination: function(req, file, cb) {
	    cb(null, 'datas/binaries');
	},
	filename: function (req, file, cb) {
	    cb(null , file.originalname);
	}
    });
	
    let upload  = multer({ storage : storage });

    app.post("/binaries", upload.single('binary'), async function (req, res, next) {
	try {
	    const file = req.file;
	    console.log(file);
	    const mail = await jwt.verify(req.body.accessToken, "e1231");

	    db.collection("members").find({
                mail,
            }).toArray((err, documents) => {
		let user = documents[0];

                db.collection("binaries").insertOne({
                    "path" : file.originalname,
		    "description" : file.originalname,
                    "author" : user.mail,
                    "lastmodified" : new Date().toISOString()
                });

                res.status(200);
                res.end();
	    });
	} catch (e) {
	    res.status(400);
	    res.end(JSON.stringify(e));
	}
	    const file = req.file;

		console.log(file);
		if (! file) {
			const error = new Error('Please upload a file');
			error.httpStatusCode = 400;
			return next(error);
		}

		res.end(JSON.stringify({"message" : "ok"}));
	})
}
