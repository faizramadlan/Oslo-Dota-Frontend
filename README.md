# Oslo Dota

Oslo Dota is a modern, dark-themed informational web application built with **Vue 3**, **Vite**, and **Tailwind CSS**. It serves as an informational hub for Dota 2 heroes, memes, and related freebies.

## Tech Stack
-   **Framework:** Vue 3, Vite
-   **Styling:** Tailwind CSS (with specific brutalist/pixel aesthetics using Space Mono and Press Start 2P fonts)
-   **State Management:** Pinia
-   **Routing:** Vue Router
-   **HTTP Client:** Axios
-   **UI Feedback:** SweetAlert2

## Features
- Browse comprehensive Dota 2 hero rosters and detailed stats.
- Dark mode standard brutalist design system perfectly fit for gamers.
- Fully responsive sidebar routing logic.

## Project Setup Local

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Vercel Deployment

This project is tailored natively for deployment on [Vercel](https://vercel.com/). 
The repository includes a custom `vercel.json` file which rewrites all incoming requests (SPA fallback) directly to `index.html`. This ensures that Vue Router's history mode correctly maps subroutes (like `/heroes` or `/freebies`) when a user visits them directly or refreshes the page on production.

To deploy on Vercel:
1. Push this project to a Github Repo.
2. Link the Repo to a new Vercel Project.
3. Keep default build settings (`npm run build`).
4. Set any Environment Variables (like `VITE_API_URL` if pointing to a backend API).
5. Deploy.
