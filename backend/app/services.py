import os
import httpx
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

async def generate_commentary(move: str, turn: str, fen: str) -> str:
    """Generate AI commentary for a chess move using OpenRouter."""
    
    prompt = f"""You're a witty chess commentator. Generate ONE short, funny, 
    dramatic commentary (max 25 words) for this chess move: {move}. 
    The current player is {turn}. Be creative and entertaining! 
    Just give the commentary, no extra text."""
    
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",  # Optional
        "X-Title": "Chess AI Commentary"  # Optional
    }
    
    payload = {
        "model": "anthropic/claude-opus-4.5:beta",  # OpenRouter model ID
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        "max_tokens": 100,
        "temperature": 0.9
    }
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                OPENROUTER_URL,
                headers=headers,
                json=payload
            )
            response.raise_for_status()
            data = response.json()
            
            # Extract commentary from OpenRouter response
            commentary = data["choices"][0]["message"]["content"]
            return commentary.strip()
            
    except Exception as e:
        print(f"Error generating commentary: {e}")
        # Fallback commentary
        return f"{turn.capitalize()} plays {move}. The tension rises!"