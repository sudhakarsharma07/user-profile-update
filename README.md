# 🧑‍💼 User Profile Form (MERN Stack Project)

A full-stack **User Profile Management App** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. This application allows users to enter personal, professional, and preference details with advanced features like image upload, password strength validation, and a dynamic country-state-city selection system.

---

## 🚀 Tech Stack

- **Frontend:** React.js (CRA)
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Styling:** CSS
- **File Uploads:** Multer
- **Deployment:** Netlify (Frontend), Render (Backend)

---

## ✅ Features

- 📸 **Profile Image Upload** – Supports JPG/PNG formats up to 2MB  
- 🔐 **Password Strength Validation** – Real-time password strength meter  
- 🧩 **Multi-step Form** – Personal, Professional & Preference sections  
- 🌍 **Dynamic Dropdowns** – Country → State → City  
- 🎯 **Conditional Logic** – Profession & company fields based on user type  
- 📦 **Subscription Options** – Newsletter checkbox and plan selection

---

## 📁 Project Folder Structure

```
user-profile/
├── client/                     # React frontend
│   └── src/
│       ├── components/         # Multi-step form components
│       ├── styles/             # CSS files
│       └── App.js              # Main React App
├── server/                     # Node + Express backend
│   ├── routes/                 # API endpoints
│   ├── uploads/                # Uploaded images
│   └── server.js               # Backend entry point
├── .env                        # Environment variables
└── README.md                   # Project documentation
```

---

## 🔧 Getting Started (Run Locally)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/user-profile.git
cd user-profile
```

---

### 2️⃣ Backend Setup (`/server`)

```bash
cd server
npm install
```

📄 Create a `.env` file inside `/server` and add the following:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

▶️ Start the backend:

```bash
node server.js
```

🌐 Backend runs at: `http://localhost:5000`

---

### 3️⃣ Frontend Setup (`/client`)

```bash
cd ../client
npm install
npm start
```

🌐 Frontend runs at: `http://localhost:3000`

---

## 🔮 Future Improvements

- 🔐 Add JWT-based authentication  
- 🌐 Integrate Google/Facebook login  
- 📤 Cloud-based image storage (e.g., Cloudinary)  
- 📊 Admin dashboard with analytics  

---

## 🙋‍♂️ Author

**Sudhakar Sharma**  
💼 MERN Stack Developer  
📧 Email: [sudhakar881032@gmail.com](mailto:sudhakar881032@gmail.com)  
🌐 Portfolio: [https://sudhakar-portfolio-gules.vercel.app/](https://sudhakar-portfolio-gules.vercel.app/)

---

## 📄 License

This project is licensed under the **MIT License**.
