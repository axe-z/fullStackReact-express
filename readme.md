React redux template de depart.
pour partir react et les notes plus bas :

npm run wp va construire les vrai fichier dabs build,
npm run wpserver, va partir un serveur avec fichier tmp, sur port 3000
index est dans src, et peut utiliser des varables de templating.
roule avec WP2


Tout y est pour un projet react-redux, MAIS AUCUNE BASE ICI D EXPRESS OU MONGO.

npm {
  "name": "wp",
  "version": "1.0.0",
  "description": "Webpack 2 the lessons",
  "main": "build.js",
  "scripts": {
    "test": "NODE_ENV= test karma start",
    "startdev": "http-server",
    "dev": "lite-server --baseDir='build'",
    "wp": "webpack -d --watch",
    "wpprod": "webpack -p --watch",
    "webpack": "webpack-dev-server --watch --progress --colors",
    "wpserver": "webpack-dev-server --watch"
  },
  "author": "Brice Wilson",
  "license": "ISC",
  "devDependencies": {
    "autoprefixer-loader": "^3.2.0",
    "babel-cli": "^6.18.0",
    "babel-core": "^6.24.0",
    "babel-loader": "^6.4.1",
    "babel-polyfill": "^6.20.0",
    "babel-preset-env": "^1.2.2",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-react": "^6.23.0",
    "babel-preset-stage-0": "^6.22.0",
    "babel-preset-stage-2": "^6.22.0",
    "babel-preset-stage-3": "^6.22.0",
    "bootstrap-loader": "^2.1.0",
    "bootstrap-sass": "^3.3.7",
    "css-loader": "^0.26.4",
    "extract-text-webpack-plugin": "^2.1.0",
    "file-loader": "^0.9.0",
    "foundation-sites": "^6.2.0",
    "html-webpack-plugin": "^2.28.0",
    "moment": "^2.18.1",
    "node-sass": "^4.5.2",
    "node-uuid": "^1.4.8",
    "react": "^15.4.2",
    "react-addons-test-utils": "^15.5.1",
    "react-dom": "^15.4.2",
    "react-redux": "^5.0.4",
    "react-test-utils": "0.0.1",
    "redux": "^3.6.0",
    "redux-immutable-state-invariant": "^2.0.0",
    "redux-thunk": "^2.2.0",
    "resolve-url-loader": "^2.0.2",
    "sass-loader": "^4.1.1",
    "style-loader": "^0.13.2",
    "redux-promise": "^0.5.3",
    "url-loader": "^0.5.8",
    "webpack": "^2.2.1",
    "webpack-dev-server": "^2.4.2"
  },
  "dependencies": {
    "bootstrap": "^3.3.7",
    "express": "^4.15.2",
    "firebase": "^3.9.0",
    "google-map-react": "^0.24.0",
    "gsap": "^1.19.0",
    "isomorphic-fetch": "^2.2.1",
    "jquery": "^3.1.1",
    "lodash": "^4.17.4",
    "node-libs-browser": "^0.5.2",
    "node-sass": "^4.5.2",
    "react-google-maps": "^4.7.1",
    "react-router": "^3.0.3",
    "youtube-api-search": "0.0.5"
  }
}
