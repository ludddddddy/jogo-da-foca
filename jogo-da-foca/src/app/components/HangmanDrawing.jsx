
"use client";
import React from "react";

export default function HangmanDrawing({ wrongCount = 0 }) {
  
  return (
    <svg viewBox="0 0 120 140" width="220" height="260" aria-hidden>
      {/* gallows */}
      <line x1="10" y1="130" x2="110" y2="130" stroke="#333" strokeWidth="3" />
      <line x1="30" y1="130" x2="30" y2="10" stroke="#333" strokeWidth="3" />
      <line x1="30" y1="10" x2="80" y2="10" stroke="#333" strokeWidth="3" />
      <line x1="80" y1="10" x2="80" y2="25" stroke="#333" strokeWidth="3" />

      {/* head */}
      {wrongCount > 0 && <circle cx="80" cy="35" r="10" stroke="#222" strokeWidth="2" fill="transparent" />}
      {/* body */}
      {wrongCount > 1 && <line x1="80" y1="45" x2="80" y2="80" stroke="#222" strokeWidth="2" />}
      {/* left arm */}
      {wrongCount > 2 && <line x1="80" y1="55" x2="65" y2="70" stroke="#222" strokeWidth="2" />}
      {/* right arm */}
      {wrongCount > 3 && <line x1="80" y1="55" x2="95" y2="70" stroke="#222" strokeWidth="2" />}
      {/* left leg */}
      {wrongCount > 4 && <line x1="80" y1="80" x2="65" y2="105" stroke="#222" strokeWidth="2" />}
      {/* right leg */}
      {wrongCount > 5 && <line x1="80" y1="80" x2="95" y2="105" stroke="#222" strokeWidth="2" />}
    </svg>
  );
}
