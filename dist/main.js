/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/DOM.js":
/*!***********************!*\
  !*** ./src/js/DOM.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _game_loop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_loop */ "./src/js/game_loop.js");


const DOMModule = (() => {
  const gameboardContainers = document.querySelectorAll('.gameboard-container');
  const messageDisplay = document.querySelector('.message-display');
  let initialRow;
  let initialCol;
  let placeMode = true;
  let gameOver = false;

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

  const clearGameBoard = () => {
    const draggables = document.querySelectorAll('.draggable');
    draggables.forEach((draggable) => {
      const targetBoardCells = draggable.closest('.board-cell');
      targetBoardCells.textContent = '';
    });
  };

  const clearDisplayMessage = () => {
    messageDisplay.textContent = '';
  };

  const resetGameBoard = () => {
    gameboardContainers.forEach((container) => {
      container.textContent = '';
    });
  };

  const renderShips = () => {
    const shipsArray = _game_loop__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerGameboard().getShipsArray();
    shipsArray.forEach((ship) => {
      const shipInstance = document.createElement('div');
      const size = 'clamp(0.8rem, 0.2rem + 2.2vw, 2.5rem)';
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
    _game_loop__WEBPACK_IMPORTED_MODULE_0__["default"].autoPlaceShips();
    renderShips();
  };

  const toggleGameboardEventListenerStatus = () => {
    const computerGameboard = document.querySelector('.computer-gameboard');
    const playerGameboard = document.querySelector('.player-gameboard');
    if (placeMode && !gameOver) {
      computerGameboard.style.pointerEvents = 'none';
      computerGameboard.classList.add('inactive');
      playerGameboard.style.pointerEvents = 'auto';
      playerGameboard.classList.remove('inactive');
    } else if (!placeMode && !gameOver) {
      computerGameboard.style.pointerEvents = 'auto';
      computerGameboard.classList.remove('inactive');
      playerGameboard.style.pointerEvents = 'none';
      playerGameboard.classList.add('inactive');
    } else if (gameOver) {
      computerGameboard.style.pointerEvents = 'none';
      computerGameboard.classList.add('inactive');
    }
  };

  const toggleButtonSectionDisplay = () => {
    const randomButton = document.querySelector('.random-button');
    const startGameButton = document.querySelector('.start-button');
    const restartButton = document.querySelector('.restart-button');
    if (placeMode) {
      randomButton.classList.remove('hide');
      startGameButton.classList.remove('hide');
      restartButton.classList.add('hide');
    }

    if (!placeMode && !gameOver) {
      randomButton.classList.add('hide');
      startGameButton.classList.add('hide');
      restartButton.classList.remove('hide');
    }
  };

  const updateComputerGameboard = () => {
    const computerGameboard = _game_loop__WEBPACK_IMPORTED_MODULE_0__["default"].getComputerGameboard();
    const hitArray = computerGameboard.getHitArray();
    const missArray = computerGameboard.getMissedArray();
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
    const playerGameboard = _game_loop__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerGameboard();
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
    if (placeMode) {
      const messageOne =
        'Rearrange the position of the ships by dragging and dropping.';
      const messageTwo = 'Click the ship to rotate it.';
      const messageThree =
        'Ships must be at least one grid away from each other.';
      const messageArray = [messageOne, messageTwo, messageThree];
      messageArray.forEach((message) => {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageDisplay.append(messageElement);
      });
      return;
    }
    if (player.name !== 'Computer')
      messageDisplay.textContent = `${player.name} wins.`;
    else if (player.name === 'Computer')
      messageDisplay.textContent = 'Computer wins.';
    gameOver = true;
  };

  const printNames = () => {
    const player = _game_loop__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayer();
    const computer = _game_loop__WEBPACK_IMPORTED_MODULE_0__["default"].getComputer();
    const playerName = document.querySelector('.player-name');
    const computerName = document.querySelector('.computer-name');
    playerName.textContent = player.name;
    computerName.textContent = computer.name;
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
        _game_loop__WEBPACK_IMPORTED_MODULE_0__["default"].playRound(attackCoord);
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
          const playerGameboard = _game_loop__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerGameboard();
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

          if (realTarget !== draggable.parentNode) {
            realTarget.appendChild(draggable);
          }
        }
      }
    });
  };

  const setUpShakeEndEventListener = () => {
    const draggables = document.querySelectorAll('.draggable');
    draggables.forEach((draggable) => {
      draggable.addEventListener('animationend', () => {
        draggable.classList.remove('shake');
      });
    });
  };

  const setUpRotateShipEventListener = () => {
    const draggables = document.querySelectorAll('.draggable');
    draggables.forEach((draggable) => {
      draggable.addEventListener('click', (event) => {
        event.stopPropagation();
        const playerGameboard = _game_loop__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerGameboard();
        const targetCell = event.target.closest('.board-cell');
        const targetRow = parseInt(targetCell.dataset.row, 10);
        const targetCol = parseInt(targetCell.dataset.col, 10);
        const newCoordinatesArray = playerGameboard.rotateShip(
          targetRow,
          targetCol,
        );
        if (!newCoordinatesArray) {
          event.target.classList.add('shake');
          return;
        }
        targetCell.textContent = '';
        clearGameBoard();
        renderShips();
        setUpShipsDraggableEventListener();
        setUpRotateShipEventListener();
        setUpShakeEndEventListener();
      });
    });
  };

  const showGameContent = () => {
    const gameContent = document.querySelector('.game-section');
    const introContent = document.querySelector('.intro-content');
    const buttonSection = document.querySelector('.button-section');
    buttonSection.classList.remove('hide');
    gameContent.classList.remove('hide');
    introContent.classList.add('hide');
  };

  const setupRandomizeShipsEventListener = () => {
    const randomButton = document.querySelector('.random-button');
    randomButton.addEventListener('click', () => {
      clearGameBoard();
      populateGameboard();
      setUpShipsDraggableEventListener();
      setUpRotateShipEventListener();
      setUpShakeEndEventListener();
    });
  };

  const setupStartGameEventListener = () => {
    const startButton = document.querySelector('.start-button');
    startButton.addEventListener('click', () => {
      placeMode = false;
      clearDisplayMessage();
      toggleGameboardEventListenerStatus();
      toggleButtonSectionDisplay();
    });
  };

  const setupRestartGameEventListener = () => {
    const restartButton = document.querySelector('.restart-button');
    restartButton.addEventListener('click', () => {
      placeMode = true;
      gameOver = false;
      toggleButtonSectionDisplay();
      resetGameBoard();
      clearDisplayMessage();
      setUpGame();
    });
  };

  function setUpAllEventListeners() {
    setUpAttackEventListener();
    setUpShipsDraggableEventListener();
    setUpBoardCellsDragOverEventListener();
    setUpRotateShipEventListener();
    setUpShakeEndEventListener();
    setupRandomizeShipsEventListener();
    setupStartGameEventListener();
    setupRestartGameEventListener();
  }

  function setUpGame() {
    createGrids();
    _game_loop__WEBPACK_IMPORTED_MODULE_0__["default"].resetComputer();
    printNames();
    printMessage();
    populateGameboard();
    setUpAllEventListeners();
    toggleGameboardEventListenerStatus();
  }

  const setUpNameSubmitEventListener = () => {
    const submitButton = document.querySelector('.submit-button');
    const input = document.querySelector('.name-input');
    submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      const name = input.value;
      if (name === '') _game_loop__WEBPACK_IMPORTED_MODULE_0__["default"].createPlayers();
      else _game_loop__WEBPACK_IMPORTED_MODULE_0__["default"].createPlayers(name);
      setUpGame();
      showGameContent();
    });
  };

  return {
    printMessage,
    updatePlayerGameboard,
    updateComputerGameboard,
    setUpNameSubmitEventListener,
    toggleGameboardEventListenerStatus,
    toggleButtonSectionDisplay,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOMModule);


/***/ }),

/***/ "./src/js/computer.js":
/*!****************************!*\
  !*** ./src/js/computer.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _game_loop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_loop */ "./src/js/game_loop.js");


const createComputer = (gameboard, name = 'Computer') => {
  let allCoordinates = [];
  let targetQueue = [];
  let lastHit;
  let firstHit;
  let direction;

  const removeDuplicates = (array) => {
    array.forEach((coord) => {
      const index = allCoordinates.findIndex(
        (item) => item[0] === coord[0] && item[1] === coord[1],
      );
      if (index !== -1) {
        allCoordinates.splice(index, 1);
      }
    });
  };

  function resetComputer() {
    allCoordinates = [];
    targetQueue = [];
    const gridSize = 10;
    for (let i = 0; i < gridSize; i += 1) {
      for (let j = 0; j < gridSize; j += 1) {
        allCoordinates.push([i, j]);
      }
    }

    for (let i = allCoordinates.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [allCoordinates[i], allCoordinates[j]] = [
        allCoordinates[j],
        allCoordinates[i],
      ];
    }
  }

  const getNextDirection = (dir) => {
    switch (dir) {
      case 'up':
        return 'down';
      case 'down':
        return 'left';
      case 'left':
        return 'right';
      default:
        return null;
    }
  };

  const getNextTargetInSameDirection = (playerGameboard, target) => {
    let validAttack = false;
    let triedAllDirections = false;

    while (!validAttack && !triedAllDirections) {
      const nextTarget = [...target];
      switch (direction) {
        case 'up':
          nextTarget[0] -= 1;
          break;
        case 'down':
          nextTarget[0] += 1;
          break;
        case 'left':
          nextTarget[1] -= 1;
          break;
        default:
          nextTarget[1] += 1;
          break;
      }

      if (
        playerGameboard.isBeyondBoard(nextTarget) ||
        playerGameboard.isMissed(nextTarget[0], nextTarget[1]) ||
        playerGameboard.isHit(nextTarget[0], nextTarget[1])
      ) {
        direction = getNextDirection(direction);

        if (direction === null) {
          triedAllDirections = true;
        }

        if (triedAllDirections) {
          return null;
        }
        target = target === lastHit ? firstHit : lastHit;
      } else {
        validAttack = true;
        return nextTarget;
      }
    }
    return null;
  };

  const computerAttack = () => {
    const playerGameboard = _game_loop__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerGameboard();
    removeDuplicates(playerGameboard.getMissedArray());
    if (targetQueue.length > 0) {
      removeDuplicates(targetQueue);
      const nextAttack = targetQueue.shift();
      playerGameboard.receiveAttack(nextAttack);
      if (playerGameboard.isHit(nextAttack[0], nextAttack[1])) {
        if (playerGameboard.getShip(nextAttack[0], nextAttack[1]).sunk) return;
        lastHit = nextAttack;
        const nextTarget = getNextTargetInSameDirection(
          playerGameboard,
          lastHit,
        );
        if (nextTarget) targetQueue.unshift(nextTarget);
      } else {
        direction = getNextDirection(direction);
        const nextTarget = getNextTargetInSameDirection(
          playerGameboard,
          firstHit,
        );
        if (nextTarget) targetQueue.unshift(nextTarget);
      }
    } else {
      const nextAttack = allCoordinates.pop();
      playerGameboard.receiveAttack(nextAttack);
      if (playerGameboard.isHit(nextAttack[0], nextAttack[1])) {
        firstHit = [...nextAttack];
        lastHit = nextAttack;
        direction = 'up';
        const nextTarget = getNextTargetInSameDirection(
          playerGameboard,
          lastHit,
        );
        if (nextTarget) targetQueue.unshift(nextTarget);
      }
    }
  };

  return { name, gameboard, computerAttack, resetComputer };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createComputer);


/***/ }),

/***/ "./src/js/game_loop.js":
/*!*****************************!*\
  !*** ./src/js/game_loop.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ "./src/js/DOM.js");
/* harmony import */ var _computer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./computer */ "./src/js/computer.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/js/player.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameboard */ "./src/js/gameboard.js");





const gameLoop = (() => {
  let player;
  let computer;

  const createPlayers = (name) => {
    player = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_gameboard__WEBPACK_IMPORTED_MODULE_3__["default"])(), name);
    computer = (0,_computer__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_gameboard__WEBPACK_IMPORTED_MODULE_3__["default"])());
  };

  const autoPlaceShips = () => {
    const arr = [player, computer];
    arr.forEach((player) => {
      player.gameboard.autoPlaceShips();
    });
  };

  const getPlayerGameboard = () => player.gameboard;

  const getComputerGameboard = () => computer.gameboard;

  const getComputer = () => computer;

  const getPlayer = () => player;

  const playerWin = () => computer.gameboard.areAllShipsSunk();

  const computerWins = () => player.gameboard.areAllShipsSunk();

  const resetComputer = () => computer.resetComputer();

  const checkWin = () => {
    if (playerWin()) _DOM__WEBPACK_IMPORTED_MODULE_0__["default"].printMessage(getPlayer());
    else if (computerWins()) _DOM__WEBPACK_IMPORTED_MODULE_0__["default"].printMessage(getComputer());

    if (playerWin() || computerWins()) {
      _DOM__WEBPACK_IMPORTED_MODULE_0__["default"].toggleGameboardEventListenerStatus();
      _DOM__WEBPACK_IMPORTED_MODULE_0__["default"].toggleButtonSectionDisplay();

      return true;
    }
  };

  function playRound(coord) {
    computer.gameboard.receiveAttack(coord);
    _DOM__WEBPACK_IMPORTED_MODULE_0__["default"].updateComputerGameboard();

    if (checkWin()) return;

    computer.computerAttack();
    _DOM__WEBPACK_IMPORTED_MODULE_0__["default"].updatePlayerGameboard();

    if (checkWin()) return;
  }

  return {
    createPlayers,
    autoPlaceShips,
    getPlayerGameboard,
    getComputerGameboard,
    playRound,
    getComputer,
    getPlayer,
    resetComputer,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameLoop);


/***/ }),

/***/ "./src/js/gameboard.js":
/*!*****************************!*\
  !*** ./src/js/gameboard.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/js/ship.js");


const gameboard = () => {
  let shipsArray = [];
  let missedArray = [];
  let hitArray = [];
  let vertical = false;

  const setVertical = () => (vertical = true);

  const setHorizontal = () => (vertical = false);

  const isBeyondBoard = ([row, col]) => {
    if (row < 0 || row > 9 || col < 0 || col > 9) return true;
    return false;
  };

  const isOccupied = ([row, col]) =>
    shipsArray.some((ship) =>
      ship.coordinates.some((coord) => coord[0] === row && coord[1] === col),
    );

  const getRingCoordinates = (array) => {
    const neighboringCoordinates = [];

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];
    array.forEach((coord) => {
      directions.forEach((dir) => {
        const neighbor = [coord[0] + dir[0], coord[1] + dir[1]];
        if (
          !array.some(
            (coord) => coord[0] === neighbor[0] && coord[1] === neighbor[1],
          ) &&
          !isBeyondBoard(neighbor) &&
          !neighboringCoordinates.some(
            (coord) => coord[0] === neighbor[0] && coord[1] === neighbor[1],
          )
        )
          neighboringCoordinates.push(neighbor);
      });
    });

    return neighboringCoordinates;
  };

  const isNextToShips = (array) => {
    const ringCoordinates = getRingCoordinates(array);
    return ringCoordinates.some((coord) =>
      shipsArray.some((ship) =>
        ship.coordinates.some(
          (shipCoord) => shipCoord[0] === coord[0] && shipCoord[1] === coord[1],
        ),
      ),
    );
  };

  const isHit = (row, col) =>
    hitArray.some((coord) => coord[0] === row && coord[1] === col);

  const isMissed = (row, col) =>
    missedArray.some((coord) => coord[0] === row && coord[1] === col);

  const isSunk = () => shipsArray.some((ship) => ship.sunk);

  const addToMissedArray = ([row, col]) => {
    if (!missedArray.find((mCoord) => mCoord[0] === row && mCoord[1] === col))
      missedArray.push([row, col]);
  };

  const generateShipCoordinates = (length, coordinates) => {
    let row = coordinates[0];
    let col = coordinates[1];
    const coordinatesArray = [];
    coordinatesArray.push(coordinates);

    for (let i = 0; i < length - 1; i += 1) {
      let newCoordinates;
      if (vertical) newCoordinates = [(row += 1), col];
      else newCoordinates = [row, (col += 1)];
      coordinatesArray.push(newCoordinates);
    }

    return coordinatesArray;
  };

  const placeShip = (length, coordinates) => {
    const coordinatesArray = generateShipCoordinates(length, coordinates);
    if (
      isNextToShips(coordinatesArray) ||
      coordinatesArray.some((coords) => isOccupied(coords)) ||
      coordinatesArray.some((coords) => isBeyondBoard(coords))
    )
      throw new Error('Invalid Coordinates');
    const coords = [...coordinatesArray];
    const shipInstance = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(length, coordinatesArray, coords[0]);
    shipsArray.push(shipInstance);
  };

  const receiveAttack = ([row, col]) => {
    const target = shipsArray.filter((ship) =>
      ship.coordinates.some((coord) => coord[0] === row && coord[1] === col),
    );
    if (target.length > 0) {
      target[0].hit();
      target[0].isSunk();
      hitArray.push([row, col]);
      if (target[0].sunk) {
        const ringCoordinatesArray = getRingCoordinates(target[0].coordinates);
        ringCoordinatesArray.forEach((coord) => addToMissedArray(coord));
      }
    } else missedArray.push([row, col]);
  };

  const autoPlaceShips = () => {
    shipsArray = [];
    missedArray = [];
    hitArray = [];
    const shipLengths = [5, 4, 3, 3, 2];

    shipLengths.forEach((length) => {
      let isValidPlacement = false;

      while (!isValidPlacement) {
        if (Math.random() < 0.5) {
          setVertical();
        } else {
          setHorizontal();
        }

        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const coordinates = [row, col];

        try {
          placeShip(length, coordinates);
          isValidPlacement = true;
        } catch (error) {}
      }
    });
  };

  const areAllShipsSunk = () => shipsArray.every((ship) => ship.sunk);

  const getShipsArray = () => shipsArray;

  const getMissedArray = () => missedArray;

  const getHitArray = () => hitArray;

  const getShip = (row, col) => {
    const array = shipsArray.filter((ship) =>
      ship.coordinates.some((coord) => coord[0] === row && coord[1] === col),
    );
    return array[0];
  };

  const getAllSunkShips = () => shipsArray.filter((ship) => ship.sunk);

  const updateShipCoordinates = (
    initialRow,
    initialCol,
    rowOffset,
    colOffset,
  ) => {
    const targetShip = getShip(initialRow, initialCol);
    if (!targetShip) return;
    const startCopy = [...targetShip.start];
    const coordinatesCopy = [...targetShip.coordinates];
    const newRow = startCopy[0] + rowOffset;
    const newCol = startCopy[1] + colOffset;

    if (coordinatesCopy[0][0] === targetShip.coordinates[1][0]) setHorizontal();
    else setVertical();
    const newCoordniatesArray = generateShipCoordinates(targetShip.length, [
      newRow,
      newCol,
    ]);
    targetShip.start = [];
    targetShip.coordinates = [];
    if (
      newCoordniatesArray.some((coords) => isBeyondBoard(coords)) ||
      newCoordniatesArray.some((coords) => isOccupied(coords)) ||
      isNextToShips(newCoordniatesArray)
    ) {
      targetShip.start = startCopy;
      targetShip.coordinates = coordinatesCopy;
      return;
    }
    targetShip.coordinates = newCoordniatesArray;
    targetShip.start = [newRow, newCol];
    return targetShip.start;
  };

  const rotateShip = (row, col) => {
    const targetShip = getShip(row, col);
    const coordinatesCopy = [...targetShip.coordinates];
    if (targetShip.coordinates[0][0] === targetShip.coordinates[1][0])
      setVertical();
    else setHorizontal();
    const newCoordniatesArray = generateShipCoordinates(targetShip.length, [
      row,
      col,
    ]);
    targetShip.coordinates = [];
    if (
      newCoordniatesArray.some((coords) => isBeyondBoard(coords)) ||
      newCoordniatesArray.some((coords) => isOccupied(coords)) ||
      isNextToShips(newCoordniatesArray)
    ) {
      targetShip.coordinates = coordinatesCopy;
      return;
    }
    targetShip.coordinates = newCoordniatesArray;
    return newCoordniatesArray;
  };

  return {
    placeShip,
    setVertical,
    setHorizontal,
    getShipsArray,
    getMissedArray,
    getHitArray,
    getAllSunkShips,
    getRingCoordinates,
    receiveAttack,
    areAllShipsSunk,
    autoPlaceShips,
    isHit,
    isMissed,
    isSunk,
    isBeyondBoard,
    getShip,
    addToMissedArray,
    updateShipCoordinates,
    rotateShip,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameboard);


/***/ }),

/***/ "./src/js/player.js":
/*!**************************!*\
  !*** ./src/js/player.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const createPlayer = (gameboard, name = 'Player') => ({
  name,
  gameboard,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createPlayer);


/***/ }),

/***/ "./src/js/ship.js":
/*!************************!*\
  !*** ./src/js/ship.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const createShip = (length, coordinates, start) => ({
  length,
  coordinates,
  start,
  hitNumber: 0,
  sunk: false,
  hit() {
    this.hitNumber += 1;
  },
  isSunk() {
    this.sunk = this.length === this.hitNumber;
  },
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createShip);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ "./src/js/DOM.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style.css */ "./src/style.css");



window.addEventListener('load', () => {
  _DOM__WEBPACK_IMPORTED_MODULE_0__["default"].setUpNameSubmitEventListener();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TjhCO0FBQ1I7O0FBRXRCO0FBQ0EsRUFBRSw0Q0FBUztBQUNYLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz9lMzIwIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvanMvRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvanMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9qcy9nYW1lX2xvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9qcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9qcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9qcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2pzL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IGdhbWVMb29wIGZyb20gJy4vZ2FtZV9sb29wJztcblxuY29uc3QgRE9NTW9kdWxlID0gKCgpID0+IHtcbiAgY29uc3QgZ2FtZWJvYXJkQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYW1lYm9hcmQtY29udGFpbmVyJyk7XG4gIGNvbnN0IG1lc3NhZ2VEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2UtZGlzcGxheScpO1xuICBsZXQgaW5pdGlhbFJvdztcbiAgbGV0IGluaXRpYWxDb2w7XG4gIGxldCBwbGFjZU1vZGUgPSB0cnVlO1xuICBsZXQgZ2FtZU92ZXIgPSBmYWxzZTtcblxuICBjb25zdCBjcmVhdGVHcmlkcyA9ICgpID0+IHtcbiAgICBjb25zdCBncmlkU2l6ZSA9IDEwO1xuICAgIGdhbWVib2FyZENvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRTaXplOyBpICs9IDEpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBncmlkU2l6ZTsgaiArPSAxKSB7XG4gICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnYm9hcmQtY2VsbCcpO1xuICAgICAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSBpO1xuICAgICAgICAgIGNlbGwuZGF0YXNldC5jb2wgPSBqO1xuICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQoY2VsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBjbGVhckdhbWVCb2FyZCA9ICgpID0+IHtcbiAgICBjb25zdCBkcmFnZ2FibGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyYWdnYWJsZScpO1xuICAgIGRyYWdnYWJsZXMuZm9yRWFjaCgoZHJhZ2dhYmxlKSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXRCb2FyZENlbGxzID0gZHJhZ2dhYmxlLmNsb3Nlc3QoJy5ib2FyZC1jZWxsJyk7XG4gICAgICB0YXJnZXRCb2FyZENlbGxzLnRleHRDb250ZW50ID0gJyc7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgY2xlYXJEaXNwbGF5TWVzc2FnZSA9ICgpID0+IHtcbiAgICBtZXNzYWdlRGlzcGxheS50ZXh0Q29udGVudCA9ICcnO1xuICB9O1xuXG4gIGNvbnN0IHJlc2V0R2FtZUJvYXJkID0gKCkgPT4ge1xuICAgIGdhbWVib2FyZENvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiB7XG4gICAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSAnJztcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCByZW5kZXJTaGlwcyA9ICgpID0+IHtcbiAgICBjb25zdCBzaGlwc0FycmF5ID0gZ2FtZUxvb3AuZ2V0UGxheWVyR2FtZWJvYXJkKCkuZ2V0U2hpcHNBcnJheSgpO1xuICAgIHNoaXBzQXJyYXkuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgY29uc3Qgc2hpcEluc3RhbmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBzaXplID0gJ2NsYW1wKDAuOHJlbSwgMC4ycmVtICsgMi4ydncsIDIuNXJlbSknO1xuICAgICAgaWYgKHNoaXAuY29vcmRpbmF0ZXNbMF1bMF0gPT09IHNoaXAuY29vcmRpbmF0ZXNbMV1bMF0pIHtcbiAgICAgICAgc2hpcEluc3RhbmNlLnN0eWxlLndpZHRoID0gYGNhbGMoJHtzaGlwLmxlbmd0aH0gKiAke3NpemV9KWA7XG4gICAgICAgIHNoaXBJbnN0YW5jZS5zdHlsZS5oZWlnaHQgPSBzaXplO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hpcEluc3RhbmNlLnN0eWxlLndpZHRoID0gc2l6ZTtcbiAgICAgICAgc2hpcEluc3RhbmNlLnN0eWxlLmhlaWdodCA9IGBjYWxjKCR7c2hpcC5sZW5ndGh9ICogJHtzaXplfSlgO1xuICAgICAgfVxuICAgICAgc2hpcEluc3RhbmNlLmNsYXNzTGlzdC5hZGQoJ3NoaXAnLCAnZHJhZ2dhYmxlJyk7XG4gICAgICBzaGlwSW5zdGFuY2UuZHJhZ2dhYmxlID0gdHJ1ZTtcblxuICAgICAgY29uc3QgYm9hcmRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYFtkYXRhLXJvdz0nJHtzaGlwLnN0YXJ0WzBdfSddW2RhdGEtY29sPScke3NoaXAuc3RhcnRbMV19J11gLFxuICAgICAgKTtcbiAgICAgIGJvYXJkQ2VsbC5hcHBlbmQoc2hpcEluc3RhbmNlKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBwb3B1bGF0ZUdhbWVib2FyZCA9ICgpID0+IHtcbiAgICBnYW1lTG9vcC5hdXRvUGxhY2VTaGlwcygpO1xuICAgIHJlbmRlclNoaXBzKCk7XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlR2FtZWJvYXJkRXZlbnRMaXN0ZW5lclN0YXR1cyA9ICgpID0+IHtcbiAgICBjb25zdCBjb21wdXRlckdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wdXRlci1nYW1lYm9hcmQnKTtcbiAgICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWdhbWVib2FyZCcpO1xuICAgIGlmIChwbGFjZU1vZGUgJiYgIWdhbWVPdmVyKSB7XG4gICAgICBjb21wdXRlckdhbWVib2FyZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgICAgY29tcHV0ZXJHYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKTtcbiAgICAgIHBsYXllckdhbWVib2FyZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgcGxheWVyR2FtZWJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlJyk7XG4gICAgfSBlbHNlIGlmICghcGxhY2VNb2RlICYmICFnYW1lT3Zlcikge1xuICAgICAgY29tcHV0ZXJHYW1lYm9hcmQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgICAgIGNvbXB1dGVyR2FtZWJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlJyk7XG4gICAgICBwbGF5ZXJHYW1lYm9hcmQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICAgIHBsYXllckdhbWVib2FyZC5jbGFzc0xpc3QuYWRkKCdpbmFjdGl2ZScpO1xuICAgIH0gZWxzZSBpZiAoZ2FtZU92ZXIpIHtcbiAgICAgIGNvbXB1dGVyR2FtZWJvYXJkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICBjb21wdXRlckdhbWVib2FyZC5jbGFzc0xpc3QuYWRkKCdpbmFjdGl2ZScpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCB0b2dnbGVCdXR0b25TZWN0aW9uRGlzcGxheSA9ICgpID0+IHtcbiAgICBjb25zdCByYW5kb21CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmFuZG9tLWJ1dHRvbicpO1xuICAgIGNvbnN0IHN0YXJ0R2FtZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1idXR0b24nKTtcbiAgICBjb25zdCByZXN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3RhcnQtYnV0dG9uJyk7XG4gICAgaWYgKHBsYWNlTW9kZSkge1xuICAgICAgcmFuZG9tQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgIHN0YXJ0R2FtZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICByZXN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG5cbiAgICBpZiAoIXBsYWNlTW9kZSAmJiAhZ2FtZU92ZXIpIHtcbiAgICAgIHJhbmRvbUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICBzdGFydEdhbWVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgcmVzdGFydEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZUNvbXB1dGVyR2FtZWJvYXJkID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkID0gZ2FtZUxvb3AuZ2V0Q29tcHV0ZXJHYW1lYm9hcmQoKTtcbiAgICBjb25zdCBoaXRBcnJheSA9IGNvbXB1dGVyR2FtZWJvYXJkLmdldEhpdEFycmF5KCk7XG4gICAgY29uc3QgbWlzc0FycmF5ID0gY29tcHV0ZXJHYW1lYm9hcmQuZ2V0TWlzc2VkQXJyYXkoKTtcbiAgICBoaXRBcnJheS5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0Q2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAuY29tcHV0ZXItZ2FtZWJvYXJkID4gW2RhdGEtcm93PScke2Nvb3JkWzBdfSddW2RhdGEtY29sPScke2Nvb3JkWzFdfSddYCxcbiAgICAgICk7XG4gICAgICB0YXJnZXRDZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgIH0pO1xuICAgIG1pc3NBcnJheS5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0Q2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAuY29tcHV0ZXItZ2FtZWJvYXJkID4gW2RhdGEtcm93PScke2Nvb3JkWzBdfSddW2RhdGEtY29sPScke2Nvb3JkWzFdfSddYCxcbiAgICAgICk7XG4gICAgICB0YXJnZXRDZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3NlZCcpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZVBsYXllckdhbWVib2FyZCA9ICgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lTG9vcC5nZXRQbGF5ZXJHYW1lYm9hcmQoKTtcbiAgICBjb25zdCBoaXRBcnJheSA9IHBsYXllckdhbWVib2FyZC5nZXRIaXRBcnJheSgpO1xuICAgIGNvbnN0IG1pc3NBcnJheSA9IHBsYXllckdhbWVib2FyZC5nZXRNaXNzZWRBcnJheSgpO1xuICAgIGhpdEFycmF5LmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYC5wbGF5ZXItZ2FtZWJvYXJkID4gW2RhdGEtcm93PScke2Nvb3JkWzBdfSddW2RhdGEtY29sPScke2Nvb3JkWzFdfSddYCxcbiAgICAgICk7XG4gICAgICB0YXJnZXRDZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgIH0pO1xuICAgIG1pc3NBcnJheS5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0Q2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAucGxheWVyLWdhbWVib2FyZCA+IFtkYXRhLXJvdz0nJHtjb29yZFswXX0nXVtkYXRhLWNvbD0nJHtjb29yZFsxXX0nXWAsXG4gICAgICApO1xuICAgICAgdGFyZ2V0Q2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzZWQnKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBwcmludE1lc3NhZ2UgPSAocGxheWVyKSA9PiB7XG4gICAgaWYgKHBsYWNlTW9kZSkge1xuICAgICAgY29uc3QgbWVzc2FnZU9uZSA9XG4gICAgICAgICdSZWFycmFuZ2UgdGhlIHBvc2l0aW9uIG9mIHRoZSBzaGlwcyBieSBkcmFnZ2luZyBhbmQgZHJvcHBpbmcuJztcbiAgICAgIGNvbnN0IG1lc3NhZ2VUd28gPSAnQ2xpY2sgdGhlIHNoaXAgdG8gcm90YXRlIGl0Lic7XG4gICAgICBjb25zdCBtZXNzYWdlVGhyZWUgPVxuICAgICAgICAnU2hpcHMgbXVzdCBiZSBhdCBsZWFzdCBvbmUgZ3JpZCBhd2F5IGZyb20gZWFjaCBvdGhlci4nO1xuICAgICAgY29uc3QgbWVzc2FnZUFycmF5ID0gW21lc3NhZ2VPbmUsIG1lc3NhZ2VUd28sIG1lc3NhZ2VUaHJlZV07XG4gICAgICBtZXNzYWdlQXJyYXkuZm9yRWFjaCgobWVzc2FnZSkgPT4ge1xuICAgICAgICBjb25zdCBtZXNzYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgbWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgICAgICBtZXNzYWdlRGlzcGxheS5hcHBlbmQobWVzc2FnZUVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChwbGF5ZXIubmFtZSAhPT0gJ0NvbXB1dGVyJylcbiAgICAgIG1lc3NhZ2VEaXNwbGF5LnRleHRDb250ZW50ID0gYCR7cGxheWVyLm5hbWV9IHdpbnMuYDtcbiAgICBlbHNlIGlmIChwbGF5ZXIubmFtZSA9PT0gJ0NvbXB1dGVyJylcbiAgICAgIG1lc3NhZ2VEaXNwbGF5LnRleHRDb250ZW50ID0gJ0NvbXB1dGVyIHdpbnMuJztcbiAgICBnYW1lT3ZlciA9IHRydWU7XG4gIH07XG5cbiAgY29uc3QgcHJpbnROYW1lcyA9ICgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXIgPSBnYW1lTG9vcC5nZXRQbGF5ZXIoKTtcbiAgICBjb25zdCBjb21wdXRlciA9IGdhbWVMb29wLmdldENvbXB1dGVyKCk7XG4gICAgY29uc3QgcGxheWVyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItbmFtZScpO1xuICAgIGNvbnN0IGNvbXB1dGVyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wdXRlci1uYW1lJyk7XG4gICAgcGxheWVyTmFtZS50ZXh0Q29udGVudCA9IHBsYXllci5uYW1lO1xuICAgIGNvbXB1dGVyTmFtZS50ZXh0Q29udGVudCA9IGNvbXB1dGVyLm5hbWU7XG4gIH07XG5cbiAgY29uc3Qgc2V0VXBBdHRhY2tFdmVudExpc3RlbmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICcuY29tcHV0ZXItZ2FtZWJvYXJkJyxcbiAgICApO1xuICAgIGNvbXB1dGVyR2FtZWJvYXJkQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQ7XG5cbiAgICAgIGlmIChcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWlzc2VkJykgfHxcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaGl0JylcbiAgICAgIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBpZiAodGFyZ2V0LmNsb3Nlc3QoJy5ib2FyZC1jZWxsJykpIHtcbiAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQodGFyZ2V0LmRhdGFzZXQucm93LCAxMCk7XG4gICAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KHRhcmdldC5kYXRhc2V0LmNvbCwgMTApO1xuICAgICAgICBjb25zdCBhdHRhY2tDb29yZCA9IFtyb3csIGNvbF07XG4gICAgICAgIGdhbWVMb29wLnBsYXlSb3VuZChhdHRhY2tDb29yZCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3Qgc2V0VXBTaGlwc0RyYWdnYWJsZUV2ZW50TGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZHJhZ2dhYmxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcmFnZ2FibGUnKTtcblxuICAgIGRyYWdnYWJsZXMuZm9yRWFjaCgoZHJhZ2dhYmxlKSA9PiB7XG4gICAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGRyYWdnYWJsZS5jbGFzc0xpc3QuYWRkKCdkcmFnZ2luZycpO1xuXG4gICAgICAgIGNvbnN0IGNsaWNrZWRYID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgY29uc3QgY2xpY2tlZFkgPSBldmVudC5jbGllbnRZO1xuXG4gICAgICAgIGNvbnN0IHBsYXllckdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItZ2FtZWJvYXJkJyk7XG4gICAgICAgIGNvbnN0IGJvdW5kaW5nQm94ID0gcGxheWVyR2FtZWJvYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGNvbnN0IHJlbGF0aXZlWCA9IGNsaWNrZWRYIC0gYm91bmRpbmdCb3gubGVmdDtcbiAgICAgICAgY29uc3QgcmVsYXRpdmVZID0gY2xpY2tlZFkgLSBib3VuZGluZ0JveC50b3A7XG5cbiAgICAgICAgY29uc3QgY2VsbFdpZHRoID1cbiAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucXVlcnlTZWxlY3RvcignLmJvYXJkLWNlbGwnKS5vZmZzZXRXaWR0aDtcbiAgICAgICAgY29uc3QgY2VsbEhlaWdodCA9XG4gICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC1jZWxsJykub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIGNvbnN0IGNsaWNrZWRSb3cgPSBNYXRoLmZsb29yKHJlbGF0aXZlWSAvIGNlbGxIZWlnaHQpO1xuICAgICAgICBjb25zdCBjbGlja2VkQ29sID0gTWF0aC5mbG9vcihyZWxhdGl2ZVggLyBjZWxsV2lkdGgpO1xuXG4gICAgICAgIGNvbnN0IGluaXRpYWxDZWxsID0gcGxheWVyR2FtZWJvYXJkLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYFtkYXRhLXJvdz0nJHtjbGlja2VkUm93fSddW2RhdGEtY29sPScke2NsaWNrZWRDb2x9J11gLFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChpbml0aWFsQ2VsbCkge1xuICAgICAgICAgIGluaXRpYWxSb3cgPSBjbGlja2VkUm93O1xuICAgICAgICAgIGluaXRpYWxDb2wgPSBjbGlja2VkQ29sO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGluaXRpYWxSb3cgPSBudWxsO1xuICAgICAgICAgIGluaXRpYWxDb2wgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCAoKSA9PiB7XG4gICAgICAgIGRyYWdnYWJsZS5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2luZycpO1xuICAgICAgICBpbml0aWFsUm93ID0gbnVsbDtcbiAgICAgICAgaW5pdGlhbENvbCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBzZXRVcEJvYXJkQ2VsbHNEcmFnT3ZlckV2ZW50TGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1nYW1lYm9hcmQnKTtcblxuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgZHJhZ2dhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyYWdnaW5nJyk7XG5cbiAgICAgIGNvbnN0IGJvYXJkQ2VsbFNpemUgPSBjb250YWluZXJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC1jZWxsJylcbiAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgdGFyZ2V0Um93ID0gTWF0aC5mbG9vcihcbiAgICAgICAgKGV2ZW50LmNsaWVudFkgLSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKSAvXG4gICAgICAgICAgYm9hcmRDZWxsU2l6ZS5oZWlnaHQsXG4gICAgICApO1xuICAgICAgY29uc3QgdGFyZ2V0Q29sID0gTWF0aC5mbG9vcihcbiAgICAgICAgKGV2ZW50LmNsaWVudFggLSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCkgL1xuICAgICAgICAgIGJvYXJkQ2VsbFNpemUud2lkdGgsXG4gICAgICApO1xuXG4gICAgICBjb25zdCB0YXJnZXRDZWxsID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGBbZGF0YS1yb3c9JyR7dGFyZ2V0Um93fSddW2RhdGEtY29sPScke3RhcmdldENvbH0nXWAsXG4gICAgICApO1xuXG4gICAgICBpZiAoZHJhZ2dhYmxlICYmIHRhcmdldENlbGwpIHtcbiAgICAgICAgaWYgKGluaXRpYWxSb3cgIT09IG51bGwgJiYgaW5pdGlhbENvbCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IHJvd09mZnNldCA9IHRhcmdldFJvdyAtIGluaXRpYWxSb3c7XG4gICAgICAgICAgY29uc3QgY29sT2Zmc2V0ID0gdGFyZ2V0Q29sIC0gaW5pdGlhbENvbDtcbiAgICAgICAgICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lTG9vcC5nZXRQbGF5ZXJHYW1lYm9hcmQoKTtcbiAgICAgICAgICBjb25zdCBuZXdTdGFydCA9IHBsYXllckdhbWVib2FyZC51cGRhdGVTaGlwQ29vcmRpbmF0ZXMoXG4gICAgICAgICAgICBpbml0aWFsUm93LFxuICAgICAgICAgICAgaW5pdGlhbENvbCxcbiAgICAgICAgICAgIHJvd09mZnNldCxcbiAgICAgICAgICAgIGNvbE9mZnNldCxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKCFuZXdTdGFydCkgcmV0dXJuO1xuXG4gICAgICAgICAgY29uc3QgcmVhbFRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgLnBsYXllci1nYW1lYm9hcmQgPiBbZGF0YS1yb3c9JyR7bmV3U3RhcnRbMF19J11bZGF0YS1jb2w9JyR7bmV3U3RhcnRbMV19J11gLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAocmVhbFRhcmdldCAhPT0gZHJhZ2dhYmxlLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHJlYWxUYXJnZXQuYXBwZW5kQ2hpbGQoZHJhZ2dhYmxlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBzZXRVcFNoYWtlRW5kRXZlbnRMaXN0ZW5lciA9ICgpID0+IHtcbiAgICBjb25zdCBkcmFnZ2FibGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyYWdnYWJsZScpO1xuICAgIGRyYWdnYWJsZXMuZm9yRWFjaCgoZHJhZ2dhYmxlKSA9PiB7XG4gICAgICBkcmFnZ2FibGUuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgKCkgPT4ge1xuICAgICAgICBkcmFnZ2FibGUuY2xhc3NMaXN0LnJlbW92ZSgnc2hha2UnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHNldFVwUm90YXRlU2hpcEV2ZW50TGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZHJhZ2dhYmxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcmFnZ2FibGUnKTtcbiAgICBkcmFnZ2FibGVzLmZvckVhY2goKGRyYWdnYWJsZSkgPT4ge1xuICAgICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lTG9vcC5nZXRQbGF5ZXJHYW1lYm9hcmQoKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0Q2VsbCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuYm9hcmQtY2VsbCcpO1xuICAgICAgICBjb25zdCB0YXJnZXRSb3cgPSBwYXJzZUludCh0YXJnZXRDZWxsLmRhdGFzZXQucm93LCAxMCk7XG4gICAgICAgIGNvbnN0IHRhcmdldENvbCA9IHBhcnNlSW50KHRhcmdldENlbGwuZGF0YXNldC5jb2wsIDEwKTtcbiAgICAgICAgY29uc3QgbmV3Q29vcmRpbmF0ZXNBcnJheSA9IHBsYXllckdhbWVib2FyZC5yb3RhdGVTaGlwKFxuICAgICAgICAgIHRhcmdldFJvdyxcbiAgICAgICAgICB0YXJnZXRDb2wsXG4gICAgICAgICk7XG4gICAgICAgIGlmICghbmV3Q29vcmRpbmF0ZXNBcnJheSkge1xuICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdzaGFrZScpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0YXJnZXRDZWxsLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIGNsZWFyR2FtZUJvYXJkKCk7XG4gICAgICAgIHJlbmRlclNoaXBzKCk7XG4gICAgICAgIHNldFVwU2hpcHNEcmFnZ2FibGVFdmVudExpc3RlbmVyKCk7XG4gICAgICAgIHNldFVwUm90YXRlU2hpcEV2ZW50TGlzdGVuZXIoKTtcbiAgICAgICAgc2V0VXBTaGFrZUVuZEV2ZW50TGlzdGVuZXIoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHNob3dHYW1lQ29udGVudCA9ICgpID0+IHtcbiAgICBjb25zdCBnYW1lQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLXNlY3Rpb24nKTtcbiAgICBjb25zdCBpbnRyb0NvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW50cm8tY29udGVudCcpO1xuICAgIGNvbnN0IGJ1dHRvblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLXNlY3Rpb24nKTtcbiAgICBidXR0b25TZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBnYW1lQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgaW50cm9Db250ZW50LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgfTtcblxuICBjb25zdCBzZXR1cFJhbmRvbWl6ZVNoaXBzRXZlbnRMaXN0ZW5lciA9ICgpID0+IHtcbiAgICBjb25zdCByYW5kb21CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmFuZG9tLWJ1dHRvbicpO1xuICAgIHJhbmRvbUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNsZWFyR2FtZUJvYXJkKCk7XG4gICAgICBwb3B1bGF0ZUdhbWVib2FyZCgpO1xuICAgICAgc2V0VXBTaGlwc0RyYWdnYWJsZUV2ZW50TGlzdGVuZXIoKTtcbiAgICAgIHNldFVwUm90YXRlU2hpcEV2ZW50TGlzdGVuZXIoKTtcbiAgICAgIHNldFVwU2hha2VFbmRFdmVudExpc3RlbmVyKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3Qgc2V0dXBTdGFydEdhbWVFdmVudExpc3RlbmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0LWJ1dHRvbicpO1xuICAgIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgcGxhY2VNb2RlID0gZmFsc2U7XG4gICAgICBjbGVhckRpc3BsYXlNZXNzYWdlKCk7XG4gICAgICB0b2dnbGVHYW1lYm9hcmRFdmVudExpc3RlbmVyU3RhdHVzKCk7XG4gICAgICB0b2dnbGVCdXR0b25TZWN0aW9uRGlzcGxheSgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHNldHVwUmVzdGFydEdhbWVFdmVudExpc3RlbmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHJlc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdGFydC1idXR0b24nKTtcbiAgICByZXN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgcGxhY2VNb2RlID0gdHJ1ZTtcbiAgICAgIGdhbWVPdmVyID0gZmFsc2U7XG4gICAgICB0b2dnbGVCdXR0b25TZWN0aW9uRGlzcGxheSgpO1xuICAgICAgcmVzZXRHYW1lQm9hcmQoKTtcbiAgICAgIGNsZWFyRGlzcGxheU1lc3NhZ2UoKTtcbiAgICAgIHNldFVwR2FtZSgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHNldFVwQWxsRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgc2V0VXBBdHRhY2tFdmVudExpc3RlbmVyKCk7XG4gICAgc2V0VXBTaGlwc0RyYWdnYWJsZUV2ZW50TGlzdGVuZXIoKTtcbiAgICBzZXRVcEJvYXJkQ2VsbHNEcmFnT3ZlckV2ZW50TGlzdGVuZXIoKTtcbiAgICBzZXRVcFJvdGF0ZVNoaXBFdmVudExpc3RlbmVyKCk7XG4gICAgc2V0VXBTaGFrZUVuZEV2ZW50TGlzdGVuZXIoKTtcbiAgICBzZXR1cFJhbmRvbWl6ZVNoaXBzRXZlbnRMaXN0ZW5lcigpO1xuICAgIHNldHVwU3RhcnRHYW1lRXZlbnRMaXN0ZW5lcigpO1xuICAgIHNldHVwUmVzdGFydEdhbWVFdmVudExpc3RlbmVyKCk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRVcEdhbWUoKSB7XG4gICAgY3JlYXRlR3JpZHMoKTtcbiAgICBnYW1lTG9vcC5yZXNldENvbXB1dGVyKCk7XG4gICAgcHJpbnROYW1lcygpO1xuICAgIHByaW50TWVzc2FnZSgpO1xuICAgIHBvcHVsYXRlR2FtZWJvYXJkKCk7XG4gICAgc2V0VXBBbGxFdmVudExpc3RlbmVycygpO1xuICAgIHRvZ2dsZUdhbWVib2FyZEV2ZW50TGlzdGVuZXJTdGF0dXMoKTtcbiAgfVxuXG4gIGNvbnN0IHNldFVwTmFtZVN1Ym1pdEV2ZW50TGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1pdC1idXR0b24nKTtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYW1lLWlucHV0Jyk7XG4gICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgbmFtZSA9IGlucHV0LnZhbHVlO1xuICAgICAgaWYgKG5hbWUgPT09ICcnKSBnYW1lTG9vcC5jcmVhdGVQbGF5ZXJzKCk7XG4gICAgICBlbHNlIGdhbWVMb29wLmNyZWF0ZVBsYXllcnMobmFtZSk7XG4gICAgICBzZXRVcEdhbWUoKTtcbiAgICAgIHNob3dHYW1lQ29udGVudCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcHJpbnRNZXNzYWdlLFxuICAgIHVwZGF0ZVBsYXllckdhbWVib2FyZCxcbiAgICB1cGRhdGVDb21wdXRlckdhbWVib2FyZCxcbiAgICBzZXRVcE5hbWVTdWJtaXRFdmVudExpc3RlbmVyLFxuICAgIHRvZ2dsZUdhbWVib2FyZEV2ZW50TGlzdGVuZXJTdGF0dXMsXG4gICAgdG9nZ2xlQnV0dG9uU2VjdGlvbkRpc3BsYXksXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBET01Nb2R1bGU7XG4iLCJpbXBvcnQgZ2FtZUxvb3AgZnJvbSAnLi9nYW1lX2xvb3AnO1xuXG5jb25zdCBjcmVhdGVDb21wdXRlciA9IChnYW1lYm9hcmQsIG5hbWUgPSAnQ29tcHV0ZXInKSA9PiB7XG4gIGxldCBhbGxDb29yZGluYXRlcyA9IFtdO1xuICBsZXQgdGFyZ2V0UXVldWUgPSBbXTtcbiAgbGV0IGxhc3RIaXQ7XG4gIGxldCBmaXJzdEhpdDtcbiAgbGV0IGRpcmVjdGlvbjtcblxuICBjb25zdCByZW1vdmVEdXBsaWNhdGVzID0gKGFycmF5KSA9PiB7XG4gICAgYXJyYXkuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gYWxsQ29vcmRpbmF0ZXMuZmluZEluZGV4KFxuICAgICAgICAoaXRlbSkgPT4gaXRlbVswXSA9PT0gY29vcmRbMF0gJiYgaXRlbVsxXSA9PT0gY29vcmRbMV0sXG4gICAgICApO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBhbGxDb29yZGluYXRlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHJlc2V0Q29tcHV0ZXIoKSB7XG4gICAgYWxsQ29vcmRpbmF0ZXMgPSBbXTtcbiAgICB0YXJnZXRRdWV1ZSA9IFtdO1xuICAgIGNvbnN0IGdyaWRTaXplID0gMTA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkU2l6ZTsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdyaWRTaXplOyBqICs9IDEpIHtcbiAgICAgICAgYWxsQ29vcmRpbmF0ZXMucHVzaChbaSwgal0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSBhbGxDb29yZGluYXRlcy5sZW5ndGggLSAxOyBpID4gMDsgaSAtPSAxKSB7XG4gICAgICBjb25zdCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICBbYWxsQ29vcmRpbmF0ZXNbaV0sIGFsbENvb3JkaW5hdGVzW2pdXSA9IFtcbiAgICAgICAgYWxsQ29vcmRpbmF0ZXNbal0sXG4gICAgICAgIGFsbENvb3JkaW5hdGVzW2ldLFxuICAgICAgXTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBnZXROZXh0RGlyZWN0aW9uID0gKGRpcikgPT4ge1xuICAgIHN3aXRjaCAoZGlyKSB7XG4gICAgICBjYXNlICd1cCc6XG4gICAgICAgIHJldHVybiAnZG93bic7XG4gICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXROZXh0VGFyZ2V0SW5TYW1lRGlyZWN0aW9uID0gKHBsYXllckdhbWVib2FyZCwgdGFyZ2V0KSA9PiB7XG4gICAgbGV0IHZhbGlkQXR0YWNrID0gZmFsc2U7XG4gICAgbGV0IHRyaWVkQWxsRGlyZWN0aW9ucyA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKCF2YWxpZEF0dGFjayAmJiAhdHJpZWRBbGxEaXJlY3Rpb25zKSB7XG4gICAgICBjb25zdCBuZXh0VGFyZ2V0ID0gWy4uLnRhcmdldF07XG4gICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgbmV4dFRhcmdldFswXSAtPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICBuZXh0VGFyZ2V0WzBdICs9IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgIG5leHRUYXJnZXRbMV0gLT0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBuZXh0VGFyZ2V0WzFdICs9IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgcGxheWVyR2FtZWJvYXJkLmlzQmV5b25kQm9hcmQobmV4dFRhcmdldCkgfHxcbiAgICAgICAgcGxheWVyR2FtZWJvYXJkLmlzTWlzc2VkKG5leHRUYXJnZXRbMF0sIG5leHRUYXJnZXRbMV0pIHx8XG4gICAgICAgIHBsYXllckdhbWVib2FyZC5pc0hpdChuZXh0VGFyZ2V0WzBdLCBuZXh0VGFyZ2V0WzFdKVxuICAgICAgKSB7XG4gICAgICAgIGRpcmVjdGlvbiA9IGdldE5leHREaXJlY3Rpb24oZGlyZWN0aW9uKTtcblxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBudWxsKSB7XG4gICAgICAgICAgdHJpZWRBbGxEaXJlY3Rpb25zID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0cmllZEFsbERpcmVjdGlvbnMpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPT09IGxhc3RIaXQgPyBmaXJzdEhpdCA6IGxhc3RIaXQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWxpZEF0dGFjayA9IHRydWU7XG4gICAgICAgIHJldHVybiBuZXh0VGFyZ2V0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBjb25zdCBjb21wdXRlckF0dGFjayA9ICgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lTG9vcC5nZXRQbGF5ZXJHYW1lYm9hcmQoKTtcbiAgICByZW1vdmVEdXBsaWNhdGVzKHBsYXllckdhbWVib2FyZC5nZXRNaXNzZWRBcnJheSgpKTtcbiAgICBpZiAodGFyZ2V0UXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgcmVtb3ZlRHVwbGljYXRlcyh0YXJnZXRRdWV1ZSk7XG4gICAgICBjb25zdCBuZXh0QXR0YWNrID0gdGFyZ2V0UXVldWUuc2hpZnQoKTtcbiAgICAgIHBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKG5leHRBdHRhY2spO1xuICAgICAgaWYgKHBsYXllckdhbWVib2FyZC5pc0hpdChuZXh0QXR0YWNrWzBdLCBuZXh0QXR0YWNrWzFdKSkge1xuICAgICAgICBpZiAocGxheWVyR2FtZWJvYXJkLmdldFNoaXAobmV4dEF0dGFja1swXSwgbmV4dEF0dGFja1sxXSkuc3VuaykgcmV0dXJuO1xuICAgICAgICBsYXN0SGl0ID0gbmV4dEF0dGFjaztcbiAgICAgICAgY29uc3QgbmV4dFRhcmdldCA9IGdldE5leHRUYXJnZXRJblNhbWVEaXJlY3Rpb24oXG4gICAgICAgICAgcGxheWVyR2FtZWJvYXJkLFxuICAgICAgICAgIGxhc3RIaXQsXG4gICAgICAgICk7XG4gICAgICAgIGlmIChuZXh0VGFyZ2V0KSB0YXJnZXRRdWV1ZS51bnNoaWZ0KG5leHRUYXJnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlyZWN0aW9uID0gZ2V0TmV4dERpcmVjdGlvbihkaXJlY3Rpb24pO1xuICAgICAgICBjb25zdCBuZXh0VGFyZ2V0ID0gZ2V0TmV4dFRhcmdldEluU2FtZURpcmVjdGlvbihcbiAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQsXG4gICAgICAgICAgZmlyc3RIaXQsXG4gICAgICAgICk7XG4gICAgICAgIGlmIChuZXh0VGFyZ2V0KSB0YXJnZXRRdWV1ZS51bnNoaWZ0KG5leHRUYXJnZXQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXh0QXR0YWNrID0gYWxsQ29vcmRpbmF0ZXMucG9wKCk7XG4gICAgICBwbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhuZXh0QXR0YWNrKTtcbiAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuaXNIaXQobmV4dEF0dGFja1swXSwgbmV4dEF0dGFja1sxXSkpIHtcbiAgICAgICAgZmlyc3RIaXQgPSBbLi4ubmV4dEF0dGFja107XG4gICAgICAgIGxhc3RIaXQgPSBuZXh0QXR0YWNrO1xuICAgICAgICBkaXJlY3Rpb24gPSAndXAnO1xuICAgICAgICBjb25zdCBuZXh0VGFyZ2V0ID0gZ2V0TmV4dFRhcmdldEluU2FtZURpcmVjdGlvbihcbiAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQsXG4gICAgICAgICAgbGFzdEhpdCxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG5leHRUYXJnZXQpIHRhcmdldFF1ZXVlLnVuc2hpZnQobmV4dFRhcmdldCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IG5hbWUsIGdhbWVib2FyZCwgY29tcHV0ZXJBdHRhY2ssIHJlc2V0Q29tcHV0ZXIgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXB1dGVyO1xuIiwiaW1wb3J0IERPTU1vZHVsZSBmcm9tICcuL0RPTSc7XG5pbXBvcnQgY3JlYXRlQ29tcHV0ZXIgZnJvbSAnLi9jb21wdXRlcic7XG5pbXBvcnQgY3JlYXRlUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuXG5jb25zdCBnYW1lTG9vcCA9ICgoKSA9PiB7XG4gIGxldCBwbGF5ZXI7XG4gIGxldCBjb21wdXRlcjtcblxuICBjb25zdCBjcmVhdGVQbGF5ZXJzID0gKG5hbWUpID0+IHtcbiAgICBwbGF5ZXIgPSBjcmVhdGVQbGF5ZXIoZ2FtZWJvYXJkKCksIG5hbWUpO1xuICAgIGNvbXB1dGVyID0gY3JlYXRlQ29tcHV0ZXIoZ2FtZWJvYXJkKCkpO1xuICB9O1xuXG4gIGNvbnN0IGF1dG9QbGFjZVNoaXBzID0gKCkgPT4ge1xuICAgIGNvbnN0IGFyciA9IFtwbGF5ZXIsIGNvbXB1dGVyXTtcbiAgICBhcnIuZm9yRWFjaCgocGxheWVyKSA9PiB7XG4gICAgICBwbGF5ZXIuZ2FtZWJvYXJkLmF1dG9QbGFjZVNoaXBzKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0UGxheWVyR2FtZWJvYXJkID0gKCkgPT4gcGxheWVyLmdhbWVib2FyZDtcblxuICBjb25zdCBnZXRDb21wdXRlckdhbWVib2FyZCA9ICgpID0+IGNvbXB1dGVyLmdhbWVib2FyZDtcblxuICBjb25zdCBnZXRDb21wdXRlciA9ICgpID0+IGNvbXB1dGVyO1xuXG4gIGNvbnN0IGdldFBsYXllciA9ICgpID0+IHBsYXllcjtcblxuICBjb25zdCBwbGF5ZXJXaW4gPSAoKSA9PiBjb21wdXRlci5nYW1lYm9hcmQuYXJlQWxsU2hpcHNTdW5rKCk7XG5cbiAgY29uc3QgY29tcHV0ZXJXaW5zID0gKCkgPT4gcGxheWVyLmdhbWVib2FyZC5hcmVBbGxTaGlwc1N1bmsoKTtcblxuICBjb25zdCByZXNldENvbXB1dGVyID0gKCkgPT4gY29tcHV0ZXIucmVzZXRDb21wdXRlcigpO1xuXG4gIGNvbnN0IGNoZWNrV2luID0gKCkgPT4ge1xuICAgIGlmIChwbGF5ZXJXaW4oKSkgRE9NTW9kdWxlLnByaW50TWVzc2FnZShnZXRQbGF5ZXIoKSk7XG4gICAgZWxzZSBpZiAoY29tcHV0ZXJXaW5zKCkpIERPTU1vZHVsZS5wcmludE1lc3NhZ2UoZ2V0Q29tcHV0ZXIoKSk7XG5cbiAgICBpZiAocGxheWVyV2luKCkgfHwgY29tcHV0ZXJXaW5zKCkpIHtcbiAgICAgIERPTU1vZHVsZS50b2dnbGVHYW1lYm9hcmRFdmVudExpc3RlbmVyU3RhdHVzKCk7XG4gICAgICBET01Nb2R1bGUudG9nZ2xlQnV0dG9uU2VjdGlvbkRpc3BsYXkoKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIHBsYXlSb3VuZChjb29yZCkge1xuICAgIGNvbXB1dGVyLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkKTtcbiAgICBET01Nb2R1bGUudXBkYXRlQ29tcHV0ZXJHYW1lYm9hcmQoKTtcblxuICAgIGlmIChjaGVja1dpbigpKSByZXR1cm47XG5cbiAgICBjb21wdXRlci5jb21wdXRlckF0dGFjaygpO1xuICAgIERPTU1vZHVsZS51cGRhdGVQbGF5ZXJHYW1lYm9hcmQoKTtcblxuICAgIGlmIChjaGVja1dpbigpKSByZXR1cm47XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZVBsYXllcnMsXG4gICAgYXV0b1BsYWNlU2hpcHMsXG4gICAgZ2V0UGxheWVyR2FtZWJvYXJkLFxuICAgIGdldENvbXB1dGVyR2FtZWJvYXJkLFxuICAgIHBsYXlSb3VuZCxcbiAgICBnZXRDb21wdXRlcixcbiAgICBnZXRQbGF5ZXIsXG4gICAgcmVzZXRDb21wdXRlcixcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVMb29wO1xuIiwiaW1wb3J0IGNyZWF0ZVNoaXAgZnJvbSAnLi9zaGlwJztcblxuY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xuICBsZXQgc2hpcHNBcnJheSA9IFtdO1xuICBsZXQgbWlzc2VkQXJyYXkgPSBbXTtcbiAgbGV0IGhpdEFycmF5ID0gW107XG4gIGxldCB2ZXJ0aWNhbCA9IGZhbHNlO1xuXG4gIGNvbnN0IHNldFZlcnRpY2FsID0gKCkgPT4gKHZlcnRpY2FsID0gdHJ1ZSk7XG5cbiAgY29uc3Qgc2V0SG9yaXpvbnRhbCA9ICgpID0+ICh2ZXJ0aWNhbCA9IGZhbHNlKTtcblxuICBjb25zdCBpc0JleW9uZEJvYXJkID0gKFtyb3csIGNvbF0pID0+IHtcbiAgICBpZiAocm93IDwgMCB8fCByb3cgPiA5IHx8IGNvbCA8IDAgfHwgY29sID4gOSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGlzT2NjdXBpZWQgPSAoW3JvdywgY29sXSkgPT5cbiAgICBzaGlwc0FycmF5LnNvbWUoKHNoaXApID0+XG4gICAgICBzaGlwLmNvb3JkaW5hdGVzLnNvbWUoKGNvb3JkKSA9PiBjb29yZFswXSA9PT0gcm93ICYmIGNvb3JkWzFdID09PSBjb2wpLFxuICAgICk7XG5cbiAgY29uc3QgZ2V0UmluZ0Nvb3JkaW5hdGVzID0gKGFycmF5KSA9PiB7XG4gICAgY29uc3QgbmVpZ2hib3JpbmdDb29yZGluYXRlcyA9IFtdO1xuXG4gICAgY29uc3QgZGlyZWN0aW9ucyA9IFtcbiAgICAgIFstMSwgMF0sXG4gICAgICBbMSwgMF0sXG4gICAgICBbMCwgLTFdLFxuICAgICAgWzAsIDFdLFxuICAgICAgWy0xLCAtMV0sXG4gICAgICBbLTEsIDFdLFxuICAgICAgWzEsIC0xXSxcbiAgICAgIFsxLCAxXSxcbiAgICBdO1xuICAgIGFycmF5LmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBkaXJlY3Rpb25zLmZvckVhY2goKGRpcikgPT4ge1xuICAgICAgICBjb25zdCBuZWlnaGJvciA9IFtjb29yZFswXSArIGRpclswXSwgY29vcmRbMV0gKyBkaXJbMV1dO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIWFycmF5LnNvbWUoXG4gICAgICAgICAgICAoY29vcmQpID0+IGNvb3JkWzBdID09PSBuZWlnaGJvclswXSAmJiBjb29yZFsxXSA9PT0gbmVpZ2hib3JbMV0sXG4gICAgICAgICAgKSAmJlxuICAgICAgICAgICFpc0JleW9uZEJvYXJkKG5laWdoYm9yKSAmJlxuICAgICAgICAgICFuZWlnaGJvcmluZ0Nvb3JkaW5hdGVzLnNvbWUoXG4gICAgICAgICAgICAoY29vcmQpID0+IGNvb3JkWzBdID09PSBuZWlnaGJvclswXSAmJiBjb29yZFsxXSA9PT0gbmVpZ2hib3JbMV0sXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgICAgbmVpZ2hib3JpbmdDb29yZGluYXRlcy5wdXNoKG5laWdoYm9yKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5laWdoYm9yaW5nQ29vcmRpbmF0ZXM7XG4gIH07XG5cbiAgY29uc3QgaXNOZXh0VG9TaGlwcyA9IChhcnJheSkgPT4ge1xuICAgIGNvbnN0IHJpbmdDb29yZGluYXRlcyA9IGdldFJpbmdDb29yZGluYXRlcyhhcnJheSk7XG4gICAgcmV0dXJuIHJpbmdDb29yZGluYXRlcy5zb21lKChjb29yZCkgPT5cbiAgICAgIHNoaXBzQXJyYXkuc29tZSgoc2hpcCkgPT5cbiAgICAgICAgc2hpcC5jb29yZGluYXRlcy5zb21lKFxuICAgICAgICAgIChzaGlwQ29vcmQpID0+IHNoaXBDb29yZFswXSA9PT0gY29vcmRbMF0gJiYgc2hpcENvb3JkWzFdID09PSBjb29yZFsxXSxcbiAgICAgICAgKSxcbiAgICAgICksXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBpc0hpdCA9IChyb3csIGNvbCkgPT5cbiAgICBoaXRBcnJheS5zb21lKChjb29yZCkgPT4gY29vcmRbMF0gPT09IHJvdyAmJiBjb29yZFsxXSA9PT0gY29sKTtcblxuICBjb25zdCBpc01pc3NlZCA9IChyb3csIGNvbCkgPT5cbiAgICBtaXNzZWRBcnJheS5zb21lKChjb29yZCkgPT4gY29vcmRbMF0gPT09IHJvdyAmJiBjb29yZFsxXSA9PT0gY29sKTtcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiBzaGlwc0FycmF5LnNvbWUoKHNoaXApID0+IHNoaXAuc3Vuayk7XG5cbiAgY29uc3QgYWRkVG9NaXNzZWRBcnJheSA9IChbcm93LCBjb2xdKSA9PiB7XG4gICAgaWYgKCFtaXNzZWRBcnJheS5maW5kKChtQ29vcmQpID0+IG1Db29yZFswXSA9PT0gcm93ICYmIG1Db29yZFsxXSA9PT0gY29sKSlcbiAgICAgIG1pc3NlZEFycmF5LnB1c2goW3JvdywgY29sXSk7XG4gIH07XG5cbiAgY29uc3QgZ2VuZXJhdGVTaGlwQ29vcmRpbmF0ZXMgPSAobGVuZ3RoLCBjb29yZGluYXRlcykgPT4ge1xuICAgIGxldCByb3cgPSBjb29yZGluYXRlc1swXTtcbiAgICBsZXQgY29sID0gY29vcmRpbmF0ZXNbMV07XG4gICAgY29uc3QgY29vcmRpbmF0ZXNBcnJheSA9IFtdO1xuICAgIGNvb3JkaW5hdGVzQXJyYXkucHVzaChjb29yZGluYXRlcyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aCAtIDE7IGkgKz0gMSkge1xuICAgICAgbGV0IG5ld0Nvb3JkaW5hdGVzO1xuICAgICAgaWYgKHZlcnRpY2FsKSBuZXdDb29yZGluYXRlcyA9IFsocm93ICs9IDEpLCBjb2xdO1xuICAgICAgZWxzZSBuZXdDb29yZGluYXRlcyA9IFtyb3csIChjb2wgKz0gMSldO1xuICAgICAgY29vcmRpbmF0ZXNBcnJheS5wdXNoKG5ld0Nvb3JkaW5hdGVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29vcmRpbmF0ZXNBcnJheTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAobGVuZ3RoLCBjb29yZGluYXRlcykgPT4ge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzQXJyYXkgPSBnZW5lcmF0ZVNoaXBDb29yZGluYXRlcyhsZW5ndGgsIGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoXG4gICAgICBpc05leHRUb1NoaXBzKGNvb3JkaW5hdGVzQXJyYXkpIHx8XG4gICAgICBjb29yZGluYXRlc0FycmF5LnNvbWUoKGNvb3JkcykgPT4gaXNPY2N1cGllZChjb29yZHMpKSB8fFxuICAgICAgY29vcmRpbmF0ZXNBcnJheS5zb21lKChjb29yZHMpID0+IGlzQmV5b25kQm9hcmQoY29vcmRzKSlcbiAgICApXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgQ29vcmRpbmF0ZXMnKTtcbiAgICBjb25zdCBjb29yZHMgPSBbLi4uY29vcmRpbmF0ZXNBcnJheV07XG4gICAgY29uc3Qgc2hpcEluc3RhbmNlID0gY3JlYXRlU2hpcChsZW5ndGgsIGNvb3JkaW5hdGVzQXJyYXksIGNvb3Jkc1swXSk7XG4gICAgc2hpcHNBcnJheS5wdXNoKHNoaXBJbnN0YW5jZSk7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChbcm93LCBjb2xdKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gc2hpcHNBcnJheS5maWx0ZXIoKHNoaXApID0+XG4gICAgICBzaGlwLmNvb3JkaW5hdGVzLnNvbWUoKGNvb3JkKSA9PiBjb29yZFswXSA9PT0gcm93ICYmIGNvb3JkWzFdID09PSBjb2wpLFxuICAgICk7XG4gICAgaWYgKHRhcmdldC5sZW5ndGggPiAwKSB7XG4gICAgICB0YXJnZXRbMF0uaGl0KCk7XG4gICAgICB0YXJnZXRbMF0uaXNTdW5rKCk7XG4gICAgICBoaXRBcnJheS5wdXNoKFtyb3csIGNvbF0pO1xuICAgICAgaWYgKHRhcmdldFswXS5zdW5rKSB7XG4gICAgICAgIGNvbnN0IHJpbmdDb29yZGluYXRlc0FycmF5ID0gZ2V0UmluZ0Nvb3JkaW5hdGVzKHRhcmdldFswXS5jb29yZGluYXRlcyk7XG4gICAgICAgIHJpbmdDb29yZGluYXRlc0FycmF5LmZvckVhY2goKGNvb3JkKSA9PiBhZGRUb01pc3NlZEFycmF5KGNvb3JkKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIG1pc3NlZEFycmF5LnB1c2goW3JvdywgY29sXSk7XG4gIH07XG5cbiAgY29uc3QgYXV0b1BsYWNlU2hpcHMgPSAoKSA9PiB7XG4gICAgc2hpcHNBcnJheSA9IFtdO1xuICAgIG1pc3NlZEFycmF5ID0gW107XG4gICAgaGl0QXJyYXkgPSBbXTtcbiAgICBjb25zdCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXTtcblxuICAgIHNoaXBMZW5ndGhzLmZvckVhY2goKGxlbmd0aCkgPT4ge1xuICAgICAgbGV0IGlzVmFsaWRQbGFjZW1lbnQgPSBmYWxzZTtcblxuICAgICAgd2hpbGUgKCFpc1ZhbGlkUGxhY2VtZW50KSB7XG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC41KSB7XG4gICAgICAgICAgc2V0VmVydGljYWwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRIb3Jpem9udGFsKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIGNvbnN0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbcm93LCBjb2xdO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcGxhY2VTaGlwKGxlbmd0aCwgY29vcmRpbmF0ZXMpO1xuICAgICAgICAgIGlzVmFsaWRQbGFjZW1lbnQgPSB0cnVlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge31cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBhcmVBbGxTaGlwc1N1bmsgPSAoKSA9PiBzaGlwc0FycmF5LmV2ZXJ5KChzaGlwKSA9PiBzaGlwLnN1bmspO1xuXG4gIGNvbnN0IGdldFNoaXBzQXJyYXkgPSAoKSA9PiBzaGlwc0FycmF5O1xuXG4gIGNvbnN0IGdldE1pc3NlZEFycmF5ID0gKCkgPT4gbWlzc2VkQXJyYXk7XG5cbiAgY29uc3QgZ2V0SGl0QXJyYXkgPSAoKSA9PiBoaXRBcnJheTtcblxuICBjb25zdCBnZXRTaGlwID0gKHJvdywgY29sKSA9PiB7XG4gICAgY29uc3QgYXJyYXkgPSBzaGlwc0FycmF5LmZpbHRlcigoc2hpcCkgPT5cbiAgICAgIHNoaXAuY29vcmRpbmF0ZXMuc29tZSgoY29vcmQpID0+IGNvb3JkWzBdID09PSByb3cgJiYgY29vcmRbMV0gPT09IGNvbCksXG4gICAgKTtcbiAgICByZXR1cm4gYXJyYXlbMF07XG4gIH07XG5cbiAgY29uc3QgZ2V0QWxsU3Vua1NoaXBzID0gKCkgPT4gc2hpcHNBcnJheS5maWx0ZXIoKHNoaXApID0+IHNoaXAuc3Vuayk7XG5cbiAgY29uc3QgdXBkYXRlU2hpcENvb3JkaW5hdGVzID0gKFxuICAgIGluaXRpYWxSb3csXG4gICAgaW5pdGlhbENvbCxcbiAgICByb3dPZmZzZXQsXG4gICAgY29sT2Zmc2V0LFxuICApID0+IHtcbiAgICBjb25zdCB0YXJnZXRTaGlwID0gZ2V0U2hpcChpbml0aWFsUm93LCBpbml0aWFsQ29sKTtcbiAgICBpZiAoIXRhcmdldFNoaXApIHJldHVybjtcbiAgICBjb25zdCBzdGFydENvcHkgPSBbLi4udGFyZ2V0U2hpcC5zdGFydF07XG4gICAgY29uc3QgY29vcmRpbmF0ZXNDb3B5ID0gWy4uLnRhcmdldFNoaXAuY29vcmRpbmF0ZXNdO1xuICAgIGNvbnN0IG5ld1JvdyA9IHN0YXJ0Q29weVswXSArIHJvd09mZnNldDtcbiAgICBjb25zdCBuZXdDb2wgPSBzdGFydENvcHlbMV0gKyBjb2xPZmZzZXQ7XG5cbiAgICBpZiAoY29vcmRpbmF0ZXNDb3B5WzBdWzBdID09PSB0YXJnZXRTaGlwLmNvb3JkaW5hdGVzWzFdWzBdKSBzZXRIb3Jpem9udGFsKCk7XG4gICAgZWxzZSBzZXRWZXJ0aWNhbCgpO1xuICAgIGNvbnN0IG5ld0Nvb3JkbmlhdGVzQXJyYXkgPSBnZW5lcmF0ZVNoaXBDb29yZGluYXRlcyh0YXJnZXRTaGlwLmxlbmd0aCwgW1xuICAgICAgbmV3Um93LFxuICAgICAgbmV3Q29sLFxuICAgIF0pO1xuICAgIHRhcmdldFNoaXAuc3RhcnQgPSBbXTtcbiAgICB0YXJnZXRTaGlwLmNvb3JkaW5hdGVzID0gW107XG4gICAgaWYgKFxuICAgICAgbmV3Q29vcmRuaWF0ZXNBcnJheS5zb21lKChjb29yZHMpID0+IGlzQmV5b25kQm9hcmQoY29vcmRzKSkgfHxcbiAgICAgIG5ld0Nvb3JkbmlhdGVzQXJyYXkuc29tZSgoY29vcmRzKSA9PiBpc09jY3VwaWVkKGNvb3JkcykpIHx8XG4gICAgICBpc05leHRUb1NoaXBzKG5ld0Nvb3JkbmlhdGVzQXJyYXkpXG4gICAgKSB7XG4gICAgICB0YXJnZXRTaGlwLnN0YXJ0ID0gc3RhcnRDb3B5O1xuICAgICAgdGFyZ2V0U2hpcC5jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzQ29weTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGFyZ2V0U2hpcC5jb29yZGluYXRlcyA9IG5ld0Nvb3JkbmlhdGVzQXJyYXk7XG4gICAgdGFyZ2V0U2hpcC5zdGFydCA9IFtuZXdSb3csIG5ld0NvbF07XG4gICAgcmV0dXJuIHRhcmdldFNoaXAuc3RhcnQ7XG4gIH07XG5cbiAgY29uc3Qgcm90YXRlU2hpcCA9IChyb3csIGNvbCkgPT4ge1xuICAgIGNvbnN0IHRhcmdldFNoaXAgPSBnZXRTaGlwKHJvdywgY29sKTtcbiAgICBjb25zdCBjb29yZGluYXRlc0NvcHkgPSBbLi4udGFyZ2V0U2hpcC5jb29yZGluYXRlc107XG4gICAgaWYgKHRhcmdldFNoaXAuY29vcmRpbmF0ZXNbMF1bMF0gPT09IHRhcmdldFNoaXAuY29vcmRpbmF0ZXNbMV1bMF0pXG4gICAgICBzZXRWZXJ0aWNhbCgpO1xuICAgIGVsc2Ugc2V0SG9yaXpvbnRhbCgpO1xuICAgIGNvbnN0IG5ld0Nvb3JkbmlhdGVzQXJyYXkgPSBnZW5lcmF0ZVNoaXBDb29yZGluYXRlcyh0YXJnZXRTaGlwLmxlbmd0aCwgW1xuICAgICAgcm93LFxuICAgICAgY29sLFxuICAgIF0pO1xuICAgIHRhcmdldFNoaXAuY29vcmRpbmF0ZXMgPSBbXTtcbiAgICBpZiAoXG4gICAgICBuZXdDb29yZG5pYXRlc0FycmF5LnNvbWUoKGNvb3JkcykgPT4gaXNCZXlvbmRCb2FyZChjb29yZHMpKSB8fFxuICAgICAgbmV3Q29vcmRuaWF0ZXNBcnJheS5zb21lKChjb29yZHMpID0+IGlzT2NjdXBpZWQoY29vcmRzKSkgfHxcbiAgICAgIGlzTmV4dFRvU2hpcHMobmV3Q29vcmRuaWF0ZXNBcnJheSlcbiAgICApIHtcbiAgICAgIHRhcmdldFNoaXAuY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlc0NvcHk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRhcmdldFNoaXAuY29vcmRpbmF0ZXMgPSBuZXdDb29yZG5pYXRlc0FycmF5O1xuICAgIHJldHVybiBuZXdDb29yZG5pYXRlc0FycmF5O1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwLFxuICAgIHNldFZlcnRpY2FsLFxuICAgIHNldEhvcml6b250YWwsXG4gICAgZ2V0U2hpcHNBcnJheSxcbiAgICBnZXRNaXNzZWRBcnJheSxcbiAgICBnZXRIaXRBcnJheSxcbiAgICBnZXRBbGxTdW5rU2hpcHMsXG4gICAgZ2V0UmluZ0Nvb3JkaW5hdGVzLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgYXJlQWxsU2hpcHNTdW5rLFxuICAgIGF1dG9QbGFjZVNoaXBzLFxuICAgIGlzSGl0LFxuICAgIGlzTWlzc2VkLFxuICAgIGlzU3VuayxcbiAgICBpc0JleW9uZEJvYXJkLFxuICAgIGdldFNoaXAsXG4gICAgYWRkVG9NaXNzZWRBcnJheSxcbiAgICB1cGRhdGVTaGlwQ29vcmRpbmF0ZXMsXG4gICAgcm90YXRlU2hpcCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZDtcbiIsImNvbnN0IGNyZWF0ZVBsYXllciA9IChnYW1lYm9hcmQsIG5hbWUgPSAnUGxheWVyJykgPT4gKHtcbiAgbmFtZSxcbiAgZ2FtZWJvYXJkLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVBsYXllcjtcbiIsImNvbnN0IGNyZWF0ZVNoaXAgPSAobGVuZ3RoLCBjb29yZGluYXRlcywgc3RhcnQpID0+ICh7XG4gIGxlbmd0aCxcbiAgY29vcmRpbmF0ZXMsXG4gIHN0YXJ0LFxuICBoaXROdW1iZXI6IDAsXG4gIHN1bms6IGZhbHNlLFxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXROdW1iZXIgKz0gMTtcbiAgfSxcbiAgaXNTdW5rKCkge1xuICAgIHRoaXMuc3VuayA9IHRoaXMubGVuZ3RoID09PSB0aGlzLmhpdE51bWJlcjtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRE9NTW9kdWxlIGZyb20gJy4vRE9NJztcbmltcG9ydCAnLi4vc3R5bGUuY3NzJztcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIERPTU1vZHVsZS5zZXRVcE5hbWVTdWJtaXRFdmVudExpc3RlbmVyKCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==