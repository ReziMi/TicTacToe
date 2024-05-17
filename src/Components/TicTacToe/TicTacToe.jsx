import React, { useState, useEffect } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

function TicTacToe() {
  let [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  let [isXNext, setIsXNext] = useState(true);
  let [lock, setLock] = useState(false);
  let [winner, setWinner] = useState(null);

  useEffect(() => {
    checkWin();
  }, [board]);

  const handleClick = (index) => {
    if (lock || board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'x' : 'o';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const checkWin = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setLock(true);
        return;
      }
    }

    if (!board.includes('')) {
      setWinner('Draw');
      setLock(true);
    }
  };

  const resetGame = () => {
    setBoard(['', '', '', '', '', '', '', '', '']);
    setIsXNext(true);
    setLock(false);
    setWinner(null);
  };

  const renderSquare = (value, index) => {
    return (
      <div className="boxes" onClick={() => handleClick(index)}>
        {value && <img src={value === 'x' ? cross_icon : circle_icon} alt={value} />}
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic Tac Toe Game in <span>React</span>
      </h1>
      <div className="board">
        <div className="row1">
          {[0, 1, 2].map((index) => renderSquare(board[index], index))}
        </div>
        <div className="row2">
          {[3, 4, 5].map((index) => renderSquare(board[index], index))}
        </div>
        <div className="row3">
          {[6, 7, 8].map((index) => renderSquare(board[index], index))}
        </div>
      </div>
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
      {winner && <div className="winner">{winner === 'Draw' ? 'It\'s a Draw!' : `Winner: ${winner.toUpperCase()}`}</div>}

    </div>
  );
}

export default TicTacToe;
