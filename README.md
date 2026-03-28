# Personal Finance Tracker

A full-stack Personal Finance Tracker application built with React, Spring Boot, and MySQL.

## Features
- **Google OAuth 2.0 Login**: Seamless authentication without passwords.
- **Stateless Security**: JWT-based authentication stored in localStorage.
- **Transaction Management**: Add, edit, and delete income/expense transactions.
- **Dashboard Summary**: Real-time overview of total income, expense, and balance.
- **Data Visualization**: Pie and Bar charts for spending insights using Chart.js.
- **Modern UI**: Clean, responsive design using Tailwind CSS.
- **Currency**: Formatted in Indian Rupee (₹).

---

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Zustand, Axios, Chart.js, Lucide React.
- **Backend**: Java 17, Spring Boot 3.x, Spring Data JPA, Spring Security.
- **Database**: MySQL.
- **Auth**: Google OAuth 2.0, JSON Web Token (JWT).

---

## Project Structure

```text
.
├── backend/
│   ├── src/main/java/com/tracker/finance/
│   │   ├── config/          # CORS & Bean Config
│   │   ├── controller/      # REST API Endpoints
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── entity/          # JPA Entities (User, Transaction)
│   │   ├── exception/       # Global Exception Handling
│   │   ├── repository/      # Spring Data JPA Repositories
│   │   ├── security/        # JWT & Auth Filters
│   │   └── service/         # Business Logic
│   └── src/main/resources/
│       └── application.yml  # Database & App Config
└── frontend/
    ├── src/
    │   ├── api/             # Axios Interceptors
    │   ├── components/      # UI Components
    │   ├── pages/           # Application Pages
    │   ├── store/           # Zustand State Management
    │   └── utils/           # Helpers
    ├── index.html
    └── tailwind.config.js
```

---

## Getting Started

### 1. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Configure the **OAuth consent screen**.
4. Go to **Credentials** -> **Create Credentials** -> **OAuth client ID**.
5. Application type: **Web application**.
6. Authorized JavaScript origins: `http://localhost:5173`.
7. Authorized redirect URIs: `http://localhost:5173`.
8. Copy the **Client ID**.

### 2. Backend Setup (Spring Boot)
1. Install **Java 17** and **Maven**.
2. Install and run **MySQL Server**.
3. Create a database named `finance_tracker`.
4. Update `backend/src/main/resources/application.yml`:
   - Set `google.client-id` to your Google Client ID.
   - Update MySQL `username` and `password`.
5. Run the backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

### 3. Frontend Setup (React)
1. Install **Node.js** (v18+).
2. Create a `frontend/.env` file:
   ```env
   VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   ```
3. Install dependencies and run:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/google` | Verify Google Token & Login | No |
| GET | `/api/users/me` | Get Current User Info | Yes |
| GET | `/api/transactions` | Get Paginated Transactions | Yes |
| GET | `/api/transactions/all` | Get All Transactions | Yes |
| POST | `/api/transactions` | Create New Transaction | Yes |
| PUT | `/api/transactions/{id}` | Update Transaction | Yes |
| DELETE | `/api/transactions/{id}` | Delete Transaction | Yes |
| GET | `/api/summary` | Get Financial Summary & Stats | Yes |

---

## Deployment Guide

### Backend
1. Build the JAR: `mvn clean package`.
2. Deploy the JAR to any cloud provider (AWS, Azure, Heroku).
3. Set environment variables: `DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `GOOGLE_CLIENT_ID`, `JWT_SECRET`.

### Frontend
1. Build for production: `npm run build`.
2. Serve the `dist` folder using Nginx or Vercel/Netlify.
3. Ensure the `VITE_GOOGLE_CLIENT_ID` is set during the build.
