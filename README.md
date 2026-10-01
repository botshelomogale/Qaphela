# Qaphela - Scam Detection Platform

**Qaphela** (isiZulu: "Beware") is a Truecaller-like scam detection platform built for vulnerable users. It detects suspicious messages and transactions before they cost someone a month's wages.

**Challenge:** Mukuru SheHacks - Challenge C: Scam Shield

---

## 🎯 The Problem

Blessing just arrived in a new city looking for work. Scammers know it:
- Fake job offers ("Click here for R5000/week")
- Phishing ("Verify your Capitec account")
- Romance scams ("I need R2000 for a ticket home")
- Fake offers ("You've won R100,000!")

**One moment of misplaced trust costs her a month's wages.**

---

## 🛡️ The Solution

Qaphela screens incoming messages and transactions for scam patterns. It:
1. **Detects suspicious messages** using rule-based pattern matching
2. **Explains why** it flagged something (not just "risky/safe")
3. **Educates users** about common scam patterns
4. **Works offline** and on low-bandwidth connections

---

## 🏗️ Architecture

### Backend (Flask + Python)
- Pattern-based scam detector (regex + keyword matching)
- 5 scam type classifiers:
  - Job scams
  - Phishing
  - Romance scams
  - Fake offers
  - Money request scams
- Risk scoring (high/medium/low)
- Returns JSON: `{ risk, reason, type, confidence, red_flags }`

### Frontend (React + Vite)
- Message checker (paste & check)
- Real-time scam results with explanations
- Scam library (learn about tricks)
- Mobile-friendly UI

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11+ (backend)
- Node.js 16+ (frontend)
- Git

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

pip install -r requirements.txt

python app.py
```

Backend runs at `http://localhost:5000`

**Test it:**
```bash
curl -X POST http://localhost:5000/api/detect \
  -H "Content-Type: application/json" \
  -d '{"message":"Hi, we need you for urgent IT work. Click here to apply and get R5000."}'
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` (or `3000` if Vite redirects)

**The app will call backend at `http://localhost:5000/api/detect`**

---

## 📊 Scam Detection Patterns

### Job Scams
Red flags:
- Urgency language ("click now", "urgent")
- Asking for personal details upfront
- Upfront payment requests
- No company name or verification

### Phishing
Red flags:
- Fake bank message
- "Verify your account"
- Suspicious links
- Urgent action required

### Romance Scams
Red flags:
- Quick emotional connection
- Money requests
- Crypto/Bitcoin requests
- Isolation tactics

### Fake Offers
Red flags:
- "You've won" or "Claim prize"
- Limited time offers
- Asking for personal info
- Too good to be true

### Money Request Scams
Red flags:
- Urgent money request
- Western Union/Bitcoin payment
- From unknown sender
- Pressure to keep secret

---

## 📁 Project Structure

```
qaphela/
├── backend/
│   ├── app.py                 # Flask app entry point
│   ├── scam_detector.py       # Detection logic
│   ├── scams.json            # Pattern database
│   ├── requirements.txt       # Python dependencies
│   ├── .env                  # Environment variables
│   └── Dockerfile            # Docker configuration
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main app component
│   │   ├── App.css           # App styles
│   │   ├── main.jsx          # React entry
│   │   ├── index.css         # Global styles
│   │   └── components/
│   │       ├── MessageChecker.jsx      # Input component
│   │       ├── MessageChecker.css
│   │       ├── WarningCard.jsx        # Results display
│   │       ├── WarningCard.css
│   │       ├── ScamLibrary.jsx        # Educational
│   │       └── ScamLibrary.css
│   ├── index.html            # HTML template
│   ├── vite.config.js        # Vite config
│   └── package.json          # npm dependencies
│
├── README.md                 # This file
└── .gitignore               # Git ignore
```

---

## 🎬 Demo Scenarios

### Scenario 1: Job Scam
**Input:** "Hi, we need you for urgent IT work. Click here to apply and get R5000. Fast process. Pm your details."

**Output:**
```json
{
  "risk": "high",
  "type": "job_scam",
  "reason": "Red flags: No real company name, urgency language, asking for personal details or upfront payment.",
  "confidence": 0.85,
  "red_flags": [
    "Urgency language detected",
    "Asking for personal information"
  ]
}
```

### Scenario 2: Phishing
**Input:** "URGENT: Your Capitec account has been locked. Click here to verify your identity immediately."

**Output:**
```json
{
  "risk": "high",
  "type": "phishing",
  "reason": "Red flags: Fake bank message, asking to verify/confirm account, suspicious links.",
  "confidence": 0.88,
  "red_flags": [
    "Urgency language detected",
    "Asking for personal information",
    "Contains suspicious link or URL"
  ]
}
```

---

## 🌐 Deployment

### Backend (Railway or Render)

```bash
# Push to GitHub
git push origin main

# Railway: Connect your GitHub repo
# Render: Connect your GitHub repo
```

Set environment variables:
- `PORT` (default: 5000)
- `FLASK_ENV` (production)

### Frontend (Vercel)

```bash
# Vercel automatically deploys from GitHub
# Set environment variable:
# VITE_API_URL=https://your-backend-url.railway.app
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
python -m pytest tests/
```

### Manual Testing

```bash
# Start backend
cd backend
python app.py

# In another terminal, test
curl -X POST http://localhost:5000/api/detect \
  -H "Content-Type: application/json" \
  -d '{"message":"Test message here"}'
```

---

## 🛠️ Key Technologies

**Backend:**
- Flask (lightweight web framework)
- Python 3.11
- Regex pattern matching
- JSON configuration

**Frontend:**
- React 18
- Vite (fast build tool)
- CSS3 (responsive design)
- Axios (HTTP client)

**Deployment:**
- Docker (containerization)
- Railway/Render (backend)
- Vercel (frontend)

---

## 📈 Performance

- **Detection latency:** < 100ms
- **Message parsing:** < 50ms
- **Confidence scoring:** Rule-based (no ML overhead)
- **Accuracy:** High precision, low false positives

---

## 🎓 Educational Content

Qaphela includes a "Learn the Scams" library with:
- 15+ real scam examples
- Red flag patterns
- What to do if targeted
- Where to report

---

## 🤝 Contributing

This is a hackathon project. To improve:

1. Add more scam patterns to `backend/scams.json`
2. Tune detection thresholds in `scam_detector.py`
3. Improve UI/UX in `frontend/src/components/`
4. Add multi-language support (Zulu, Xhosa, Sotho, Shona)

---

## 📝 License

This project is built for Mukuru SheHacks 2026. No formal license applied.

---

## 🚨 Support & Reporting

**Report scams:**
- South Africa: SMS FRAUD to 32833 or contact your bank
- Email/Phishing: ReportPhishing@fnb.co.za
- WhatsApp/Messaging: Block and report through app

**Get help:**
- Contact Qaphela team
- Report bugs on GitHub Issues

---

## 👥 Team

Built with ❤️ for the Mukuru SheHacks Challenge C.

---

**Remember:** Qaphela helps protect vulnerable users. Use responsibly. Beware the scam before it costs you.
