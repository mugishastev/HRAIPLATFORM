# 🏗️ HRAI System Documentation: End-to-End Logic & Workflows

## 🌟 Vision
HRAI is a production-ready AI talent screening platform designed for the Umurava AI Hackathon. It solves the massive volume problem in recruitment by using **Google Gemini AI** to transform unstructured resumes and structured profiles into ranked, explainable shortlists.

---

## 🛣️ The Journey: From Job Posting to Final Hire

### Phase 1: Recruitment Setup (Recruiter)
1.  **Job Creation**: A recruiter creates a job role, defining traditional requirements (skills, experience, department).
2.  **AI Blueprinting**: (Unique Feature) The recruiter can add an "AI Blueprint"—custom natural language instructions that tell the Gemini model exactly what to look for (e.g., *"Focus on candidates who have worked in fast-paced startups"*).

### Phase 2: Multi-Channel Ingestion
HRAI supports two distinct ingestion scenarios:
*   **Scenario 1 (Internal)**: Applicants find the job on the **HRAI Careers Portal** and apply directly. Their data is stored in a structured format.
*   **Scenario 2 (External)**: Recruiters can **Bulk Ingest** candidates from external sources (LinkedIn, Job Boards) by:
    *   **CSV Upload**: Using the integrated **PapaParse** tool to map spreadsheet columns to applicant fields.
    *   **Direct Resume Upload**: Uploading PDF/DOCX files.

### Phase 3: Intelligent Parsing (Backend)
When a candidate is added with a `resumeUrl`:
1.  The **Resume Parsing Service** (Node.js) fetches the file from Cloudinary.
2.  Using **pdf-parse** and **mammoth**, it extracts the raw text from the document.
3.  The extracted text is saved to the `resumeText` field in MongoDB, ensuring the AI has the "unstructured" context it needs.

### Phase 4: AI Screening Orchestration (Gemini API)
When the recruiter clicks **"Run AI Screening"**:
1.  **Payload Bundling**: The backend fetches the Job details and *all* associated applicants (including their parsed resume text).
2.  **Intentional Prompting**: A high-context prompt is sent to **Gemini-1.5-Flash**. The prompt instructs the AI to act as a "Technical Recruiter" and evaluate candidates based on the Job Requirements + the AI Blueprint.
3.  **Structured Output**: Gemini returns a JSON array containing:
    *   **Match Score (0-100)**: A weighted evaluation of fit.
    *   **Rank**: Relative position among the pool.
    *   **Explainability**: Specific "Strengths" and "Gaps" (e.g., *"Missing AWS certification but strong in Terraform"*).

### Phase 5: Human-in-the-Loop Decision
The Recruiter reviews the AI's ranked shortlist:
*   **Accept Recommendation**: Moves the candidate to "Shortlisted" status and triggers an automated success email.
*   **Override & Reject**: The recruiter can ignore the AI's suggestion and reject the candidate if they see a red flag the AI missed.

---

## 👥 Role-Specific Workflows

### 🧑‍💻 The Applicant Journey
1.  **Discovery**: Browses the **Careers Portal** with real-time search.
2.  **Application**: Submits their profile and resume.
3.  **Self-Service**: Accesses a personal **Dashboard** to track the status of their applications (Applied → Screening → Interviewing → Hired).

### 👩‍💼 The Recruiter Journey
1.  **Management**: Uses the **Job Control Center** (4-column grid) to monitor all open roles.
2.  **Ingestion**: Uses the **CSV Ingest Tool** to bring in talent batches from external boards.
3.  **Analysis**: Triggers AI screening and reviews explainable insights.
4.  **Communication**: Updates candidate statuses, which triggers automated email/SMS notifications.

### 🛡️ The Admin Journey
1.  **Governance**: Creates and deletes **Recruiter Accounts** to control access to the platform.
2.  **Platform Health**: Monitors **Global Audit Logs** to see every action taken on the system.
3.  **System Analytics**: Views top-level KPIs (Total Applications, AI Screening Success Rates) in the **Insights Panel**.

---

## 🧩 Technical Stack & Infrastructure
*   **Frontend**: Next.js 15 (App Router), Redux Toolkit (RTK Query), Tailwind CSS (Premium Glassmorphic Design).
*   **Backend**: Node.js, TypeScript, Express.
*   **AI Layer**: Google Gemini 1.5 Flash (Mandatory Requirement).
*   **Database**: MongoDB Atlas (Mongoose ODM).
*   **Parsing**: pdf-parse, mammoth.
*   **Infrastructure**: Fully compatible with Vercel (Frontend/Backend) and GitHub Actions (CI/CD).

---

## 📜 Assumptions & Limitations
1.  **Resume Quality**: AI accuracy depends on the quality of the parsed text. Non-standard PDF layouts might result in "noisy" text.
2.  **API Rate Limits**: The system is designed with `express-rate-limit` to respect Gemini API quotas.
3.  **Human Control**: HRAI is a *support* tool; it does not automatically hire/reject without recruiter confirmation.

---
*Developed for the Umurava AI Hackathon 2026 by **Team Sohoza System**.*
*Steven, Musa, Aliance, Mugisha, Nadia*
