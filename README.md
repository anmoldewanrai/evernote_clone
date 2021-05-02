# Evernote Clone
## tminus5 P2

[View Live](https://evernote-clone-p2.netlify.app/)

## Features

- Create new note
- Read saved note
- Update note
- Delete note

## Tech

Evernote Clone uses a number of free services and open source projects to work properly:

- [ReactJS] (FrontEnd)
- [React Quill] (Editor Library)
- [Firebase] (BackEnd)
- [MaterialUI] (React CSS Library)

## Installation

Evernote Clone requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies.

```sh
cd evernote_clone-master
npm i
```
#### Important
Since, the api keys have not been pushed alongwith the code and have been accessed via the dotenv package. So, create a .env file within the root folder i.e., evernote_clone-master (or whatever you may have renamed it to) and replace the variables with your firebase configurations. For exanple:

```sh
REACT_APP_FIREBASE_API_KEY = firebase api key string value
```

## Run

Inside root directory

```sh
npm start
```

## Development

Want to contribute? Great!



## License
Tutorial By [FreeCodeCamp]

   [ReactJS]: <https://reactjs.org/>
   [React Quill]: <https://github.com/zenoamaro/react-quill>
   [Firebase]: <https://firebase.google.com/>
   [MaterialUI]: <https://material-ui.com/>
   [FreeCodeCamp]: <https://www.youtube.com/watch?v=I250xdtUvy8>
