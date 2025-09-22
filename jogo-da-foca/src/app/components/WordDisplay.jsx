
"use client";
import React from "react";
import styles from "./Game.module.css";

export default function WordDisplay({ word = "", correctLetters = [] }) {
  return (
    <div className={styles.wordContainer} aria-label="Palavra a adivinhar">
      {word.split("").map((letter, idx) => {
        const revealed = correctLetters.includes(letter);
        return (
          <span key={idx} className={styles.letter}>
            {revealed ? letter : "_"}
          </span>
        );
      })}
    </div>
  );
}
