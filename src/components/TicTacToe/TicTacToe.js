import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle, pure, withState, withHandlers } from "recompose";
import { setGameHistory, setTurnNumber, setCurrentPlayer } from "store/actions";
import * as constants from "../../constants/tictactoe";
// TODO: A loader
import TicTacToeBoard from "./TicTacToeBoard";
import "./TicTacToe.scss";

const onMouseDownHandler = () => {
  let gameBoardElem = document.getElementsByClassName("game");
  if (gameBoardElem.length) {
    gameBoardElem[0].classList.add("mouse-navigation");
    gameBoardElem[0].classList.remove("kbd-navigation");
  }
};

const onKeyDownHandler = (evt) => {
  if (evt.keyCode === 9) {
    let gameBoardElem = document.getElementsByClassName("game");
    if (gameBoardElem.length) {
      gameBoardElem.classList.add("kbd-navigation");
      gameBoardElem.classList.remove("mouse-navigation");
    }
  }
};

const onClickHandler = (evt) => {
  if (evt.target.tagName == "A" && evt.target.getAttribute("href") == "#") {
    evt.preventDefault();
  }
};

const mapDispatchToProps = {
  setGameHistory,
  setTurnNumber,
  setCurrentPlayer
};

const enhance = compose(
  pure,
  connect(
    (state) => ({
      history: state.ui.game.history,
      turnNumber: state.ui.game.turnNumber,
      currentPlayer: state.ui.game.currentPlayer
    }),
    mapDispatchToProps
  ),
  lifecycle({
    componentWillMount() {
      // subscribe to eventlisteners
      window.addEventListener("mousedown", onMouseDownHandler);
      window.addEventListener("keydown", onKeyDownHandler);
      window.addEventListener("click", onClickHandler);
    },
    componentDidMount() {},
    componentWillUnmount() {
      // remove eventlisteners
      window.removeEventListener("mousedown", onMouseDownHandler);
      window.removeEventListener("keydown", onKeyDownHandler);
      window.removeEventListener("click", onClickHandler);
    },
    shouldComponentUpdate(nextProps) {
      if (this.props !== nextProps) {
        // window.dispatchEvent(new CustomEvent("event-name", { detail: { nextProps } }));
        return true;
      }
    }
  }),
  withState("aLocalProp", "setLocalProp", null),
  withHandlers({
    onsetLocalProp: ({ setLocalProp }) => (obj) =>
      setLocalProp(() => {
        return obj;
      })
  })
);

/**
  This algorithm is checking all the possible ways to score
  three in a row and seeing if 3 in row exists.
**/
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export const TicTacToe = ({
  history,
  turnNumber,
  currentPlayer,
  setGameHistory,
  setTurnNumber,
  setCurrentPlayer
  //intl
}) => {
  const player1 = constants.PLAYER_1;
  const player2 = constants.PLAYER_2;

  let handleClick = (i) => {
    history = history.slice(0, turnNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = currentPlayer;
    setGameHistory(history.concat([{ squares }]));
    setTurnNumber(history.length);
    setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
  };

  let jumpTo = (step) => {
    setTurnNumber(step);
    setCurrentPlayer(step % 2 === 0 ? player2 : player1);
  };

  const current = history[turnNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + currentPlayer;
  }

  return (
    <div className="game">
      <div className="game-board">
        <TicTacToeBoard
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

//export default injectIntl(enhance(TicTacToe));
export default enhance(TicTacToe);
