# BookHarbour 📚

[GitHub Repository](https://github.com/Achintha0626/digitalmarketing)

---

## Project Overview 📝

**BookHarbour** is a full‑stack book‑management application that allows users to:

- 📖 **Register & log in** securely via JWT authentication  
- 📚 **Add, edit, delete** books in their personal library  
- ☁️ **Upload cover images** to Cloudinary  
- 🔍 **Search & filter** books by title/author, status, type, and sort order  
- 📈 View reading **statistics** (To read,Reading, Finished .)  
- 🌙 Toggle **dark/light** theme in the dashboard  

**Tech Stack**  
- **Backend**: Node.js, Express, MongoDB & Mongoose, Cloudinary, JWT  
- **Frontend**: React, Vite, React Router v6, React Query, Recharts  

---

## Prerequisites

- **Node.js** ≥ 18.x  
- **npm** (bundled with Node.js) or **Yarn**  
- **MongoDB** (Atlas or local instance)  
- **Cloudinary** account (for image uploads)  
- **Docker** & **docker-compose** (optional, for containerized setup)

---

🏁 Local Setup
🐳 Option 1: Docker (Recommended)

Install Docker: Ensure Docker Desktop is installed and running.  
Navigate to Project Directory:  cd Book-Harbour


Run Docker Compose:  docker-compose up --build


Access the App: Open http://localhost:3000/ in your browser.


🖥️ Option 2: Local (Without Docker)

⚠️ Note: This method may take longer to set up due to dependency installation.


Navigate to Project Directory:  
cd Book-Harbour


Install Dependencies:  
npm run setup


Start the Development Server:  
npm run dev


Access the App: Open http://localhost:5173/ in your browser.  

Test Account: Log in for optimal performance using:  

Email: Test@gmail.com  
Password: TestUser






