# DevNotes

###### !Disclaimer or future employers
###### This is just a passion project with practice in mind. This does not represent the cleanest code i can do. Main goal here was to get a playable game in very limited coding time. (2-5h / week)

So the idea i got was to create a dream game using only a web type language. On the road i read about dgraph database and decided to make the game run without backend server and use only the dgraph servers lambda functions and feratures. So the game is built using react and typescript as its main engine and frontend. And as its database and mandatory backend funtions im using dgraph. 

## How to setup dev enviroment
- After cloning the repository you should run `npm i` to get all the pakages.
- Then we need to setup the database server. It consists of three docker containers bundled up in to one cluster. This requires docker on your computer.

  This you can setupo the cluster by simply running the script:
  `docker-compose up -d`
- When the database is up and the libraries are installed we need to push the schema in to the database.
  For this you can use a script I made:
  `npm run schema`
  This also creates types from the schema if its changed (Very nice thing to have!)
- The database also needs the lambda scripts to be pushed.
  This script packs the scripts using webpack and sends them to the database server:
  `npm run lambda`
- Now the database is setup and ready for the application. 
- Then just run `npm start` and the site is up and running
- Now you need to just signup and login

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

