# Music Library Frontend

React + Vite frontend for the Songsemble music library app.

## Requirements

- Node.js 18+

## Local setup

```bash
npm install
npm start
```

The app runs at [http://localhost:5173](http://localhost:5173).

Create `.env.development.local` and set `VITE_API_HOST` to your API URL (for example `http://localhost:3000`).

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Run the dev server |
| `npm test` | Run tests with Vitest |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run serve-heroku` | Serve the production build on `$PORT` |

## Deployment

```bash
git push heroku main
```

Production app: [https://strouf-music-library-app.herokuapp.com/](https://strouf-music-library-app.herokuapp.com/)
