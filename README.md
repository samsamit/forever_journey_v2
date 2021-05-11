# DevNotes

This is just a passion project with practice in mind. This does not represent the cleanest code i can do. Main goal here was to get a playable game in a short time.

So the idea i got was to create a dream game using only a web type language. On the road i read about dgraph database and decided to make the game run without backend server and use only the dgraph servers lambda functions and feratures. So the game is built using react and typescript as its main engine and frontend. And as its database and mandatory backend funtions im using dgraph. 

## How to setup dev enviroment
- After cloning the repository you should run `npm i` to get all the pakages.
- Then we need to setup the database server. It consists of three docker containers bundled up in to one cluster. This requires docker on your computer.

  This you can setupo the cluster by simply running the script:
  `docker-compose up -d`
- When the database is up and the libraries are installed we need to push the schema in to the database


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
