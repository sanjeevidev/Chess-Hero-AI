from pydantic import BaseModel
from typing import Dict

class ThemeData(BaseModel):
    pieceSet: str
    boardTheme: str

class MoveRequest(BaseModel):
    move: str
    fen: str
    turn: str
    theme: ThemeData

class CommentaryResponse(BaseModel):
    commentary: str