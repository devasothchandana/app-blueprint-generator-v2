# 🧠 App Blueprint Generator

An AI-powered application that transforms a simple app idea into a complete software blueprint. The system analyzes user requirements and automatically generates the application architecture, database schema, and validation report using a multi-stage AI pipeline.

---

## 🚀 Features

* 📝 Convert app ideas into structured blueprints
* 🎯 Intent extraction from natural language prompts
* 🏗️ System architecture generation
* 🗄️ Automatic database schema generation
* ✅ Blueprint validation and repair
* 💻 Modern Next.js frontend
* ⚡ Express.js backend
* 🤖 AI-powered processing pipeline

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* CORS
* dotenv

### AI

* Google Gemini API
* Groq SDK

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 📂 Project Structure

```
app-blueprint-generator/
│
├── frontend/
│   ├── app/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── pipeline/
│   │   ├── stage1_intent.js
│   │   ├── stage2_design.js
│   │   ├── stage3_schemas.js
│   │   └── stage4_validate.js
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ AI Pipeline

### Stage 1 – Intent Extraction

Analyzes the user's prompt and extracts:

* Application type
* Core features
* Functional requirements

### Stage 2 – System Design

Generates:

* Overall architecture
* Modules
* API structure
* Technology recommendations

### Stage 3 – Schema Generation

Creates:

* Database tables
* Relationships
* Fields
* Data models

### Stage 4 – Validation & Repair

Checks the generated blueprint for:

* Missing components
* Invalid relationships
* Structural consistency
* Automatic corrections

---

## 📸 Application Workflow

1. User enters an application idea.
2. Frontend sends the prompt to the backend.
3. Backend executes the four AI pipeline stages.
4. Results are returned to the frontend.
5. Users can view:

   * Intent
   * Design
   * Database Schemas
   * Validation Report

---

## 🖥️ Running Locally

### Clone the repository

```bash
git clone https://github.com/devasothchandana/app-blueprint-generator-v2.git
```

### Install Frontend

```bash
cd frontend
npm install
npm run dev
```

### Install Backend

```bash
cd backend
npm install
npm start
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

Example:

```
GEMINI_API_KEY=your_api_key
GROQ_API_KEY=your_api_key
```

---

## 🌐 Live Demo

**Frontend (Vercel):**

https://app-blueprint-generator.vercel.app/

**Backend (Render):**

https://app-blueprint-generator.onrender.com

---

## 👩‍💻 Author

**Chandana**

GitHub: https://github.com/devasothchandana

---

## 📄 License

This project is intended for educational and learning purposes.
