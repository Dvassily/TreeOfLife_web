module.exports = function(app, db, jwt) {

    app.get("/user", async (req, res) => {

    	try{
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

    		res.status(200);
    		res.end(JSON.stringify(documents[0]));
    	    })

    	} catch (e) {
    	    console.log("Error on /user : " + e);
    	    res.end(JSON.stringify([{"error": "Unknown error while doing retriving user"}]));
    	}
    });


    app.post("/auth/login", (req, res) => {
    	const mail = req.body.mail;
    	const password = req.body.password;

    	try{
    	    db.collection("members").find({
    		mail: mail,
    	    }).toArray((err, documents) => {

    		if(err) {
    		    console.log("Error on /auth/login : " + e);
    		    res.status(500);
    		    return res.end(JSON.stringify([{"error": "Unknown error while doing the login"}]));
    		}

    		if(documents.length <= 0 || documents[0].password != password) {


    		    console.log("Email or password Incorrect");
    		    res.status(404);
    		    return res.end(JSON.stringify({"error": "Email or password Incorrect"}));
    		}

    		const accessToken = jwt.sign(mail, "e1231");
    		res.end(JSON.stringify({
    		    accessToken,
    		}));
    	    })

    	} catch (e) {
    	    console.log("Error on /auth/register : " + e);
    	    res.end(JSON.stringify([{"error": "Unknown error while doing the registration"}]));
    	}
    });


    app.post("/auth/register", (req, res) => {
    	const mail = req.body.mail;
    	const password = req.body.password;
    	const userData = req.body;


    	try{
    	    db.collection("members").find({
    		mail: mail,
    	    }).toArray((err, documents) => {

    		if(documents.length > 0) {
    		    console.log("Email already exist in database");
    		    res.status(404);
    		    return res.end(JSON.stringify({"error": "Email already exist in database"}));
    		}

    		db.collection("members").insertOne({
    		    mail : req.body.mail,
    		    password : req.body.password,
                name: req.body.name,
                lastName: req.body.lastName,
                role : "etudiant"
    		});

    		const accessToken = jwt.sign(mail, "e1231");
    		res.end(JSON.stringify({
    		    accessToken,
    		}));
    	    })

    	} catch (e) {
    	    console.log("Error on /auth/register : " + e);
    	    res.end(JSON.stringify([{"error": "Unknown error while doing the registration"}]));
    	}
    });



}
