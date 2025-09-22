
"use client";
import React from "react";
import styles from "./Game.module.css";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Keyboard({ onGuess, usedLetters = [], disabled = false }) {
  return (
    <div className={styles.keyboard}>
      {ALPHABET.map((ch) => {
        const used = usedLetters.includes(ch);
        return (
          <button
            key={ch}
            className={`${styles.key} ${used ? styles.usedKey : ""}`}
            onClick={() => onGuess(ch)}
            disabled={used || disabled}
            aria-pressed={used}
          >
            {ch}
          </button>
        );
      })}
    </div>
  );
}
