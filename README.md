# Employee Leave & Attendance Management System (Mini HR Tool)

A professional MERN stack application designed for organizations to manage employee attendance tracking and leave management. This system provides distinct portals for Employees and Administrators with role-based access control separating employee and admin functionalities.

## 1. Project Overview
The **Employee Leave & Attendance Management System** is a mini HR tool built to optimize staff presence and time-off requests. It focuses on a clean and responsive user interface, providing a modern and minimal design.

### Key Features:
- **Authentication**: Secure JWT-based authentication for Employees and Admins.
- **Leave Management**: Tracking of leave requests through a structured workflow (Pending, Approved, Rejected).
- **Attendance Tracking**: Daily attendance marking and monitoring for employees and administrators.
- **Admin Controls**: Visibility into employee records and centralized management of status updates.
- **Profile Management**: Displays user profile information including name, email, role, and date of joining.

## 2. Tech Stack & Justification

### Frontend
- **React**: Chosen for its component-based architecture, which allows for a modular and highly scalable UI.
- **Tailwind CSS**: Utilized for rapid development of a clean and responsive design.
- **CSS Animations**: Basic CSS-based animations for smooth interactions.

### Backend
- **Node.js & Express**: Provides a lightweight and highly efficient environment for building RESTful APIs.
- **MongoDB**: A NoSQL database choice that offers the schema flexibility required for rapid development and evolving HR data requirements.

### Authentication
- **JWT (JSON Web Token)**: Implemented for stateless and secure session management, ensuring that both client and server can communicate securely without session overhead.

### Deployment
- **Vercel**: The frontend is optimized for deployment on Vercel, ensuring fast load times and reliable global delivery.
- **Render**: The backend is hosted on Render, allowing for easy deployment and management of Node.js services.

## 3. Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account or local MongoDB instance

### Step 1: Clone Repository
```bash
git clone https://github.com/Shubhammangal740/hr_system.git
cd hr_system
```

### Step 2: Setup Backend
```bash
cd backend
npm install
# Create .env file with variables listed below
npm start
```

### Step 3: Setup Frontend
```bash
cd ../frontend
npm install
# Create .env file with variables listed below
npm run dev
```

## 4. Environment Variables

### Backend (.env)
- `MONGO_URI`: The connection string for your MongoDB instance.
- `JWT_SECRET`: A secure string used to sign JWT tokens.
- `PORT`: The port on which the backend server will run (Default: 5000).

### Frontend (.env)
- `VITE_API_URL`: The full URL of the backend API (e.g., `http://localhost:5000/api`).

## 5. API Endpoints

### Auth
- `POST /api/auth/register`: Create a new user account.
- `POST /api/auth/login`: Authenticate and receive a JWT.
- `GET /api/auth/profile`: Retrieve the authenticated user's profile details.

### Leave
- `POST /api/leaves`: Submit a new leave request.
- `GET /api/leaves/my`: Fetch leave history for the logged-in employee.
- `PUT /api/leaves/:id`: Update a pending leave request.
- `DELETE /api/leaves/:id`: Remove a pending leave request.
- `PATCH /api/leaves/:id/status`: (Admin only) Approve or reject a leave request. Leave balance is deducted only when the leave is approved.

### Attendance
- `POST /api/attendance`: Mark attendance for the current day.
- `GET /api/attendance/my`: Fetch attendance logs for the logged-in employee.
- `GET /api/attendance/all`: (Admin only) Fetch all attendance records with optional filters.

### Admin
- `GET /api/admin/users`: Fetch the full employee registry.
- `GET /api/admin/leaves`: Fetch all leave requests for processing.
- `GET /api/admin/attendance`: Global monitoring of attendance records.

## 6. Database Models

### User
- Attributes: `name`, `email`, `password`, `role` (Admin/Employee), `dateOfJoining`, `leaveBalance`.
- *Purpose*: Stores core user identity and HR-related metrics like joining date and balance.

### Leave
- Attributes: `userId` (Ref), `leaveType`, `startDate`, `endDate`, `status` (Pending/Approved/Rejected), `reason`, `totalDays`.

### Attendance
- Attributes: `userId` (Ref), `date`, `status` (Present / Absent).

## 7. AI Tools Declaration
This project utilized a collaborative development approach between the engineer and AI assistance.

### Contribution Split
- **50% AI Assistance**: Utilized for UI component structuring, layout suggestions, and rapid debugging of frontend components.
- **50% Self-Implementation**: Architected the backend logic, designed the leave approval flow and attendance rules implementation, designed the database schema, and finalized all API integrations.

### Key Contributions
- **AI**: UI component breakdown, Framer Motion integration ideas, and layout responsiveness.
- **Self**: Core business logic (leave status transitions), database schema architecture, API security design, and production-ready code sanitation.

## 9. Known Limitations
- **Pagination**: Performance may degrade with massive datasets as full lists are fetched.
- **Emails**: No email notification system for leave status updates.
- **Animations**: Limited to essential micro-animations in the Navbar and Dashboards.
- **Edge Cases**: Basic validation for overlapping dates; complex holiday calendar integrations are not included.

## 10. Time Spent
- **Total Time**: ~16 Hours
- **Backend**: 6 Hours (API, Logic, Security)
- **Frontend**: 8 Hours (UI, Transitions, Integration)
- **Testing & Deployment**: 2 Hours
