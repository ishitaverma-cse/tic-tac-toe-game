console.log("Script Loaded");

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function handleCellClick(event) {
    const index = event.target.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    
    checkWinner();
    togglePlayer();
}

function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            // Add visual effect
            cells[a].classList.add("win-cell");
            cells[b].classList.add("win-cell");
            cells[c].classList.add("win-cell");
            return true;
            gameActive = false;
            statusText.textContent = `Player ${board[a]} Wins! 🎉`;
            return;
        }
    }
    
    if (!board.includes("")) {
        gameActive = false;
        statusText.textContent = "It's a Draw! 🤝";
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    
    // Remove win-cell class from all cells
    cells.forEach(cell => {
        cell.classList.remove("win-cell");
        cell.textContent = ""; // Clear the cell text
    });

    cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
