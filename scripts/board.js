export class Board {
    constructor(boardId, onClickHandler) {
        console.log('Board initialized with boardId:', boardId); // Debug line
        this.boardElement = document.getElementById(boardId); // Ensure this line is correct
        if (!this.boardElement) {
            console.error(`Element with id "${boardId}" not found`); // Debug line
        }
        this.onClickHandler = onClickHandler;
    }

    // Render the game board
    generateGameboard(container) {
        console.log('Generating gameboard'); // Debug line
        if (!container) {
            console.error('Container is undefined'); // Debug line
            return;
        }
        container.textContent = ''; // Clear the board
        container.classList.add('grid-3x3');
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.setAttribute('data-index', i);
            cell.setAttribute('data-unclicked', true);
            cell.addEventListener('click', () => {
                console.log(`Cell ${i} clicked`); // Debug line
                this.onClickHandler(i);
            });
            container.appendChild(cell);
        }
    }

    handleCellClick(index) {
        console.log(`Cell ${index} clicked`); // Debug line
        if (this.game.isGameOver || !this.game.makeMove(index)) {
            return; // Ignore clicks if the game is over or the move is invalid
        }
    
        // Update the board UI
        const mark = this.game.currentPlayer === 'X' ? this.playerController.player.mark : this.playerController.enemy.mark;
        this.board.updateCell(index, mark);
    
        // Check for a winner or draw
        if (this.game.winner) {
            alert(`${this.game.winner === 'X' ? this.playerController.player.name : this.playerController.enemy.name} wins!`);
        } else if (this.game.isGameOver) {
            alert("It's a draw!");
        }
    }
    // Update the board with the current game state
    updateCell(index, mark) {
        const cell = this.boardElement.querySelector(`[data-index="${index}"]`);
        if (cell) {
            cell.innerHTML = `<i class="${mark}"></i>`;
            cell.removeAttribute('data-unclicked');
        }
    }

    // Clear the board for a new game
     resetBoard() {
        window.location.reload();
    }
}
