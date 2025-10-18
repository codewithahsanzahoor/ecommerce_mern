# Project Overview

This project is the backend for an e-commerce application. It is a Node.js application built with the Express.js framework. It uses MongoDB as its database with the Mongoose ODM. Authentication is handled using JSON Web Tokens (JWT).

## Key Technologies

*   **Framework:** Express.js
*   **Database:** MongoDB with Mongoose
*   **Authentication:** JSON Web Tokens (JWT)
*   **Dependencies:**
    *   `bcryptjs`: For password hashing
    *   `cors`: For enabling Cross-Origin Resource Sharing
    *   `dotenv`: For managing environment variables
    *   `express`: Web framework
    *   `jsonwebtoken`: For JWT authentication
    *   `mongoose`: MongoDB object modeling
    *   `morgan`: HTTP request logger
    *   `nodemon`: For automatic server restarts during development

# Building and Running

## Prerequisites

*   Node.js and npm/pnpm/yarn
*   MongoDB

## Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    pnpm install
    ```

## Running the Application

1.  Create a `.env` file in the root directory and add the following environment variables:
    ```
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    PORT=<your_port>
    ```
2.  Start the development server:
    ```bash
    pnpm dev
    ```

The server will start on the port specified in your `.env` file.

# Development Conventions

*   **ES Modules:** The project uses ES Modules (`import`/`export` syntax).
*   **File Structure:** The code is organized into `config`, `controllers`, `middlewares`, `models`, and `routes` directories.
*   **Routing:** Routes are defined in the `src/routes` directory and are separated by concern (e.g., `authRoute.js`, `productRoute.js`).
*   **Controllers:** Controllers in `src/controllers` contain the business logic for each route.
*   **Models:** Mongoose models in `src/models` define the database schemas.
*   **Middleware:** Custom middleware is located in `src/middlewares`.
*   **Error Handling:** Basic error handling is implemented in the controllers, returning JSON responses with error messages.