module.exports = function(app, db, dlOptions) {
    app.get("/TreeOfLife.exe", (req, res) => {
    	res.sendFile('/bin/TreeOfLife.exe', dlOptions, function(err) {
    	    if (err) {
    		res.status(err.status);
    		res.end();
    	    } else {
    		console.log('Info: Sent binary /bin/TreeOfLife.exe');
    	    }
    	});
    });

    
    app.get('/appdata/:file', (req, res) => {
    	res.sendFile('appdata/' + req.params.file, dlOptions, function (err) {
    	    if (err) {
    		res.status(err.status);
    		res.end();
    	    } else {
    		console.log('Info: Sent binary /appdata/' + req.params.file);
    	    }
    	});
    });
}
