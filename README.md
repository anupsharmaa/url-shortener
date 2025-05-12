# url-shortener

# 🔗 URL Shortener Web App

A full-stack URL shortener built with **Node.js**, **Express**, **MongoDB Atlas**, and a **React (Vite)** frontend. 
This app allows users to shorten long URLs and track click analytics — all with a clean and responsive UI.

---

## 📦 Features

- 🔧 Shorten any valid URL into a compact form.
- 📈 Track how many times a short URL has been visited.
- 🌐 View all stored URLs along with their click counts.
- ☁️ Fully deployed: Backend on **Railway**, Frontend on **Vercel**.
- 💾 Data stored securely on **MongoDB Atlas**.

---

## 🛠️ Technologies Used

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- Railway deployment
- Environment variables via dotenv

### Frontend
- React (Vite)
- Fetch API
- CSS for basic styling
- Vercel deployment
- Environment variables via dotenv
---

## 🌐 Live Demo
- https://url-shortener-ui-eta.vercel.app/

---
## ⚙️ Environment Variables
##Create a `.env` file in both `/server` and `/client` directories.
For backend (`/server/.env`)  # MONGO_URL & PORT
For frontend (`/client/.env`)  # API_URLS

---
📊 API Endpoints
POST /url
Creates a short URL from a given original URL.

GET /url/shortId
Redirects to the original URL.

GET /url/analytics/shortId
Returns the number of clicks for a short URL.

GET /url/all
Returns all stored URLs with click data.

🧑‍💻 Author
Made with ❤️ by Anup Sharma

## 🚀 Getting Started Locally

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener

# Run Backend Server
cd server
npm install
npm start

# Run Frontend Server
cd ../client
npm install
npm run dev



