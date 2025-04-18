# 🧠 AI-Powered Sales Dashboard (Frontend)

This is the frontend for the AI-enhanced Sales Dashboard, built with **Next.js** and **React**. It features a clean UI to display sales representatives and an AI bar that allows users to ask intelligent questions powered by a FastAPI + Cohere backend.

---

## 🚀 Features

- ✅ Reusable `Layout` and `AiBar` components
- 📊 Dynamic table with customizable columns
- 🤖 AI Assistant to ask questions about sales data
- 🔔 Global toast notifications for feedback (React Toastify)
- 💄 Styled with Tailwind CSS (if used)

---

## 📁 Project Structure
frontend/
├─src/
├── components/
│   ├── ai/
│   │   └── ai_bar.js         # AI input bar and result display
│   ├── layout/
│   │   └── layout.js         # App layout wrapper with shared elements
│   └── table/
│       ├── cell.js           # Table cell rendering logic (optional)
│       └── table.js          # Table component
│
├── constant/
│   └── config.js             # Constants like API base URLs, etc.
│
├── lib/
│   └── services/
│       ├── axios.js          # Axios instance config
│       ├── ai.js             # Function to call AI endpoint
│       └── sales.js          # Function to get sales data
│
├── pages/
│   ├── _app.js               # Global app entry, wraps in Layout and ToastContainer
│   └── index.js              # Main dashboard page
│
├── styles/
│   ├── global.css            # Global styles
│   └── middleware.js         # (If used) Middleware config for Tailwind or Next
│
├─public/
├── svg/
│   └── searchEmptyIcon.svg   # Static assets like icons
├─.env
├─postcss.config.js
├─postcss.config.js
├─component.json
├─package-lock.json
└─package.json


---

## 🧪 How It Works

- On the homepage, sales data is fetched from the backend using `getDataSales()`.
- The user can ask AI-powered questions from the sticky `AiBar`.
- The AI assistant calls the backend using `askAi()` and displays a response.
- Toasts are shown for both success and error states using `react-toastify`.

---

## 🛠️ Setup & Development

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Create .env file

NEXT_PUBLIC_API_BASE_URL=your-local-api-url

### 3. Run the frontend

```bash
npm run dev
```

---

🧰 Dependencies

Next.js

React

Axios

React Toastify

Tailwind CSS

Lucide React

React Dom

React Icons

React Toastify

---

🔍 What Could Be Improved
Here are some potential improvements and best practices you could apply:

✅ Code Quality
 Use PropTypes or TypeScript for props validation

 Add unit tests with Jest/React Testing Library

 Implement ESLint + Prettier for consistent formatting

🧪 Testing (if required)
 Add test cases for AiBar and Table

 Mock API calls with MSW or Jest mocks