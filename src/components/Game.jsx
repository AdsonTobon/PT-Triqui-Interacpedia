import React, { useState } from "react";
import Board from "./Board";
import { calculateWinner } from "./helper";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import {Howl} from 'howler';


const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "⍣" : "⌬";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1); // Creando una copia del array por medio de slice
    const current = historyPoint[stepNumber];
    const squares = [...current]; // propagacion del estado actual con el nuevo array

    // retornar si esta ganada u ocupada
    if (winner || squares[i]) return;

    // seleccion del cuadrado
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);

    soundPlay()
  };

  const soundPlay =()=>{
      const sound = new Howl ({
          src:['https://www.soundjay.com/misc/sounds/coin-drop-4.mp3'],
          html5:true
      })
      sound.play();
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Ir a la Jugada #${move}` : "Empezar de nuevo";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  //Realizar en H3 un alert para el ganador
  return (
    <div className="container-game">
      <div className="container-triqui">
        <h1>Lest Go - Triqui ;)</h1>
        <Board squares={history[stepNumber]} onClick={handleClick} />
      </div>

      <div className="info-wrapper">
        <div>
          <h3>Historial Jugadas</h3>
          {renderMoves()}
        </div>
        <h3>
          {winner ? (
            <Alert severity="success">
              <AlertTitle>Ganador {winner}</AlertTitle>
              Eres el Ganador de este juego —{" "}
              <strong>Sigue asi campeón!</strong>
            </Alert>
          ) : (
            "Siguiente Jugador: " + xO
          )}
        </h3>
      </div>
    </div>
  );
};

export default Game;
