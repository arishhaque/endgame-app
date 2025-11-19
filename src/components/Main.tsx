import Keypad from './Keypad'
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { languages } from "../assets/languages"
import { clsx } from "clsx"

export function Main(props: any) {
  // static variables
  const totalAttempts = props.totalAttempts;
  const word = ['B', 'A', 'N', 'E', 'S', 'O', 'M', 'T'];

  // state variables
  const [keypad, setKeypad] = useState(() => generateAllNewKeypad()); // lazy initialization
  const [clickCount, setClickCount] = useState(0);

  // derived variables
  const correctClickCount = getCorrectClickCount();
  const wrongClickCount = clickCount - correctClickCount;
  const gameWon = correctClickCount === word.length;
  const gameOver = gameWon || wrongClickCount >= totalAttempts;

  useEffect(() => {
    if (gameOver) {
      disableKeypad();
    }
  }, [gameOver]);

  function generateAllNewKeypad() {
    return new Array(26).fill(0).map((_val, idx) => ({
      id: nanoid(),
      value: String.fromCharCode('A'.charCodeAt(0) + idx),
      isSelected: false,
      isCorrect: false,
      isDisabled: false
    }));
  }

  function disableKeypad() {
    setKeypad((prev) => prev.map(keyItem => (
      { ...keyItem,
        isDisabled: true
      }
    )));
  }

  function resetGame() {
    setClickCount(0);
    setKeypad(generateAllNewKeypad());
  }

  function getCorrectClickCount() {
    return keypad.filter((keyItem) => keyItem.isSelected === true && keyItem.isCorrect === true).length
  }

  function handleClick(id: string) {
    setClickCount((prev) => prev + 1);
    setKeypad((prev) => prev.map(item => item.id === id ? { ...item, isSelected: true, isCorrect: word.includes(item.value), isDisabled: true } : item ));
  }

  function isEnteredLetterCorrect(w: string) {
    return keypad.filter((keyItem) => keyItem.value === w && keyItem.isSelected === true && keyItem.isCorrect === true).length > 0
  }

  const enteredCorrectWords = word.map((w) => {
    const styles = {
      height: 40,
      width: 40,
      backgroundColor: "grey",
      borderRadius: 5,
      borderBottom: "black",
      color: "white",
      padding: 5,
    }

    return (
      isEnteredLetterCorrect(w) ? <span key={w} style={styles}>{w}</span> : "__ "
    )
  })

  const languageElements = languages.map((lang: any, idx: number) => {
    const isLanguageLost = idx < wrongClickCount;
    const styles = {
      color: lang.color,
      backgroundColor: lang.backgroundColor
    }
    const langClassName = clsx("language-chips", isLanguageLost ? "lost" : "" );

    return (
      <span key={lang.id} style={styles} className={langClassName}>{lang.name}</span>
    )
  })

  return (
    <>
      <main className="main-container">
        { gameOver &&
          <div className="game-result-container" >
            <p className="game-result-ele" style={{backgroundColor: gameWon ? '#146b37ff' : 'red'}}>{ gameWon ? 'You won!' : 'Game over! Better start learning assembly..' }</p>
          </div>
        }
        <div className="languages-section">{languageElements}</div>
        <div className="entered-words-section">{enteredCorrectWords}</div>
        <div className="keypad-container">
          {keypad.map((keyItem) => (
            <Keypad key={keyItem.id} id={keyItem.id} keyValue={keyItem.value} isSelected={keyItem.isSelected}
              isCorrect={keyItem.isCorrect} isDisabled={keyItem.isDisabled} handleClick={handleClick} />
          ))}
        </div>
        <div className="new-game-section">
         { gameOver && <button className="new-game-button" onClick={resetGame}>New Game</button>}
        </div>
      </main>
    </>
  )

}

export default Main;
