import React from 'react';

const PIECE_SETS = [
  { id: 'classic', name: 'Classic' },
  { id: 'neo', name: 'Neo Gloss' },
  { id: 'alpha', name: 'Alpha Minimal' },
  { id: 'glass', name: 'Glass' }
];

const BOARD_THEMES = [
  { id: 'green', name: 'Classic Green', light: '#EEEED2', dark: '#769656' },
  { id: 'blue', name: 'Arctic Blue', light: '#DEE3E6', dark: '#8CA2AD' },
  { id: 'brown', name: 'Vintage Brown', light: '#F0D9B5', dark: '#B58863' },
  { id: 'dark', name: 'Dark Slate', light: '#BDBDBD', dark: '#424242' },
  { id: 'neon', name: 'Neon Purple', light: '#E8D5FF', dark: '#9C27B0' }
];

export default function ThemeSelector({ 
  pieceSet, 
  setPieceSet, 
  boardTheme, 
  setBoardTheme 
}) {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-white text-sm font-semibold mb-2">
          Piece Style
        </label>
        <select
          value={pieceSet}
          onChange={(e) => setPieceSet(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
        >
          {PIECE_SETS.map(set => (
            <option key={set.id} value={set.id}>{set.name}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-white text-sm font-semibold mb-2">
          Board Theme
        </label>
        <select
          value={boardTheme}
          onChange={(e) => setBoardTheme(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
        >
          {BOARD_THEMES.map(theme => (
            <option key={theme.id} value={theme.id}>{theme.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export { BOARD_THEMES };