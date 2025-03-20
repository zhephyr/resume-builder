import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Union
import openai
import logging

logger = logging.getLogger(__name__)
console_handler = logging.StreamHandler()
logger.addHandler(console_handler)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
console_handler.setFormatter(formatter)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",  "http://127.0.0.1:3000"],  # Allow only specified origins
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

openai.api_key = os.getenv("OPENAI_API_KEY")

class Workplace(BaseModel):
    jobTitle: str
    company: str
    location: str
    startDate: str
    endDate: Union[str, None]
    responsibilities: str
    

class ResumeRequest(BaseModel):
    firstName: str
    lastName: str
    email: str
    phone: str
    skills: Optional[list[str]]
    workHistory: list[Workplace]
    
    
class CoverLetterRequest(BaseModel):
    jobDesc: str
    resumeText: str
    
@app.post("/generate-resume")
def generate_resume(request: ResumeRequest):
    workhistorystring = ""
    for workplace in request.workHistory:
        workhistorystring += f"""
            Position: {workplace.jobTitle} Company: {workplace.company} Location: {workplace.location}
            I started on {workplace.startDate}{f' and ended on {workplace.endDate}' if workplace.endDate else ' and still work here.'}
            {workplace.responsibilities}
            """
        
    prompt = f"""My name is {request.firstName} {request.lastName} and I need a resume.
        My contact information is: {request.email} and {request.phone}.
        I have these skill: {request.skills}.
        And my work history is:
        {workhistorystring}
        
        Please do not add any sections that I do not have information for."""
    
    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[{"role":"system", "content": "You are a resume writing assistant"},
                  {"role":"user", "content":prompt}]
    )
    
    logging.info(response.choices[0].message.content)
    return {"resume_text": response.choices[0].message.content}

@app.post("/generate-cover-letter")
def generate_cover_letter(request: CoverLetterRequest):
# TODO: Implement this function
    return