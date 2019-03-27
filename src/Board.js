import React, { Component } from 'react';
import Square from './Square.js';
import './index.css';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
          squares: Array(9).fill(null),
          xIsNext: true,
          turn: 1,
        };
    }

    handleClick(i) {
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
          turn: this.state.turn +1
      //when user clicks, switches state(X or O) of board, also adds 1 to turn #
      });
    }

    renderSquare(i) {
        return <Square 
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)} />;
        // runs handleClick function from above ^^
        // renderSquare renders Square.js - if button is clicked, calls onClick event 
    }

    restartGame(event) {
      this.setState({
        squares: Array(9).fill(null),
        xIsNext: true,
        turn: 1});
        // function makes sure any setState is working
        // restartGame function on button under tic tac toe game
    }
    
    render() {
      const winner = calculateWinner(this.state.squares);
      //calling function calcWin to see if it returned a possible winner
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else if (this.state.turn === 10 && !winner) {
        status = "Draw, start again?"
      // if it's turn 10 (last turn) and there isn't a winner 
      }
        else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      // if no winner, alternates between X & O
      }
      
      return (
        <div className="center">
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <button className="button" value="reset" onClick={this.restartGame.bind(this)} >Restart Game</button>
        </div>
          );
        }
      }


  export default Board;

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    //alternative ways of winning
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    //runs loop, identifies if lines[i] matches any possible way of winning
    }
    return null;
    //if no match, returns null
  }