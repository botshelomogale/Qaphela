# Qaphela Quick Start (48-Hour Hackathon)

**You have the full codebase. Here's how to go live in 4 hours.**

---

## ✅ What's Already Built

- ✅ Backend detection service (Flask)
- ✅ Frontend app (React + Vite)
- ✅ Scam pattern database (20 real examples)
- ✅ Beautiful warning card UI
- ✅ Educational scam library
- ✅ Responsive design (mobile + desktop)

**Total:** 18 files, ~2500 lines of code ready to go.

---

## 🚀 Step-by-Step Setup (Copy & Paste)

### 1. **Clone to your machine** (or use the files above)

```bash
cd ~/Desktop  # or wherever you want
git clone https://github.com/YOUR-USERNAME/qaphela.git
cd qaphela
```

### 2. **Start Backend**

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

**Expected output:**
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

✅ **Backend is live at http://localhost:5000**

### 3. **Start Frontend** (in a new terminal)

```bash
cd frontend
npm install
npm run dev
```

**Expected output:**
```
  VITE v5.0.0  ready in 234 ms

  ➜  Local:   http://localhost:5173
  ➜  press h + enter to show help
```

✅ **Frontend is live at http://localhost:5173**

### 4. **Test It**

1. Open http://localhost:5173 in your browser
2. Paste this text in the message checker:
   ```
   Hi, we need you for urgent IT work. Click here to apply and get R5000. Fast process. Pm your details.
   ```
3. Click **"Check Message"**
4. You should see:
   - 🚨 **HIGH RISK — Job Scam**
   - Explanation of why it's flagged
   - Red flags detected

✅ **You're live. Demo works.**

---

## 📊 How Detection Works (5 Minutes to Understand)

**File:** `backend/scam_detector.py`

Each scam type has a detector function that scores 0-1:

```python
def _detect_job_scam(self, msg):
    score = 0
    if re.search(r'\b(urgent|immediate)\b', msg):
        score += 0.2  # Found urgency language
    if re.search(r'\b(personal details|bank account)\b', msg):
        score += 0.2  # Found info request
    # ... more patterns
    return min(score, 1.0)  # Cap at 1.0
```

**If score >= 0.7:** HIGH RISK
**If score >= 0.4:** MEDIUM RISK
**Otherwise:** LOW RISK

**That's it.** No ML, no fancy algorithms. Just pattern matching.

---

## 🎬 Live Demo Scenarios (Use These)

### Scenario 1: Job Scam (Will Definitely Trigger)
```
Hi, we need you for urgent IT work. Click here to apply and get R5000. Fast process. Pm your details.
```
**Expected:** 🚨 HIGH RISK — Job Scam

### Scenario 2: Phishing (Will Definitely Trigger)
```
URGENT: Your Capitec account has been locked. Click here to verify your identity immediately.
```
**Expected:** 🚨 HIGH RISK — Phishing

### Scenario 3: Romance Scam (Will Definitely Trigger)
```
Sweetheart, I'm stuck abroad and need R2000 for a ticket home. Please help, I love you.
```
**Expected:** 🚨 HIGH RISK — Romance Scam

### Scenario 4: Safe Message (Will Pass)
```
Hi, just checking in. How are you doing? Let me know if you're free for coffee tomorrow.
```
**Expected:** ✅ LOW RISK — Looks Safe

---

## 🔧 During the 48 Hours

### Hour 1–2: Get Running
- Clone repo, start backend, start frontend ✅

### Hour 2–3: Test & Refine
- Paste 10 real scams, see how detection performs
- Adjust pattern thresholds if needed (in `scam_detector.py`)

### Hour 3–6: Add More Patterns
- Edit `backend/scams.json` to add more scam examples
- Add more regex patterns to `scam_detector.py`

### Hour 6–12: Polish UI
- Run `npm run build` (frontend) to test production build
- Check mobile responsiveness

### Hour 12–24: Deploy
- Backend: Push to Railway or Render
- Frontend: Push to Vercel
- Test live URLs

### Hour 24–48: Demo & Practice
- Record demo video (show 3 scam examples)
- Practice pitch
- Handle edge cases

---

## 📌 Key Files to Know

| File | What to Change |
|------|---|
| `backend/scams.json` | Add more scam examples |
| `backend/scam_detector.py` | Tune detection patterns |
| `frontend/src/components/ScamLibrary.jsx` | Add more educational content |
| `frontend/src/App.css` | Change colors/branding |
| `README.md` | Update project description |

---

## 🚨 Debugging

### "Connection refused" when frontend calls backend?
- Make sure backend is running on http://localhost:5000
- Check `frontend/vite.config.js` proxy settings

### Detection not working?
- Check backend is returning JSON
- Test with curl: `curl -X POST http://localhost:5000/api/detect -H "Content-Type: application/json" -d '{"message":"test"}'`

### Frontend crashes?
- Check browser console (F12)
- Make sure npm install completed
- Try `npm run dev` again

---

## 🎯 Pitch in 30 Seconds

*"We built Truecaller for the scams that actually cost money. Blessing gets a fake job offer, our app flags it before she clicks — explains why it's risky in her language, and teaches her the pattern. No false alarms, no lectures. One moment of protection saves a month's wages."*

---

## 🏆 Winning Moves (Low Effort, High Impact)

1. **Add Zulu warnings** — translate key phrases to Zulu/Xhosa in UI
2. **More scam examples** — 20+ real SA-specific scams in the library
3. **Demo video** — 2-min video showing 3 real scams being detected
4. **Clean UI** — make it beautiful on mobile (this matters to judges)
5. **Confidence scores** — show % likelihood on every result

---

## 📱 Mobile Testing

```bash
# On your phone, go to:
http://YOUR-COMPUTER-IP:5173

# Find your IP:
# Mac/Linux: ifconfig | grep "inet "
# Windows: ipconfig
# Use the 192.168.x.x address
```

---

## 🚀 Deploy (Last 6 Hours)

### Backend to Railway

1. Create account at railway.app
2. Connect GitHub repo
3. Add `PORT` environment variable
4. Deploy

### Frontend to Vercel

1. Create account at vercel.com
2. Import GitHub repo
3. Add `VITE_API_URL` environment variable (your Railway URL)
4. Deploy

**Both auto-deploy on git push.**

---

## ✅ Launch Checklist

- [ ] Backend runs locally (http://localhost:5000/api/health returns 200)
- [ ] Frontend runs locally (http://localhost:5173 loads)
- [ ] Demo scenarios all work (3 job/phishing/romance scams detected)
- [ ] Scam library has 10+ examples
- [ ] Mobile UI looks good
- [ ] Deployed to Railway + Vercel
- [ ] Live demo link ready
- [ ] Pitch practiced (30 seconds)

---

## 💡 Pro Tips

1. **Pattern tuning:** Start strict (high threshold), loosen if missing real scams
2. **Red flags:** Show actual reasons, not vague "risky" messages
3. **Demo:** Record a video in advance — live demos fail
4. **Pitch:** Lead with the problem (Blessing's story), not the tech
5. **Bonus:** Multi-language support impresses judges (even just UI labels in Zulu)

---

**You've got this. Ship it. 🚀**
