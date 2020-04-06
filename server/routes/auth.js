const router = require('express').Router();
let db = require("../config/db");


router.post("/auth/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try{
        db.collection("members").find({
            email,
        }).toArray((err, documents) => {

            if(err) {
                console.log("Error on /auth/login : " + e);
                res.status(500);
                return res.end(JSON.stringify([{"error": "Unknown error while doing the login"}]));
            }

            if(documents.length <= 0) {
                console.log("Email or password Incorrect")
                res.status(404);
                return res.end(JSON.stringify({"error": "Email or password Incorrect"}));
            }


            const accessToken = jwt.sign(user.id, "e1231")
            res.end(JSON.stringify({
                accessToken,
            }));
        })

    } catch (e) {
        console.log("Error on /auth/register : " + e);
        res.end(JSON.stringify([{"error": "Unknown error while doing the registration"}]));
    }
});


router.post("/auth/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try{
        db.collection("members").find({
            email,
        }).toArray((err, documents) => {
            if(documents.length > 0) {
                console.log("Email already exist in database")
                res.status(404);
                return res.end(JSON.stringify({"error": "Email already exist in database"}));
            }

            db.collection("members").insertOne({
                mail : req.body.email,
                name : req.body.name,
                firstname : req.body.firstName,
                password : req.body.password
            });

            console.log("client insererted")
            res.end(JSON.stringify([]));
        })

    } catch (e) {
        console.log("Error on /auth/register : " + e);
        res.end(JSON.stringify([{"error": "Unknown error while doing the registration"}]));
    }
});
