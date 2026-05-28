# CatBeauty

CatBeauty is a small full-stack React application built for the frontend/full-stack challenge.

## Tech Stack

Frontend:

* React
* Vite
* TypeScript
* Material UI
* Tailwind CSS
* React Query

Backend:

* Express.js
* TypeScript

## Project Structure

/src → React Vite application
/server → Express API server

---

## Requirements

Install Node.js and npm:

* macOS:

```bash
brew install node
```

* Windows:
  Download from:
  https://nodejs.org/

Verify installation:

```bash
node -v
npm -v
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/jmerinoh/CatBeauty.git
cd CatBeauty
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create an account at:

https://thecatapi.com/

After signing up, you will receive an API key by email.

Create a `.env` file inside the `/server` folder:

```bash
cd server
touch .env
```

Add your API key:

```env
CAT_API_KEY=live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Do not commit the `.env` file to GitHub.

---

## Run the Project

Start the frontend:

```bash
cd CatBeauty
npm run dev
```

Frontend:

```txt
http://localhost:5173
```

Backend:

```txt
http://localhost:3001
```

---

## Features

* Infinite cat gallery
* Featured cat section
* Cat details modal
* Backend API proxy using Express
* Responsive layout

## APIs

* https://thecatapi.com/

## Notes

This project was developed as part of the frontend/full-stack technical challenge for www.CrimsonCircle.com.
