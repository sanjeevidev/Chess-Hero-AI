from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import MoveRequest, CommentaryResponse
from app.services import generate_commentary

app = FastAPI(title="Chess AI Commentary API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Chess AI Commentary API is running!"}

@app.post("/commentary", response_model=CommentaryResponse)
async def get_commentary(request: MoveRequest):
    """Generate AI commentary for a chess move."""
    
    commentary = await generate_commentary(
        move=request.move,
        turn=request.turn,
        fen=request.fen
    )
    
    return CommentaryResponse(commentary=commentary)

@app.get("/health")
async def health_check():
    return {"status": "healthy"}