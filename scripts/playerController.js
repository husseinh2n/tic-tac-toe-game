export class PlayerController {
    constructor() {
        this.player = { name: '', avatar: null, mark: null };
        this.enemy = { name: '', avatar: null, mark: null };
        this.initializeEventListeners();
        this.setDefaultSelections(); // Set default selections
    }

    initializeEventListeners() {
        // Avatar and mark selections
        document.querySelectorAll('.player-avatars i').forEach(avatar => {
            avatar.addEventListener('click', () => this.selectPlayerIcons(avatar));
        });
        document.querySelectorAll('.player-marks i').forEach(mark => {
            mark.addEventListener('click', () => this.selectPlayerIcons(mark));
        });

        document.querySelectorAll('.enemy-avatars i').forEach(avatar => {
            avatar.addEventListener('click', () => this.selectEnemyIcons(avatar));
        });
        document.querySelectorAll('.enemy-marks i').forEach(mark => {
            mark.addEventListener('click', () => this.selectEnemyIcons(mark));
        });

        // Galaxy selection
        document.querySelectorAll('.galaxy').forEach(galaxy => {
            galaxy.addEventListener('click', () => this.selectGalaxy(galaxy));
        });
    }

    selectPlayerIcons(target) {
        const playerIcons = document.querySelectorAll('#player i');
        if (target.classList.contains('fa-user-astronaut')) {
            target.classList.add('theme-astronaut');
            playerIcons[1].classList.remove('theme-cat');
            this.player.avatar = 'fad fa-user-astronaut theme-astronaut';
        } else if (target.classList.contains('fa-cat-space')) {
            target.classList.add('theme-cat');
            playerIcons[0].classList.remove('theme-astronaut');
            this.player.avatar = 'fad fa-cat-space theme-cat';
        }
        if (target.classList.contains('fa-rocket-launch')) {
            target.classList.add('theme-rocket');
            playerIcons[3].classList.remove('theme-comet');
            this.player.mark = 'fad fa-rocket-launch theme-rocket';
        } else if (target.classList.contains('fa-comet')) {
            target.classList.add('theme-comet');
            playerIcons[2].classList.remove('theme-rocket');
            this.player.mark = 'fad fa-comet fa-flip-horizontal theme-comet';
        }
    }

    setDefaultSelections() {
        // Default selections for Player 1 (P1)
        this.player.avatar = 'fad fa-user-astronaut theme-astronaut'; // Default avatar for P1
        this.player.mark = 'fad fa-rocket-launch theme-rocket'; // Default mark for P1

        // Default selections for Player 2 (P2)
        this.enemy.avatar = 'fad fa-user-cowboy theme-cowboy'; // Default avatar for P2
        this.enemy.mark = 'fad fa-meteor theme-meteor'; // Default mark for P2

        // Optionally, visually highlight the default selections in the UI
        const defaultP1Avatar = document.querySelector('.player-avatars i.fa-user-astronaut');
        const defaultP1Mark = document.querySelector('.player-marks i.fa-rocket-launch');
        const defaultP2Avatar = document.querySelector('.enemy-avatars i.fa-user-cowboy');
        const defaultP2Mark = document.querySelector('.enemy-marks i.fa-meteor');

        if (defaultP1Avatar) defaultP1Avatar.classList.add('theme-astronaut');
        if (defaultP1Mark) defaultP1Mark.classList.add('theme-rocket');
        if (defaultP2Avatar) defaultP2Avatar.classList.add('theme-cowboy');
        if (defaultP2Mark) defaultP2Mark.classList.add('theme-meteor')
        }

    selectEnemyIcons(target) {
        const enemyIcons = document.querySelectorAll('#player-enemy i');
        if (target.classList.contains('fa-alicorn')) {
            target.classList.add('theme-alicorn');
            enemyIcons[1].classList.remove('theme-cowboy');
            this.enemy.avatar = 'fad fa-alicorn fa-flip-horizontal theme-alicorn';
        } else if (target.classList.contains('fa-user-cowboy')) {
            target.classList.add('theme-cowboy');
            enemyIcons[0].classList.remove('theme-alicorn');
            this.enemy.avatar = 'fad fa-user-cowboy theme-cowboy';
        }
        if (target.classList.contains('fa-meteor')) {
            target.classList.add('theme-meteor');
            enemyIcons[3].classList.remove('theme-star');
            this.enemy.mark = 'fad fa-meteor theme-meteor';
        } else if (target.classList.contains('fa-star-shooting')) {
            target.classList.add('theme-star');
            enemyIcons[2].classList.remove('theme-meteor');
            this.enemy.mark = 'fad fa-star-shooting theme-star';
        }
    }

    selectComputerIcons() {
        const computerAvatars = document.querySelectorAll('.alien-icon');
        const computerMarks = document.querySelectorAll('.alien-mark-icon');
        const randomAvatar = computerAvatars[Math.floor(Math.random() * computerAvatars.length)];
        const randomMark = computerMarks[Math.floor(Math.random() * computerMarks.length)];

        if (randomAvatar.classList.contains('fa-pastafarianism')) {
            this.enemy.avatar = 'fad fa-pastafarianism theme-pastafarianism';
        } else {
            this.enemy.avatar = 'fad fa-alien-monster theme-alien';
        }

        if (randomMark.classList.contains('fa-bacterium')) {
            this.enemy.mark = 'fad fa-bacterium theme-bacterium';
        } else {
            this.enemy.mark = 'fad fa-virus theme-virus';
        }
    }

    selectGalaxy(target) {
        const gameBody = document.querySelector('#body');
        const combatPlaceInfo = document.querySelector('#place');
        gameBody.classList.remove('sky', 'andromeda', 'black-eye', 'fireworks', 'milky-way');
        gameBody.classList.add(target.id);
        const galaxyNames = {
            andromeda: 'Andromeda Galaxy',
            'black-eye': 'Black Eye Galaxy',
            fireworks: 'Fireworks Galaxy',
            'milky-way': 'Milky Way Galaxy'
        };
        combatPlaceInfo.textContent = `Save the ${galaxyNames[target.id]}!`;
    }

    validateSelections() {
        return true
    }

    updatePlayerObj() {
        const playerNameInput = document.querySelector('.player-name');
        this.player.name = playerNameInput.value  || 'Player';
    }

    updateEnemyObj(gameMode) {
        const enemyNameInput = document.querySelector('.player-enemy-name');
        if (gameMode === 'pvp') {
            this.enemy.name = enemyNameInput.value;
        } else {
            this.enemy.name = 'Alienzo';
        }
    }

    showPlayersInfo(gameMode) {
        const playerGameName = document.querySelector('.player-game-name');
        const playerGameAvatarDiv = document.querySelector('.player-game-avatar');
        const playerGameMarkDiv = document.querySelector('.player-game-mark');
        const enemyInfo = document.querySelector('#enemy-info');
        const computerInfo = document.querySelector('#computer-info');

        playerGameName.textContent = this.player.name;
        playerGameAvatarDiv.innerHTML = `<i class="${this.player.avatar}"></i>`;
        playerGameMarkDiv.innerHTML = `<i class="${this.player.mark}"></i>`;

        if (gameMode === 'pvp') {
            const enemyGameName = document.querySelector('.enemy-game-name');
            const enemyGameAvatarDiv = document.querySelector('.enemy-game-avatar');
            const enemyGameMarkDiv = document.querySelector('.enemy-game-mark');
            enemyGameName.textContent = this.enemy.name;
            enemyGameAvatarDiv.innerHTML = `<i class="${this.enemy.avatar}"></i>`;
            enemyGameMarkDiv.innerHTML = `<i class="${this.enemy.mark}"></i>`;
            enemyInfo.classList.remove('display-none');
            computerInfo.classList.add('display-none');
        } else {
            const computerGameAvatarDiv = document.querySelector('.computer-game-avatar');
            const computerGameMarkDiv = document.querySelector('.computer-game-mark');
            computerGameAvatarDiv.innerHTML = `<i class="${this.enemy.avatar}"></i>`;
            computerGameMarkDiv.innerHTML = `<i class="${this.enemy.mark}"></i>`;
            computerInfo.classList.remove('display-none');
            enemyInfo.classList.add('display-none');
        }
    }
}