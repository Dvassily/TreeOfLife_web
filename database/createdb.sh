#!/bin/bash

mongoimport --db TOL --collection members --file members.json --jsonArray --drop
mongoimport --db TOL --collection images --file images.json --jsonArray --drop
mongoimport --db TOL --collection binaries --file binaries.json --jsonArray --drop
mongoimport --db TOL --collection comments --file comments.json --jsonArray --drop
mongoimport --db TOL --collection sounds --file sounds.json --jsonArray --drop
