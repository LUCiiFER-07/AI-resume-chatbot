# AI Resume Chatbot - Frontend & Backend Setup

This is a professional AI-powered chatbot that answers questions about my resume and professional background. The application consists of:

- **Backend**: FastAPI with Groq AI integration
- **Frontend**: React + Vite with a modern chat UI

## Architecture

```
Browser (React Frontend)
    ↓ HTTP POST /chat
FastAPI Backend
    ↓ Groq API Call
Groq LLM (gpt-oss-120b)
```

## Features

✅ Modern, responsive chat interface
✅ Real-time streaming chat with the AI
✅ Welcome screen with suggested questions
✅ Message history during session
✅ Loading/typing indicators
✅ Error handling and offline detection
✅ Mobile-friendly responsive design
✅ Professional dark UI aesthetic

## Backend Setup

### Requirements

- Python 3.10+
- FastAPI
- Groq API key (set in `.env`)
- PyPDF for resume parsing
- python-docx for document handling

### Installation

1. Navigate to the backend directory:
   ```bash
   cd week2/personalAI
   ```

2. Install dependencies (using `uv`):
   ```bash
   uv sync
   ```

   Or with pip:
   ```bash
   pip install -r backend/requirements.txt
   ```

3. Create a `.env` file in the backend directory with your Groq API key:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. Make sure your resume file exists:
   ```
   backend/PRANJAL_resume.pdf
   ```

### Running the Backend

From the `week2/personalAI` directory:

```bash
uv run python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

Or without `uv`:

```bash
cd backend
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The backend will start at **http://127.0.0.1:8000**

### Backend Endpoints

- `GET /` - Health check
- `GET /health` - Health status
- `POST /chat` - Send a question to the chatbot
  - Request: `{"question": "Your question here"}`
  - Response: `{"answer": "AI-generated response"}`

## Frontend Setup

### Requirements

- Node.js 16+
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd week2/personalAI/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. The `.env` file is pre-configured to point to the backend:
   ```
   VITE_API_URL=http://localhost:8000
   ```

   If your backend runs on a different URL, update `.env`:
   ```
   VITE_API_URL=http://your-backend-url:port
   ```

### Running the Frontend

From the `frontend` directory:

```bash
npm run dev
```

The frontend will start at **http://localhost:5173**

### Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

## Running Both Together

### Terminal 1 - Backend

```bash
cd week2/personalAI
uv run python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

### Terminal 2 - Frontend

```bash
cd week2/personalAI/frontend
npm run dev
```

Then open **http://localhost:5173** in your browser.

## Testing the Application

### Test Case 1: Technical Skills

**Question**: "What are your technical skills?"

**Expected**: Real response from backend based on resume, listing technical skills and programming languages.

### Test Case 2: Projects

**Question**: "Tell me about your projects"

**Expected**: Detailed response about projects mentioned in the resume.

### Test Case 3: Education

**Question**: "What is your educational background?"

**Expected**: Response about education, degrees, and institutions from the resume.

### Test Case 4: Unknown Information

**Question**: "What was your salary at your previous company?"

**Expected**: The AI should respond with "I don't have enough information to answer that" rather than making up information.

### Test Case 5: Backend Connection Error

1. Stop the backend server
2. Try to send a message in the frontend
3. **Expected**: Error message appears: "Unable to connect to the AI assistant. Please make sure the backend is running."

### Test Case 6: Empty Input

**Action**: Leave the input box empty and try to send
**Expected**: Send button is disabled, no request is made

## Project Structure

```
week2/personalAI/
│
├── backend/
│   ├── main.py                    # FastAPI app, chat endpoint
│   ├── PRANJAL_resume.pdf         # Resume file
│   ├── pyproject.toml             # Dependencies
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx         # App header with status
│   │   │   ├── ChatWindow.jsx     # Message display area
│   │   │   ├── ChatInput.jsx      # Message input & send
│   │   │   ├── MessageBubble.jsx  # Individual message
│   │   │   ├── WelcomeScreen.jsx  # Initial welcome UI
│   │   │   ├── TypingIndicator.jsx # Loading state
│   │   │   └── *.css              # Component styles
│   │   │
│   │   ├── services/
│   │   │   └── api.js             # Backend API client
│   │   │
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Global styles
│   │
│   ├── package.json               # npm dependencies
│   ├── vite.config.js             # Vite configuration
│   ├── index.html                 # HTML entry point
│   ├── .env                       # Backend URL config
│   └── .env.example               # Example env file
│
├── pyproject.toml                 # Project metadata
├── uv.lock                        # Lock file
└── README.md                      # This file
```

## Backend Changes Made

### Fixed Issues

1. **Removed unnecessary import**: `from unittest.mock import Base`
2. **Fixed mutable Pydantic defaults**: Changed from `[]` to `Field(default_factory=list)` for:
   - `skills`
   - `experiences`
   - `education`
   - `projects`
   - `certifications`
   - `skills_used` (in Experience model)

3. **Added CORS Support**: Added FastAPI CORS middleware to allow requests from frontend:
   - Allows: `http://localhost:5173`, `http://localhost:3000`, `http://127.0.0.1:5173`
   - Production: Modify to allow only your domain

4. **Added `/health` endpoint**: New endpoint for frontend to check backend status

### Backend Architecture Notes

⚠️ **Performance Note**: The current `/chat` endpoint parses the resume on every request. For production:

```python
# Future optimization idea:
# Parse resume once at startup and cache it
CACHED_RESUME = None

@app.on_event("startup")
async def startup():
    global CACHED_RESUME
    resume_text = read_pdf(Path("PRANJAL_resume.pdf"))
    CACHED_RESUME = parse_resume(resume_text)

@app.post("/chat")
def chat(request: ChatRequest):
    answer = ask_candidate(request.question, CACHED_RESUME)
    return {"answer": answer}
```

This would eliminate redundant LLM calls for resume parsing.

## Frontend Features

### Components

1. **Header**: Shows app title and online/offline status
2. **ChatWindow**: Displays message history with auto-scrolling
3. **MessageBubble**: Individual message with different styles for user/assistant
4. **ChatInput**: Text area with send button, Shift+Enter for new lines
5. **WelcomeScreen**: Initial greeting with suggested questions
6. **TypingIndicator**: Animated loading state while AI is processing

### Styling

- **Dark modern aesthetic**: Professional dark blue/slate color scheme
- **Responsive design**: Works on desktop (1920px+), laptop (1366px+), tablet (768px), mobile (375px+)
- **Smooth animations**: Slide-in messages, pulsing status indicator
- **Accessibility**: Keyboard navigation, focus states, semantic HTML, ARIA labels

### State Management

- **Messages**: Array of `{role, content}` objects
- **Loading state**: Shows typing indicator while waiting for response
- **Error state**: Displays friendly error messages
- **Backend status**: Checks `/health` endpoint every 30 seconds

## Security

🔒 **API Key Protection**:
- Groq API key is **ONLY** stored in backend `.env`
- Frontend never has access to the API key
- All AI requests go through FastAPI backend
- Environment variables are not exposed to the browser

## Environment Variables

### Backend (.env)
```
GROQ_API_KEY=your_api_key_here
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

## Troubleshooting

### Issue: "Unable to connect to the AI assistant"

**Solution**: Make sure the backend is running on `http://127.0.0.1:8000`

```bash
cd week2/personalAI
uv run python -m uvicorn backend.main:app --reload
```

### Issue: Frontend not loading

**Solution**: Check that npm packages are installed and Vite is running:

```bash
cd week2/personalAI/frontend
npm install
npm run dev
```

### Issue: CORS errors

**Solution**: Check backend CORS configuration in `backend/main.py`. If frontend is on different URL, add it to `allow_origins`:

```python
allow_origins=["http://your-frontend-url:port"]
```

### Issue: API returns 500 error

**Solution**: Check backend console for error details. Common issues:
- Resume file not found: Make sure `PRANJAL_resume.pdf` exists in `backend/`
- Missing API key: Set `GROQ_API_KEY` in `.env`
- Invalid API key: Verify Groq API key is correct

## Future Improvements

### Performance
- [ ] Cache parsed resume at startup (eliminate 10x LLM calls)
- [ ] Add request rate limiting
- [ ] Stream AI responses for better UX

### Features
- [ ] Persistent chat history (localStorage or database)
- [ ] Dark/light theme toggle
- [ ] Export conversation as PDF
- [ ] Feedback mechanism for AI responses
- [ ] Multi-resume support
- [ ] Chat analytics

### Infrastructure
- [ ] Docker containerization
- [ ] Deploy backend to cloud (AWS, Heroku, etc.)
- [ ] Deploy frontend to Vercel or Netlify
- [ ] CI/CD pipeline
- [ ] Unit and integration tests

## Questions or Issues?

If you encounter any issues during setup or testing, check:

1. Backend is running: `curl http://127.0.0.1:8000/health`
2. Frontend can access backend: Check browser DevTools Network tab
3. Resume file exists: `backend/PRANJAL_resume.pdf`
4. API key is set: `.env` file in backend directory

## License

This project is part of the AI Engineer learning curriculum.
