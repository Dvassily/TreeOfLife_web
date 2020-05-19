# Tree Of Life - backend and web application
This repository contains the sources of the backend of TreeOfLife and the web application.

# To run the web application :

```bash
    cd web/
    npm run start
```

# To run the server :

First you need to download image, comments and sounds datas from : https://my.pcloud.com/publink/show?code=XZLdVMkZwr1t5TvEry0VLYUdFtqz4p3yjNLX and unzip them in ../server/datas/

Then, you must to initialize the database :
```bash
    cd database
    sh createdb.sh
    cd ../server
    node updateimages.js
    node updatecomments.js
    node updatesounds.js
```

The 3 last scripts use the content of the folders server/data/images, server/data/comments and server/data/sounds to populate the database.

And then you can run the server :

```bash
    node server.js
```