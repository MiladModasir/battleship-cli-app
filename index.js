const readLineSync = require("readline-sync");

function greetingMenu() {
  console.log("Welcome to Battleship!");
  const choose = readLineSync.keyInSelect(
    ["4 X 4", "5 X 5", "6 X 6"],
    "choose your Board size"
  );
  if (choose === -1) {
    console.log("Ok, maybe next time");
  }
  const sizes = [4, 5, 6];
  const chooseSize = sizes[choose];
  console.log(`You have choosen ${chooseSize} X ${chooseSize} board`);
  return chooseSize;
}

function printBoard(board, debug) {
  const output = {}; // ✅ Build output here once

  for (let i = 0; i < board.length; i++) {
    const rowLabel = String.fromCharCode(65 + i); // 'A', 'B', 'C'
    output[rowLabel] = [];

    for (let j = 0; j < board[i].length; j++) {
      const cell = board[i][j];

      if (cell.hit || debug) {
        if (cell.type === "small") {
          output[rowLabel].push("🟠");
        } else if (cell.type === "large") {
          output[rowLabel].push("🔵");
        } else {
          output[rowLabel].push("-");
        }
      } else {
        output[rowLabel].push("-");
      }
    }
  }

  console.table(output);
}

function createBorad(size) {
  const board = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    board.push(row);
    for (let j = 0; j < size; j++) {
      row.push({ type: "empty", hit: false });
    }
  }
  return board;
}

function placeSingleShip(board, length, type, id) {
  const size = board.length;

  while (true) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    const direction = Math.floor(Math.random() * 2); // 0 = horizontal, 1 = vertical

    const coords = [];
    let fits = true;

    for (let i = 0; i < length; i++) {
      let r = row;
      let c = col;

      if (direction === 0) c += i; // horizontal
      else r += i; // vertical

      if (r >= size || c >= size || board[r][c].type !== "empty") {
        fits = false;
        break;
      }

      coords.push([r, c]);
    }

    if (fits) {
      for (const [r, c] of coords) {
        board[r][c] = {
          type,
          id,
          hit: false,
        };
      }
      break;
    }
  }
}

function placeShips(board, numSmall, numLarge) {
  let shipId = 1;
  for (let i = 0; i < numSmall; i++) {
    placeSingleShip(board, 2, "small", shipId);
    shipId++;
  }
  for (let i = 0; i < numLarge; i++) {
    placeSingleShip(board, 3, "large", shipId);
    shipId++;
  }
}
function handleGuess(board) {
  while (true) {
    const guess = readLineSync.question("Enter your guess (e. g. A1):");
    const row = guess.charCodeAt(0) - 65; // 'A' -> 0
    const col = parseInt(guess.slice(1)) - 1; // '1' -> 0
    if (row < 0 || row >= board.length || col < 0 || col >= board.length) {
      console.log("Invalid guess, try again");
    } else {
      const cell = board[row][col];
      if (cell.hit) {
        console.log("Already guessed this cell");
      } else {
        cell.hit = true;
        if (cell.type !== "empty") {
          console.log("Hit!");
        } else {
          console.log("Miss!");
        }
        break;
      }
    }
  }
}
function hasWon(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = board[i][j];
      if (cell.type !== "empty" && !cell.hit) {
        return false;
      }
    }
  }
  return true;
}
const size = greetingMenu();
const board = createBorad(size);
if (size === 4) placeShips(board, 1, 1);
else if (size === 5) placeShips(board, 2, 1);
else if (size === 6) placeShips(board, 2, 2);
while (true) {
  console.clear();
  printBoard(board, false);
  handleGuess(board);
  if (hasWon(board)) {
    console.clear();
    printBoard(board, true);
    console.log(`
        YOU WON!
        ========
        __   _______ _   _   _    _ _____ _   _
        \\ \\ / /  _  | | | | | |  | |_   _| \\ | |
         \\ V /| | | | | | | | |  | | | | |  \\| |
          \\ / | | | | | | | | |/\\| | | | | . \` |
          | | \\ \\_/ / |_| | \\  /\\  /_| |_| |\\  |
          \\_/  \\___/ \\___/   \\/  \\/ \\___/\\_| \\_/
        ========
        `);
    break;
  }
}
