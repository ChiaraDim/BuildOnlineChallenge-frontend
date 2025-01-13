# BuildOnlineChallenge-frontend

## Overview
This project is the frontend for this challenge, a contact management platform that allows users to manage their contact information.

## Table of contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)

## Technologies Used
- **React.js**: Component-based library for building user interfaces..
- **Next.js**: Framework for server-side rendering and routing.
- **TypeScript**: Enhances code reliability with static typing.
- **Formik**: Form validation and management.
- **Redux**: State management tools for efficient global state handling.
- **TailwindCSS**: Utility-first framework for responsive UI styling.
- **Axios**: Promise-based HTTP client for API requests.

## Installation
Follow these steps to set up the backend locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your_username>/BuildOnlineChallenge-frontend.git
   cd BuildOnlineChallenge-frontend
   ```
2. **Install dependencies**:
    ```bash
    npm install
    ```

## Environment Variables
Create a .env file in the root of your project and configure it with the following variables:
    ```bash
    NEXT_PUBLIC_API_URL=http://localhost:5000
    ```
These variables are used to interact with the backend API.
## Running the Application
To run the application, follow these steps:

1. **Run the development server**:
    For development mode:
    ```bash
    npm run dev
    ```
    For building in production mode:
    ```bash
    npm run build
    ```
