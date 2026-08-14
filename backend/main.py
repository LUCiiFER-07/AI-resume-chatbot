import json
import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from pydantic import BaseModel, Field
from pypdf import PdfReader

load_dotenv()
my_api_key=os.getenv("GROQ_API_KEY")

if not my_api_key:
    raise ValueError("API key kaha hai bhai")

client=Groq(api_key=my_api_key)
model = "openai/gpt-oss-120b"


app = FastAPI()

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://127.0.0.1:3000", "http://10.72.209.193:3000", "http://10.72.209.193:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



#parsing resume

class Experience(BaseModel):
    company: str | None = None
    role: str | None = None
    duration: str | None = None
    description: str | None = None
    skills_used: list[str] = Field(default_factory=list)

class Resume(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None

    total_experience_years: float | None = None

    skills: list[str] = Field(default_factory=list)
    experiences: list[Experience] = Field(default_factory=list)
    education: list[str] = Field(default_factory=list)
    projects: list[str] = Field(default_factory=list)
    certifications: list[str] = Field(default_factory=list)

resume_schema = Resume.model_json_schema()

class ChatRequest(BaseModel):
    question : str

def ask_candidate(question: str, resume: Resume):

    system_prompt = f"""
You are an AI assstant representing a job candidate.

Below is everything you know aboit the candidate.

{resume.model_dump_json(indent = 2)}

Rules:

1. Answer only using this inforamtion.

2. Never hallucinate.

3. If information id unavailable,
say 

"I don't have enough infromation to answer that."

4. Be profesional.

5. Answer as if HR iss interviewing this candidate.
"""

    response = client.chat.completions.create(

        model = model,

        messages = [

            {
                "role":"system",
                "content":system_prompt
            },

            {
                "role":"user",
                "content":question
            }
        ]
    )

    return response.choices[0].message.content

def parse_resume(resume_text):
    system_prompt = f"""
    You are an expert resume parser.

    Extract information from the resume based on its meaning,
    not only based on exact section headings.

    Different resumes may use different headings.

    For example:
    - Experience
    - Professional Experience
    - Work History
    - Employment
    - Internships

    These may all contain relevant experience.

    Skills may also appear in the skills section, work experience,
    internships or projects.

    Return ONLY valid JSON matching this schema:

    {resume_schema}

    Important rules:

    1. Do not invent information.
    2. If a value is not available, return null.
    3. If a list has no information, return an empty list.
    4. Include internships inside experiences.
    5. Extract skills mentioned across the entire resume.
    """
    user_prompt = f"""
    Parse the following resume:

    {resume_text}
    """
    message_system={
        "role" : "system",
        "content" : system_prompt
    }
    message_user={
        "role" : "user",
        "content" : user_prompt
    }
    messages=[message_system, message_user]
    response_format={
        "type": "json_object"
    }
    response=client.chat.completions.create(model=model, messages=messages, response_format=response_format)
    raw_output = response.choices[0].message.content
    data = json.loads(raw_output)
    resume = Resume(**data)
    return resume

#pdf Extraction

def read_pdf(file_path):
    # Resolve path relative to backend directory
    if not Path(file_path).is_absolute():
        file_path = Path(__file__).parent / file_path
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    return text

@app.get("/")
def home():
    return{
        "message" : "Resume Chatbot Backend Running"
    }


@app.get("/health")
def health():
    return{
        "status": "ok"
    }


@app.post("/chat")
def chat(request: ChatRequest):
    resume_text = read_pdf(Path("PRANJAL_resume.pdf"))
    resume = parse_resume(resume_text)
    answer = ask_candidate(request.question, resume)
    return{
        "answer": answer
    }