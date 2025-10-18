# Project Overview

This project is the frontend for a MERN stack e-commerce application. It is built with React and Vite, and uses React Router for navigation, Zustand for state management, and Axios for making API calls to the backend. The UI is styled with Bootstrap.

The application features user authentication (login, registration), product browsing and viewing, a shopping cart, and a protected dashboard for administrators to manage products, orders, and customers.

# Building and Running

To get the project up and running, follow these steps:

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```

2.  **Run the development server:**
    ```bash
    pnpm run dev
    ```

3.  **Build for production:**
    ```bash
    pnpm run build
    ```

4.  **Lint the code:**
    ```bash
    pnpm run lint
    ```

# Development Conventions

*   **State Management:** The project uses Zustand for global state management. Stores are located in the `src/store` directory.
*   **API Calls:** All API calls to the backend are handled by an Axios instance located in `src/lib/axios.js`.
*   **Routing:** The application uses React Router for all client-side routing. The main routing configuration is in `src/App.jsx`.
*   **Styling:** The project uses Bootstrap for styling.
*   **Code Style:** The project uses ESLint to enforce code style. You can run the linter with `pnpm run lint`.