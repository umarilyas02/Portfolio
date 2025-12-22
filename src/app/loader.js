import React from 'react';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-black to-slate-900 gap-8">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div 
          className="absolute w-8 h-8 rounded-full bg-linear-to-br from-indigo-400 to-indigo-600 shadow-lg shadow-indigo-500/50 animate-orbit"
          style={{ '--delay': '0s' }}
        ></div>
        <div 
          className="absolute w-8 h-8 rounded-full bg-linear-to-br from-rose-400 to-rose-700 shadow-lg shadow-rose-500/50 animate-orbit"
          style={{ '--delay': '0.66s' }}
        ></div>
        <div 
          className="absolute w-8 h-8 rounded-full bg-linear-to-br from-indigo-400 to-indigo-600 shadow-lg shadow-indigo-500/50 animate-orbit"
          style={{ '--delay': '1.32s' }}
        ></div>
      </div>
      <p className="text-sm text-slate-400 letter-spacing tracking-widest animate-pulse font-medium">
        Loading
      </p>
    </div>
  );
}
