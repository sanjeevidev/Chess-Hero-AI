# 🧠♟️ AI Chessboard Narrator
A modern, interactive chessboard with real-time move commentary powered by AI.  
Move any piece on the UI, get instant dramatic or funny narration on the sidebar, and switch board themes or piece colors with a clean, responsive interface.

---

## 🚀 Features

### 🎮 Interactive Chessboard
- Drag & move pieces using **react-chessboard**  
- Valid move logic powered by **chess.js**

### 🗣️ AI-Powered Commentary
- Every move triggers a backend API call
- Commentary generated via **Anthropic Claude** (or plug in any LLM)
- Supports dramatic, funny, or analytical narration

### 🎨 Customisable UI
- Switch board themes
- Switch piece sets
- Clean UI built with **React + Tailwind CSS**

### 🌐 Backend (Python + FastAPI)
- Validates moves
- Generates commentary using Anthropic client
- Simple REST API — easy to extend

---

## 🏛️ Project Architecture
frontend/
├── src/
│ ├── components/ # UI components
│ ├── pages/
│ ├── App.jsx
│ └── main.jsx
├── public/
├── package.json
└── tailwind.config.js

backend/
├── app/
│ ├── main.py # FastAPI entry
│ ├── services.py # AI commentary logic
│ └── schemas.py
├── venv/
├── requirements.txt

---

## 🛠️ Tech Stack

### **Frontend**
- React
- Vite (Rolldown or default bundler)
- Tailwind CSS
- react-chessboard
- axios

### **Backend**
- Python 3.12+
- FastAPI
- Uvicorn
- Anthropic SDK
- python-dotenv

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repo
```bash
git clone https://github.com/YOUR_USERNAME/ai-chessboard-narrator.git
cd ai-chessboard-narrator
```

---

## 🖥️ Frontend Setup

### Install dependencies
```bash
cd frontend
npm install
npm install react-chessboard chess.js
npm install -D tailwindcss postcss autoprefixer
npm install axios
```

### Initialize Tailwind
```bash
npx tailwindcss init -p
```

### Start frontend
```bash
npm run dev
```

---

## 🐍 Backend Setup
### Create virtual environment
```bash
cd backend
python -m venv venv
source venv/Scripts/activate     # Windows
```

### Install dependencies
```bash
pip install -r requirements.txt
```

### Set your API key
Create .env:

```ini
ANTHROPIC_API_KEY=your_key_here
```

### Run backend
```bash
uvicorn app.main:app --reload --port 8000
```

---

## 🔗 API Endpoint
### POST /generate-commentary

Request:

```json
{
  "fen": "current_fen_position",
  "move": "e2e4"
}
```

Response:

```json
{
  "commentary": "The white pawn marches boldly to e4!"
}
```

---

## 📸 UI Preview (Optional)

Add screenshots or GIFs here.

---

### 🗺️ Roadmap

- Add multiplayer mode
- Add opening detection
- Add move accuracy scoring
- Add voice narration (TTS)
- Add game history timeline

---

### 🤝 Contributing

Pull requests are welcome.
For major changes, please open an issue first.

---

### 📄 License

MIT License

---

### ⭐ Support

If you like this project, ⭐ the repo and share it!
