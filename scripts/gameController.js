import { PlayerController } from './playerController.js';
import { Board } from './board.js'; 
import { Game } from './game.js'; // Ensure this line is present

export class GameController {
    constructor() {
        this.gameMode = 'pvp'; // Default game mode
        this.playerController = new PlayerController();
        this.board = new Board('gameboard', this.handleCellClick.bind(this)); // Bind the method
        this.game = new Game();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Game mode selection
        document.querySelector('.pvp.game-type').addEventListener('click', () => this.selectGameMode('pvp'));
        document.querySelector('.pve.game-type').addEventListener('click', () => this.selectGameMode('pve'));

        // Game buttons
        document.querySelector('.play-btn').addEventListener('click', () => this.startGame());
        document.querySelector('.new-game-btn').addEventListener('click', () => this.resetGame());
    }

    selectGameMode(mode) {
        this.gameMode = mode;
        const pvpMode = document.querySelector('#player-enemy');
        const pveMode = document.querySelector('#player-computer');

        if (mode === 'pvp') {
            pvpMode.classList.remove('display-none');
            pveMode.classList.add('display-none');
        } else {
            pveMode.classList.remove('display-none');
            pvpMode.classList.add('display-none');
            this.playerController.selectComputerIcons();
        }
    }

    startGame() {
        // Update player/enemy info
        this.playerController.updatePlayerObj();
        this.playerController.updateEnemyObj(this.gameMode);
    
        // Switch windows
        const gameSelectionWindow = document.querySelector('#game-selection-window');
        const gameWindow = document.querySelector('#game-window');
        gameSelectionWindow.classList.add('display-none');
        gameWindow.classList.remove('display-none');
    
        // Generate board
        const gameboardContainer = document.querySelector('#gameboard');
        this.board.generateGameboard(gameboardContainer); // Pass the container
    
        // Show player info
        this.playerController.showPlayersInfo(this.gameMode);
    }

    handleCellClick(index) {
        console.log(`Cell ${index} clicked`); // line for debugging
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
    resetGame() {
        this.game.resetGame();
        this.board.resetBoard();
    }
}