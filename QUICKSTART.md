# QUICK START - AI Resume Chatbot

## 🚀 Start Backend (Terminal 1)

```bash
cd c:\Users\pranj\padho-ai-engineer\week2\personalAI
uv run python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

**Expected Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

## 🌐 Open Frontend (Browser)

Open this file in your web browser:
```
c:\Users\pranj\padho-ai-engineer\week2\personalAI\frontend\index_standalone.html
```

**OR** Direct path:
```
file:///c:/Users/pranj/padho-ai-engineer/week2/personalAI/frontend/index_standalone.html
```

## ✅ Test It

1. Click a suggested question or type your own
2. Watch the AI respond
3. Continue the conversation
4. Click "New Chat" to reset

## 📋 What You See

- **Header**: "AI Resume Assistant" with Online status
- **Welcome**: Suggested questions to ask
- **Chat**: Your questions in blue (right), AI answers in gray (left)
- **Input**: Type at bottom, press Enter to send
- **New Chat**: Button to start over

## 🔧 Environment Setup

Make sure `backend/.env` contains:
```
GROQ_API_KEY=your_groq_api_key_here
```

And `PRANJAL_resume.pdf` exists in `backend/` folder.

## ⚡ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Enter | Send message |
| Shift+Enter | New line (while typing) |
| F12 | Open developer console (for debugging) |

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Connection refused" | Backend not running → start it (see above) |
| No responses | Check GROQ_API_KEY in backend/.env |
| Timeout error | Groq API is slow → retry or wait |
| Blank page | Refresh browser (Ctrl+R) |
| Chat shows error | Check backend console for details |

## 📁 Important Files

| File | Purpose |
|------|---------|
| `frontend/index_standalone.html` | **Main frontend - open this in browser** |
| `backend/main.py` | FastAPI backend |
| `backend/PRANJAL_resume.pdf` | Your resume data |
| `backend/.env` | Your API keys (don't commit!) |

## 📚 Documentation

- `IMPLEMENTATION_COMPLETE.md` - Full implementation guide
- `README_FRONTEND.md` - Detailed setup guide
- Backend logs - Terminal output from backend

## ✨ Features

✅ Modern dark UI  
✅ Real-time chat  
✅ Loading indicators  
✅ Error handling  
✅ Mobile responsive  
✅ Secure (no API keys exposed)  

## 🎯 Next (Optional)

- Switch to React version (when npm finishes)
- Deploy to production
- Add conversation history
- Stream responses
- Add more features

---

**Ready to chat? Start the backend and open `index_standalone.html`!** 🎉
