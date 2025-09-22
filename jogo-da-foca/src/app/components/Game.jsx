
"use client";
import React, { useEffect, useState, useCallback } from "react";
import HangmanDrawing from "./HangmanDrawing";
import WordDisplay from "./WordDisplay";
import Keyboard from "./Keyboard";
import styles from "./Game.module.css";
import { WORDS } from "../data/words";

const MAX_WRONG = 6;

function pickRandomWord() {
  const w = WORDS[Math.floor(Math.random() * WORDS.length)];
  return w.toUpperCase();
}

export default function Game() {
  const [word, setWord] = useState(() => pickRandomWord());
  const [correct, setCorrect] = useState([]); // letras corretas
  const [wrong, setWrong] = useState([]); // letras erradas

  const allUsed = [...new Set([...correct, ...wrong])];

  const resetGame = useCallback(() => {
    setWord(pickRandomWord());
    setCorrect([]);
    setWrong([]);
  }, []);

  const handleGuess = useCallback(
    (letter) => {
      letter = letter.toUpperCase();
      if (allUsed.includes(letter)) return;
      if (word.includes(letter)) {
        setCorrect((prev) => [...prev, letter]);
      } else {
        setWrong((prev) => [...prev, letter]);
      }
    },
    [word, allUsed]
  );

  
  useEffect(() => {
    function onKey(e) {
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        handleGuess(key);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleGuess]);

  const uniqueLetters = [...new Set(word.split(""))];
  const isWinner = uniqueLetters.every((l) => correct.includes(l));
  const isLoser = wrong.length >= MAX_WRONG;
  const gameOver = isWinner || isLoser;

  return (
    <div className={styles.gameWrap}>
      <header className={styles.header}>
        <h1>Jogo da Forca</h1>
        <button className={styles.restart} onClick={resetGame}>Reiniciar</button>
      </header>

      <div className={styles.main}>
        <div className={styles.left}>
          <HangmanDrawing wrongCount={wrong.length} />
        </div>

        <div className={styles.right}>
          <WordDisplay word={word} correctLetters={correct} />

          <div className={styles.info}>
            <p>Tentativas restantes: <strong>{MAX_WRONG - wrong.length}</strong></p>
            <p>Letras corretas: {correct.length ? correct.join(", ") : "—"}</p>
            <p className={styles.wrongList}>Letras erradas: {wrong.length ? wrong.join(", ") : "—"}</p>
          </div>

          <Keyboard onGuess={handleGuess} usedLetters={allUsed} disabled={gameOver} />

          {gameOver && (
            <div className={styles.overlay}>
              <div className={styles.resultBox}>
                {isWinner ? (
                  <>
                    <h2>Parabéns — você venceu! 🎉</h2>
                    <p>A palavra era <strong>{word}</strong></p>
                  </>
                ) : (
                  <>
                    <h2>Fim de jogo — você perdeu 💀</h2>
                    <p>A palavra era <strong>{word}</strong></p>
                  </>
                )}
                <div className={styles.actions}>
                  <button className={styles.primary} onClick={resetGame}>Jogar novamente</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className={styles.footer}>
        <small>Dica: use o teclado físico ou clique nas letras.</small>
      </footer>
    </div>
  );
}
