import React from 'react';
import { Chessboard } from 'react-chessboard';

export default function ChessBoardComponent({ 
  position, 
  onDrop, 
  boardTheme 
}) {
  return (
    <div className="aspect-square max-w-2xl mx-auto">
      <Chessboard
        position={position}
        onPieceDrop={onDrop}
        customBoardStyle={{
          borderRadius: '8px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
        }}
        customLightSquareStyle={{ backgroundColor: boardTheme.light }}
        customDarkSquareStyle={{ backgroundColor: boardTheme.dark }}
      />
    </div>
  );
}