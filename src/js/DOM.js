import '../style.css';
import gameLoop from './game_loop';

const DOMModule = (() => {
  const gameboardContainers = document.querySelectorAll('.gameboard-container');
  const messageDisplay = document.querySelector('.message-display');
  let initialRow;
  let initialCol;

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

  const renderRealShips = () => {
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

  const renderShips = () => {
    const shipsArray = gameLoop.getPlayerGameboard().getShipsArray();
    shipsArray.forEach((ship) => {
      const shipInstance = document.createElement('div');
      const size = 'clamp(1rem, 0.2rem + 3vw, 3rem)';
      if (ship.coordinates[0][0] === ship.coordinates[1][0]) {
        shipInstance.style.width = `calc(${ship.length} * ${size})`;
        shipInstance.style.height = size;
      } else {
        shipInstance.style.width = size;
        shipInstance.style.height = `calc(${ship.length} * ${size})`;
      }
      shipInstance.classList.add('ship', 'draggable');
      shipInstance.draggable = true;

      const boardCell = document.querySelector(
        `[data-row='${ship.start[0]}'][data-col='${ship.start[1]}']`,
      );
      boardCell.append(shipInstance);
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

  const setUpShipsDraggableEventListener = () => {
    const draggables = document.querySelectorAll('.draggable');

    draggables.forEach((draggable) => {
      draggable.addEventListener('dragstart', (event) => {
        draggable.classList.add('dragging');

        const clickedX = event.clientX;
        const clickedY = event.clientY;

        const playerGameboard = document.querySelector('.player-gameboard');
        const boundingBox = playerGameboard.getBoundingClientRect();

        const relativeX = clickedX - boundingBox.left;
        const relativeY = clickedY - boundingBox.top;

        const cellWidth =
          playerGameboard.querySelector('.board-cell').offsetWidth;
        const cellHeight =
          playerGameboard.querySelector('.board-cell').offsetHeight;

        const clickedRow = Math.floor(relativeY / cellHeight);
        const clickedCol = Math.floor(relativeX / cellWidth);

        const initialCell = playerGameboard.querySelector(
          `[data-row='${clickedRow}'][data-col='${clickedCol}']`,
        );

        console.log(clickedRow, clickedCol);

        if (initialCell) {
          initialRow = clickedRow;
          initialCol = clickedCol;
        } else {
          initialRow = null;
          initialCol = null;
        }
      });

      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
        initialRow = null;
        initialCol = null;
      });
    });
  };

  const setUpBoardCellsDragOverEventListener = () => {
    const container = document.querySelector('.player-gameboard');
    container.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    container.addEventListener('drop', (event) => {
      event.preventDefault();
      const draggable = document.querySelector('.dragging');

      const boardCellSize = container
        .querySelector('.board-cell')
        .getBoundingClientRect();
      const targetRow = Math.floor(
        (event.clientY - container.getBoundingClientRect().top) /
          boardCellSize.height,
      );
      const targetCol = Math.floor(
        (event.clientX - container.getBoundingClientRect().left) /
          boardCellSize.width,
      );

      const targetCell = container.querySelector(
        `[data-row='${targetRow}'][data-col='${targetCol}']`,
      );

      if (draggable && targetCell) {
        if (initialRow !== null && initialCol !== null) {
          const rowOffset = targetRow - initialRow;
          const colOffset = targetCol - initialCol;
          const playerGameboard = gameLoop.getPlayerGameboard();
          const newStart = playerGameboard.updateShipCoordinates(
            initialRow,
            initialCol,
            rowOffset,
            colOffset,
          );

          if (!newStart) return;

          const realTarget = document.querySelector(
            `.player-gameboard > [data-row='${newStart[0]}'][data-col='${newStart[1]}']`,
          );

          realTarget.appendChild(draggable);
        }
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
    setUpShipsDraggableEventListener,
    setUpBoardCellsDragOverEventListener,
  };
})();

export default DOMModule;

DOMModule.createGrids();
gameLoop.createPlayers();
DOMModule.populateGameboard();
DOMModule.setUpAttackEventListener();
DOMModule.setUpShipsDraggableEventListener();
DOMModule.setUpBoardCellsDragOverEventListener();
