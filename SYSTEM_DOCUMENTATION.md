# HRAI - AI-Powered Unified Talent Platform

HRAI is a production-grade recruitment ecosystem that leverages Google Gemini AI to automate the screening, scoring, and ranking of job applicants. It bridges the gap between massive candidate pools and high-quality hiring decisions through intelligent automation.

---

## 👥 User Roles & Access

### 1. Recruiters (The Core Users)
Recruiters are the primary operators of the platform. Their workflow includes:
*   **Job Management**: Creating and editing job roles with specific "AI Blueprints" (custom instructions for the AI).
*   **Applicant CRM**: Managing all applicants in a unified view, tracking their status from "Applied" to "Hired".
*   **AI Screening**: Triggering the Gemini AI engine to analyze candidates against job requirements.
*   **Insights**: Monitoring recruitment performance and application trends through real-time charts.

### 2. Applicants (The Talent)
Applicants interact with the public-facing side of the platform:
*   **Careers Portal**: Browsing available jobs in professional Table or Grid views.
*   **Smart Search**: Finding relevant roles using AI-enhanced search and category filters.
*   **Easy Apply**: Submitting applications, including resume uploads and profile details.
*   **Tracking**: Managing their own applications and viewing their status.

### 3. Admins (The Overseers)
Admins have full platform governance:
*   **User Management**: Creating and managing recruiter accounts.
*   **System Monitoring**: Accessing global insights across all recruiters and jobs.
*   **Audit Logs**: Monitoring system activity and ensuring platform security.

---

## 🚀 Key Features

### 🤖 AI Screening Engine (Powered by Gemini)
The heart of HRAI is its AI-driven screening process:
1.  **Context Injection**: The AI receives the Job Description + the Recruiter's custom Blueprint.
2.  **Deep Analysis**: It analyzes each candidate's skills, experience, and profile.
3.  **Scoring & Ranking**: Assigns a Match Score (0-100%) and ranks candidates relatively.
4.  **Actionable Insights**: Provides a summary, lists specific **Strengths**, and identifies **Gaps** (missing qualifications).

### 📊 Real-Time Analytics
The platform provides dynamic insights:
*   **Applications Trends**: Weekly trend lines showing application volume.
*   **Role Breakdown**: Visualizing which roles are attracting the most talent.
*   **Screening Overview**: Tracking the success and failure rates of AI operations.

### 💼 Professional Job Management
*   **4-Column Grid View**: A modern, high-density layout for managing roles.
*   **Detailed CRM**: Filter and sort applicants based on their AI match scores.

---

## 🛠 Technical Architecture

### Frontend (Next.js 15)
*   **Framework**: Next.js with App Router.
*   **State Management**: Redux Toolkit & RTK Query for efficient API interactions.
*   **Styling**: Tailwind CSS with custom premium design tokens (32px rounding, glassmorphism).
*   **Icons**: Lucide React.

### Backend (Node.js & Express)
*   **Language**: TypeScript.
*   **Database**: MongoDB Atlas with Mongoose ODM.
*   **AI Integration**: Google Generative AI SDK (Gemini-1.5-Flash).
*   **Authentication**: JWT (JSON Web Tokens) with role-based access control (RBAC).
*   **File Handling**: Cloudinary for secure resume storage.

---

## ⚙️ Environment Configuration

To run the system, the following environment variables are required:

### Backend (`.env`)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret
GEMINI_API_KEY=your_google_ai_key
CORS_ORIGIN=https://your-frontend-url.com
SMTP_PASS=your_email_app_password (for notifications)
```

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

---

## 📈 System Workflow (End-to-End)

1.  **Recruiter** posts a job for "Senior Developer" and adds a blueprint: *"Prioritize cloud experience."*
2.  **Applicants** find the job on the Careers Portal and apply.
3.  **Recruiter** goes to the **AI Screening** dashboard and clicks **"Run AI"**.
4.  **AI Engine** processes the candidates and returns a ranked list within seconds.
5.  **Recruiter** reviews the "Top Matches" and moves them to the "Interviewing" status.
6.  **Insights Dashboard** updates to show the new screening success and application trend.

---
*Developed for the Umurava AI Hackathon by **Sohoza System**.*
*Team Members: Steven, Musa, Aliance, Mugisha, Nadia*
