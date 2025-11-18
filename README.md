<div align="center">

#  **Sociofy**
---

###  **Team Members**

| Roll No | Name | Contribution |
|:--------:|:------|:--------------|
| B24CS505 | Harshit Kanpal | Frontend & UI Design |
| B24CS506 | Utkarsh Umap | Backend & Database Integration |
| B24CS507 | Yash Bhardwaj | Testing, Documentation & Deployment |

---

</div>

---

##  **About the project**

It's a lightweight social media web application built using the MERN stack (MongoDB, Express.js, React, Node.js).
It includes authentication using JWT (stored in HTTP-only cookies), user profiles, posts, feed system, and a basic trust-score mechanism to promote safe interactions.

---

##  **Tech Stack**
| Category     | Technologies                            |
| ------------ | --------------------------------------- |
| **Frontend** | React.js (Vite), Tailwind CSS, Axios    |
| **Backend**  | Node.js, Express.js                     |
| **Database** | MongoDB, Mongoose                       |
| **Tools**    | Git, GitHub, Docker, Postman |

---

## **Features**
-  User Authentication (Login / Signup)  
-  Responsive and Modern UI  
-  CRUD Operations for Posts  
-  Profile Management  
-  Session Handling with Cookies  
-  Error Handling and Validation  

---

## **Folder Structure**

```

Sociofy/
│
├── backend/             # Server-side code (Node.js + Express)
│   ├── models/          # Mongoose Schemas
│   ├── routes/          # API Endpoints
│   ├── config/          # Database Configuration
│   └── server.js        # Main Server File
│
├── frontend/            # React Frontend
│   ├── src/             # React Source Files
│   │   ├── components/  # UI Components
│   │   ├── pages/       # Main Pages (Home, Profile, Login, Signup)
│   │   ├── assets/      # Images and Media
│   │   └── App.jsx      # Main Application File
│
├── docker-compose/      # For running docker installation
├── presentation/        # Presentation Slides
├── README.md            # This file
└── package.json         # Dependencies List

````

---

##  **Installation & Execution**

## Manual

First setup all the environment files:
For backend:
```bash
MONGO_URL=
JWT_SECRET=
PORT=3000
FRONT_PORT=
```

For frontend

```bash
VITE_API_URL=
VITE_ROOT_URL=
```

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Hark-github/sociofy.git
cd sociofy
````

### 2️⃣ Install Dependencies

For Node.js:

```bash
npm install
```

For Backend (if separate):

```bash
cd backend
npm install
```

For Frontend:

```bash
cd frontend
npm install
```

### 3️⃣ Setup Database

Ensure MongoDB is running locally or provide your MongoDB Atlas URI in the backend configuration file (`config/db.js`).

### 4️⃣ Run the Application

For Backend:

```bash
npm start
```

For Frontend:

```bash
npm run dev
```

### 5️ Open in Browser

`http://localhost:5173`  (Frontend)
`http://localhost:3000`  (Backend API)

---

## **Steps Followed**

1. Problem Identification
2. Requirement Gathering
3. UI/UX Design and Architecture
4. Backend API Development
5. Frontend Implementation
6. Integration and Testing
7. Deployment and Documentation
8. Version Control via GitHub

---

## **Outputs / Screenshots**

| Screenshot                          | Description              |
| ----------------------------------- | ------------------------ |
| ![Home Page](assets/home.png)       | Home screen showing feed |
| ![Profile Page](assets/profile.png) | User profile view        |
| ![Login Page](assets/login.png)     | Login screen             |

---

## **Live Links**

Frontend (Vercel): *Coming Soon*
Backend (Render / Railway): *Coming Soon*
GitHub Repository: [https://github.com/Hark-github/sociofy](https://github.com/Hark-github/sociofy)

---

<div align="center">

### **Contact**

[harshitkanpal@example.com](mailto:harshitkanpal@example.com)
[utkarshumap@example.com](mailto:utkarshumap@example.com)
[yashbhardwaj@example.com](mailto:yashbhardwaj@example.com)
[GitHub Profile](https://github.com/Hark-github)

</div>
 
