function Gameboard() {
  const row = 3;
  const col = 3;
  const board = [];

  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < col; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const dropToken = (row, col, player) => {
    const targetCell = board[row][col];
    if (targetCell.isAllocated()) {
      return;
    } else {
      targetCell.addToken(player);
    }
  };

  const printBoard = () => {
    for (let i = 0; i < row; i++) {
      const rowValues = board[i].map((cell) => cell.getValue());
      console.log(rowValues);
    }
  };

  return { getBoard, dropToken, printBoard };
}

// The status of a cell:
// 0: Not allocated
// 1: Allocated by player1
// 2: Allocated by player2
function Cell() {
  let status = 0;

  const isAllocated = () => {
    Boolean(status);
  };

  const addToken = (player) => {
    status = player;
  };

  const getValue = () => {
    if (status === 0) return " ";
    else return status === 1 ? "O" : "X";
  };

  const getStatus = () => status;

  return { isAllocated, addToken, getValue, getStatus };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Playe Two"
) {
  const gameBoard = Gameboard();

  const players = [
    {
      name: playerOneName,
      token: 1,
    },
    {
      name: playerTwoName,
      token: 2,
    },
  ];

  let activePlayer = players[0];

  const isWinner = (player) => {
    const board = gameBoard.getBoard();
    const boardRow = board.length;
    const boardCol = board[0].length;
    const playerWinCondition = player.toString().repeat(3);
    // Horizontal
    for (let i = 0; i < boardRow; i++) {
      const rowValues = board[i].map((cell) => cell.getStatus()).join("");
      if (rowValues == playerWinCondition) return true;
    }
    // Vertical
    for (let j = 0; j < boardCol; j++) {
      const colValues = [];
      for (let i = 0; i < boardRow; i++) {
        colValues.push(board[i][j].getStatus());
      }
      if (colValues.join("") == playerWinCondition) return true;
    }
    // Diagonal
    const diagonalValues1 = [];
    const diagonalValues2 = [];
    for (let i = 0; i < boardRow; i++) {
      diagonalValues1.push(board[i][i].getStatus());
    }
    for (let j = boardRow - 1; j >= 0; j--) {
      diagonalValues2.push(board[j][j].getStatus());
    }
    if (
      diagonalValues1.join("") == playerWinCondition ||
      diagonalValues2.join("") == playerWinCondition
    )
      return true;

    return false;
  };

  const switchPlayerTurn = () =>
    (activePlayer = activePlayer === players[0] ? players[1] : players[0]);

  const playRound = (row, col) => {
    console.log(`Dropping ${activePlayer.name}'s token into (${row}, ${col}) `);
    gameBoard.dropToken(row, col, activePlayer.token);

    gameBoard.printBoard();

    if (isWinner(players[0].token)) {
      console.log("Player1 win!");
    } else if (isWinner(players[1].token)) {
      console.log("Player2 win!");
    }

    switchPlayerTurn();
  };

  return { playRound };
}

const game = GameController();
game.playRound(0, 0);
game.playRound(0, 1);
game.playRound(1, 1);
game.playRound(1, 2);
game.playRound(2, 2);
game.playRound(2, 1);
