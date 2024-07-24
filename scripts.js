document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('resetBtn');

    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(cell, cellIndex) {
        if (gameActive && board[cellIndex] === '') {
            board[cellIndex] = currentPlayer;
            cell.textContent = currentPlayer;
            if (checkForWin(currentPlayer)) {
                status.textContent = `${currentPlayer} wins!`;
                gameActive = false;
            } else if (isBoardFull()) {
                status.textContent = 'It\'s a tie!';
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `${currentPlayer}'s turn`;
                if (currentPlayer === 'O') {
                    setTimeout(makeComputerMove, 500); // Artificial delay for computer move
                }
            }
        }
    }

    function makeComputerMove() {
        // Simple AI: Computer chooses a random empty cell
        let emptyCells = board.reduce((acc, val, index) => (val === '') ? acc.concat(index) : acc, []);
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let cellIndex = emptyCells[randomIndex];
        let cell = cells[cellIndex];
        handleCellClick(cell, cellIndex);
    }

    function checkForWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === player;
            });
        });
    }

    function isBoardFull() {
        return board.every(cell => cell !== '');
    }

    function resetGame() {
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = `${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(cell, index));
    });

    resetButton.addEventListener('click', resetGame);
});
