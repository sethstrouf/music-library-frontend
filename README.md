# Music Library Frontend

React + Vite frontend for the music library app.

## Setup

```bash
npm install
```

## Available Scripts

### `git push heroku main`

Deploy frontend to [https://strouf-music-library-app.herokuapp.com/](https://strouf-music-library-app.herokuapp.com/).

### `npm start`

Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page reloads when you make changes.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run preview`

Serves the production build locally for testing.

### `npm run serve-heroku`

Serves the production build on the port specified by `$PORT` (used for Heroku).

## Configuration

- Auth0 domain and audience keys — development: `.env.development.local`, production: Heroku config
- React version: 18.2
