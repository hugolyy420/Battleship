import '../style.css';
import gameLoop from './game_loop';

const DOMModule = (() => {
  const gameboardContainers = document.querySelectorAll('.gameboard-container');
  const messageDisplay = document.querySelector('.message-display');

  const createGrids = () => {
    const gridSize = 10;
    gameboardContainers.forEach((container) => {
      for (let i = 0; i < gridSize; i += 1) {
        for (let j = 0; j < gridSize; j += 1) {
          const cell = document.createElement('div');
          cell.classList.add('board-cell');
          cell.dataset.row = i;
          cell.dataset.col = j;
          container.append(cell);
        }
      }
    });
  };

  const renderShips = () => {
    const shipsArray = gameLoop.getPlayerGameboard().getShipsArray();
    shipsArray.forEach((ships) => {
      ships.coordinates.forEach((coord) => {
        const boardCell = document.querySelector(
          `[data-row='${coord[0]}'][data-col='${coord[1]}']`,
        );
        boardCell.classList.add('ship');
      });
    });
  };

  const populateGameboard = () => {
    gameLoop.autoPlaceShips();
    renderShips();
  };

  const updateComputerGameboard = () => {
    const computerGameboard = gameLoop.getComputerGameboard();
    const hitArray = computerGameboard.getHitArray();
    const missArray = computerGameboard.getMissedArray();
    console.log(missArray);
    hitArray.forEach((coord) => {
      const targetCell = document.querySelector(
        `.computer-gameboard > [data-row='${coord[0]}'][data-col='${coord[1]}']`,
      );
      targetCell.classList.add('hit');
    });
    missArray.forEach((coord) => {
      const targetCell = document.querySelector(
        `.computer-gameboard > [data-row='${coord[0]}'][data-col='${coord[1]}']`,
      );
      targetCell.classList.add('missed');
    });
  };

  const updatePlayerGameboard = () => {
    const playerGameboard = gameLoop.getPlayerGameboard();
    const hitArray = playerGameboard.getHitArray();
    const missArray = playerGameboard.getMissedArray();
    hitArray.forEach((coord) => {
      const targetCell = document.querySelector(
        `.player-gameboard > [data-row='${coord[0]}'][data-col='${coord[1]}']`,
      );
      targetCell.classList.add('hit');
    });
    missArray.forEach((coord) => {
      const targetCell = document.querySelector(
        `.player-gameboard > [data-row='${coord[0]}'][data-col='${coord[1]}']`,
      );
      targetCell.classList.add('missed');
    });
  };

  const printMessage = (player) => {
    if (player.name === 'player') messageDisplay.textContent = 'Player wins';
    else messageDisplay.textContent = 'Computer wins';
  };

  const setUpAttackEventListener = () => {
    const computerGameboardContainer = document.querySelector(
      '.computer-gameboard',
    );
    computerGameboardContainer.addEventListener('click', (event) => {
      const { target } = event;

      if (
        target.classList.contains('missed') ||
        target.classList.contains('hit')
      )
        return;

      if (target.closest('.board-cell')) {
        const row = parseInt(target.dataset.row, 10);
        const col = parseInt(target.dataset.col, 10);
        const attackCoord = [row, col];
        gameLoop.playRound(attackCoord);
      }
    });
  };

  return {
    createGrids,
    populateGameboard,
    setUpAttackEventListener,
    printMessage,
    updatePlayerGameboard,
    updateComputerGameboard,
  };
})();

export default DOMModule;

DOMModule.createGrids();
gameLoop.createPlayers();
DOMModule.populateGameboard();
DOMModule.setUpAttackEventListener();
