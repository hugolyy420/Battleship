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
          cell.dataset.x = i;
          cell.dataset.y = j;
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
          `[data-x='${coord[0]}'][data-y='${coord[1]}']`,
        );
        boardCell.classList.add('ship');
      });
    });
  };

  const populateGameboard = () => {
    gameLoop.autoPlaceShips();
    renderShips();
  };

  const updateComputerGameboard = (target, [xCoord, yCoord]) => {
    const computerGameboard = gameLoop.getComputerGameboard();
    if (computerGameboard.isHit(xCoord, yCoord)) target.classList.add('hit');
    else target.classList.add('missed');
  };

  const updatePlayerGameboard = ([xCoord, yCoord]) => {
    const playerGameboard = gameLoop.getPlayerGameboard();
    const target = document.querySelector(
      `.player-gameboard > [data-x='${xCoord}'][data-y='${yCoord}']`,
    );
    if (playerGameboard.isHit(xCoord, yCoord)) target.classList.add('hit');
    else target.classList.add('missed');
  };

  const setUpAttackEventListener = () => {
    const computerGameboardContainer = document.querySelector(
      '.computer-gameboard',
    );
    computerGameboardContainer.addEventListener('click', (event) => {
      const target = event.target;
      if (
        target.classList.contains('missed') ||
        target.classList.contains('hit')
      )
        return;
      if (target.closest('.board-cell')) {
        const xCoord = parseInt(target.dataset.x);
        const yCoord = parseInt(target.dataset.y);
        const attackCoord = [xCoord, yCoord];
        gameLoop.playRound(attackCoord);
        updateComputerGameboard(target, attackCoord);
        if (gameLoop.checkPlayerWin()) {
          messageDisplay.textContent = 'Player wins';
          return;
        }
        const computerAttackCoord = gameLoop
          .getComputer()
          .generateRandomCoord();
        gameLoop.playRound(computerAttackCoord);
        updatePlayerGameboard(computerAttackCoord);
        if (gameLoop.checkComputerWin()) {
          messageDisplay.textContent = 'Computer wins';
          return;
        }
      }
    });
  };

  return { createGrids, populateGameboard, setUpAttackEventListener };
})();

export default DOMModule;

DOMModule.createGrids();
gameLoop.createPlayers();
DOMModule.populateGameboard();
DOMModule.setUpAttackEventListener();
