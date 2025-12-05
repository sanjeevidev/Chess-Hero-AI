import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import axios from 'axios';
import ChessBoardComponent from './components/ChessBoard';
import CommentaryPanel from './components/CommentaryPanel';
import ThemeSelector, { BOARD_THEMES } from './components/ThemeSelector';

const API_URL = 'http://localhost:8000';

export default function App() {
  const [game, setGame] = useState(new Chess());
  const [commentary, setCommentary] = useState([]);
  const [pieceSet, setPieceSet] = useState('classic');
  const [boardTheme, setBoardTheme] = useState('green');
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('chessTheme');
    if (saved) {
      const { piece, board } = JSON.parse(saved);
      setPieceSet(piece);
      setBoardTheme(board);
    }
    
    setCommentary([{
      id: Date.now(),
      text: "Welcome to AI Chess Commentary! Make your first move!",
      turn: 'intro'
    }]);
  }, []);

  useEffect(() => {
    localStorage.setItem('chessTheme', JSON.stringify({
      piece: pieceSet,
      board: boardTheme
    }));
  }, [pieceSet, boardTheme]);

  const generateCommentary = async (move, fen, turn) => {
    setIsThinking(true);
    
    try {
      const response = await axios.post(`${API_URL}/commentary`, {
        move,
        fen,
        turn,
        theme: {
          pieceSet,
          boardTheme
        }
      });
      
      setCommentary(prev => [...prev, {
        id: Date.now(),
        text: response.data.commentary,
        turn: turn,
        move: move
      }]);
    } catch (error) {
      console.error('Commentary error:', error);
      setCommentary(prev => [...prev, {
        id: Date.now(),
        text: `${turn === 'white' ? 'White' : 'Black'} plays ${move}!`,
        turn: turn,
        move: move
      }]);
    }
    
    setIsThinking(false);
  };

  const onDrop = (sourceSquare, targetSquare) => {
    try {
      const gameCopy = new Chess(game.fen());
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });

      if (move === null) return false;

      setGame(gameCopy);
      
      const turn = move.color === 'w' ? 'white' : 'black';
      generateCommentary(move.san, gameCopy.fen(), turn);

      if (gameCopy.isGameOver()) {
        setTimeout(() => {
          let endMsg = '';
          if (gameCopy.isCheckmate()) {
            endMsg = `Checkmate! ${turn === 'white' ? 'White' : 'Black'} wins!`;
          } else if (gameCopy.isDraw()) {
            endMsg = "It's a draw!";
          }
          
          setCommentary(prev => [...prev, {
            id: Date.now(),
            text: endMsg,
            turn: 'end'
          }]);
        }, 1000);
      }

      return true;
    } catch (e) {
      return false;
    }
  };

  const resetGame = () => {
    setGame(new Chess());
    setCommentary([{
      id: Date.now(),
      text: "Fresh game! Let's go!",
      turn: 'intro'
    }]);
  };

  const currentTheme = BOARD_THEMES.find(t => t.id === boardTheme);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">
          ♟️ Live Chess with AI Commentary
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-xl p-6 shadow-2xl">
              <div className="mb-4 flex justify-between items-center">
                <div className="text-white">
                  <span className="text-sm font-semibold">
                    {game.turn() === 'w' ? '⚪ White' : '⚫ Black'} to move
                  </span>
                </div>
                <button
                  onClick={resetGame}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold"
                >
                  New Game
                </button>
              </div>
              
              <ChessBoardComponent
                position={game.fen()}
                onDrop={onDrop}
                boardTheme={currentTheme}
              />

              <ThemeSelector
                pieceSet={pieceSet}
                setPieceSet={setPieceSet}
                boardTheme={boardTheme}
                setBoardTheme={setBoardTheme}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <CommentaryPanel
              commentary={commentary}
              isThinking={isThinking}
            />
          </div>
        </div>
      </div>
    </div>
  );
}