import React, { useEffect, useRef } from 'react';

export default function CommentaryPanel({ commentary, isThinking }) {
  const commentaryRef = useRef(null);

  useEffect(() => {
    if (commentaryRef.current) {
      commentaryRef.current.scrollTop = commentaryRef.current.scrollHeight;
    }
  }, [commentary]);

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-2xl h-full flex flex-col">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
        <span className="mr-2">💬</span> AI Commentary
      </h2>
      
      <div
        ref={commentaryRef}
        className="flex-1 overflow-y-auto space-y-3 pr-2"
        style={{ maxHeight: '600px' }}
      >
        {commentary.map((comment) => (
          <div
            key={comment.id}
            className={`animate-slide-in ${
              comment.turn === 'intro' || comment.turn === 'end'
                ? 'text-center'
                : comment.turn === 'white'
                ? 'text-left'
                : 'text-right'
            }`}
          >
            <div
              className={`inline-block max-w-[85%] p-3 rounded-lg ${
                comment.turn === 'intro'
                  ? 'bg-blue-600 text-white'
                  : comment.turn === 'end'
                  ? 'bg-red-600 text-white'
                  : comment.turn === 'white'
                  ? 'bg-slate-700 text-white'
                  : 'bg-blue-700 text-white'
              }`}
            >
              {comment.move && (
                <div className="text-xs font-bold mb-1 opacity-75">
                  {comment.move}
                </div>
              )}
              <div className="text-sm">{comment.text}</div>
            </div>
          </div>
        ))}
        
        {isThinking && (
          <div className="text-center">
            <div className="inline-block bg-slate-700 text-white p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" 
                     style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" 
                     style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}