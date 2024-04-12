import '../style.css';
import gameLoop from './game_loop';

const DOMModule = (() => {
  const gameboardContainers = document.querySelectorAll('.gameboard-container');

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

  const renderShip = () => {
    const shipsArray = gameLoop.player.gameboard.getShipsArray();
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
    renderShip();
  };

  const setUpAttackEventListener = () => {
    const computerGameboardContainer = document.querySelector(
      '.computer-gameboard',
    );
    computerGameboardContainer.addEventListener('click', (event) => {
      if (event.target.closest('.board-cell')) {
        event.target.classList.add('hit');
      }
    });
  };

  return { createGrids, populateGameboard, setUpAttackEventListener };
})();

DOMModule.createGrids();
gameLoop.createPlayers();
DOMModule.populateGameboard();
DOMModule.setUpAttackEventListener();
