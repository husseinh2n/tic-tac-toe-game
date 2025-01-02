export class Game {
    constructor() {
        this.board = Array(9).fill(null); // Represents a 3x3 grid
        this.currentPlayer = 'X'; // 'X' starts by default
        this.isGameOver = false;
        this.winner = null;
    }

    // Makes a move at the given position (0-8)
    makeMove(index) {
        if (this.isGameOver || this.board[index] !== null) {
            return false; // Invalid move
        }
        this.board[index] = this.currentPlayer;
        console.log(`Move made at index ${index} by player ${this.currentPlayer}`);//line for debugging
        if (this.checkWinner()) {
            this.isGameOver = true;
            this.winner = this.currentPlayer;
        } else if (this.board.every(cell => cell !== null)) {
            this.isGameOver = true; // Draw
        } else {
            this.switchPlayer();
        }
        return true; // Move successful
    }


    // Checks for a winner or a draw
    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]            // Diagonals
        ];

        return winPatterns.some(pattern =>
            pattern.every(index => this.board[index] === this.currentPlayer)
        );
    }

    // Switches to the other player
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    // Resets the game state
    resetGame() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.isGameOver = false;
        this.winner = null;
    }
    
}

