# Fastify Tutorial  – REST API

Modern REST API built with Node.js and Fastify. The project showcases user authentication with JSON Web Tokens, data persistence in a SQLite database, and automatically generated Swagger documentation.

## Features

- **Fastify v5** for high-performance HTTP server
- **SQLite** database integration via Fastify plugin
- **JWT authentication** with hashed passwords (bcrypt)
- **Player management** endpoints (list & create)
- **Swagger** (OpenAPI 3) documentation served under `/docs`
- **ES Modules** syntax
- **Nodemon** for hot-reloading during development

## Prerequisites

- Node.js >= 18
- npm (comes with Node.js)

## Getting Started

Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd fastify_tutorial2
npm install
```

### Running in Development

```bash
npm run dev
```

### Running in Production

```bash
npm start
```

The server will start on `http://localhost:3000`. Navigate to `http://localhost:3000/docs` to explore the interactive Swagger UI.

## Database

On first launch the app creates a local SQLite file named `data.sqlite` and sets up the required `users` and `players` tables automatically. No manual migrations are needed.

## API Endpoints

### Authentication

| Method | Endpoint    | Description                           |
| ------ | ----------- | ------------------------------------- |
| POST   | /register   | Register a new user                   |
| POST   | /login      | Log in and receive a JWT access token |

### Players (protected)

`Authorization: Bearer <JWT_TOKEN>` header is required.

| Method | Endpoint  | Description          |
| ------ | --------- | -------------------- |
| GET    | /players  | List all players     |
| POST   | /players  | Create a new player  |

#### Example: Register → Login → List Players

```bash
# Register
curl -X POST http://localhost:3000/register \
  -H 'Content-Type: application/json' \
  -d '{"username":"alice","password":"secret"}'

# Login
TOKEN=$(curl -s -X POST http://localhost:3000/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"alice","password":"secret"}' | jq -r .token)

# Authorized request
curl -H "Authorization: Bearer $TOKEN" http://localhost:3000/players
```

## Project Structure

```
fastify_tutorial2/
├── app.js            # Fastify entry point
├── plugins/          # Fastify plugins (database)
├── routes/           # Route declarations
├── controllers/      # Request handlers
├── services/         # Business logic & DB access
├── middlewares/      # JWT middleware
├── schemas/          # JSON Schema definitions for validation
├── models/           # SQL schema definitions
└── data.sqlite       # SQLite database file (generated)
```