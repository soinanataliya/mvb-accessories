# Project Name

## Overview
This project is a modern web application built with a monorepo architecture using [Turborepo](https://turbo.build/) and [pnpm](https://pnpm.io/). It consists of a Next.js frontend with internationalization (i18n) and dark/light theme support, an admin panel with JWT authentication, and a Fastify backend with an SQLite3 database.

## Features
### Client
- Built with [Next.js](https://nextjs.org/)
- Internationalization (i18n)
- Dark/Light mode support
- State management with [React Query](https://tanstack.com/query/latest)

### Admin Panel
- Built with [Material UI](https://mui.com/)
- Simple authentication using JWT

### Backend
- Built with [Fastify](https://www.fastify.io/)
- Uses [SQLite3](https://www.sqlite.org/index.html) as the database
- Contains both public and protected API routes (JWT authentication)


### Installation
Clone the repository and install dependencies:

```sh
pnpm install
```

### Running the Application
#### Start the development server
```sh
pnpm dev
```

#### Start the backend server
```sh
pnpm backend:dev
```
