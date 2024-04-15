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
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style.css */ "./src/style.css");
/* harmony import */ var _game_loop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_loop */ "./src/js/game_loop.js");



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
    const shipsArray = _game_loop__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayerGameboard().getShipsArray();
    shipsArray.forEach((ships) => {
      ships.coordinates.forEach((coord) => {
        const boardCell = document.querySelector(
          `[data-row='${coord[0]}'][data-col='${coord[1]}']`,
        );
        boardCell.classList.add('ship');
      });
    });
  };

  const clearGameBoard = () => {
    const draggables = document.querySelectorAll('.draggable');
    draggables.forEach((draggable) => {
      const targetBoardCells = draggable.closest('.board-cell');
      targetBoardCells.textContent = '';
    });
  };

  const renderShips = () => {
    const shipsArray = _game_loop__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayerGameboard().getShipsArray();
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
    _game_loop__WEBPACK_IMPORTED_MODULE_1__["default"].autoPlaceShips();
    renderShips();
  };

  const updateComputerGameboard = () => {
    const computerGameboard = _game_loop__WEBPACK_IMPORTED_MODULE_1__["default"].getComputerGameboard();
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
    const playerGameboard = _game_loop__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayerGameboard();
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
        _game_loop__WEBPACK_IMPORTED_MODULE_1__["default"].playRound(attackCoord);
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
          const playerGameboard = _game_loop__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayerGameboard();
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

  const setupRotateShipEventListener = () => {
    const draggables = document.querySelectorAll('.draggable');
    draggables.forEach((draggable) => {
      draggable.addEventListener('click', (event) => {
        event.stopPropagation();
        const playerGameboard = _game_loop__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayerGameboard();
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
        setUpAllEventListeners();
      });
    });
  };

  const setupShakeEndEventListener = () => {
    const draggables = document.querySelectorAll('.draggable');
    draggables.forEach((draggable) => {
      draggable.addEventListener('animationend', (event) => {
        draggable.classList.remove('shake');
      });
    });
  };

  function setUpAllEventListeners() {
    setUpAttackEventListener();
    setUpShipsDraggableEventListener();
    setUpBoardCellsDragOverEventListener();
    setupRotateShipEventListener();
    setupShakeEndEventListener();
  }

  return {
    createGrids,
    populateGameboard,
    setUpAttackEventListener,
    printMessage,
    updatePlayerGameboard,
    updateComputerGameboard,
    setUpAllEventListeners,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOMModule);

DOMModule.createGrids();
_game_loop__WEBPACK_IMPORTED_MODULE_1__["default"].createPlayers();
DOMModule.populateGameboard();
DOMModule.setUpAllEventListeners();


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
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/js/player.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard */ "./src/js/gameboard.js");




const gameLoop = (() => {
  let player;
  let computer;

  const createPlayers = (name) => {
    player = (0,_player__WEBPACK_IMPORTED_MODULE_1__.createPlayer)((0,_gameboard__WEBPACK_IMPORTED_MODULE_2__["default"])(), name);
    computer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.createComputer)((0,_gameboard__WEBPACK_IMPORTED_MODULE_2__["default"])());
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

  const playerWin = () => computer.gameboard.areAllShipsSunk();

  const computerWins = () => player.gameboard.areAllShipsSunk();

  function playRound(coord) {
    computer.gameboard.receiveAttack(coord);
    _DOM__WEBPACK_IMPORTED_MODULE_0__["default"].updatePlayerGameboard();
    if (playerWin()) {
      _DOM__WEBPACK_IMPORTED_MODULE_0__["default"].printMessage(player);
      return;
    }
    _DOM__WEBPACK_IMPORTED_MODULE_0__["default"].updateComputerGameboard();
    computer.computerAttack();
    _DOM__WEBPACK_IMPORTED_MODULE_0__["default"].updatePlayerGameboard();
    if (computerWins()) {
      _DOM__WEBPACK_IMPORTED_MODULE_0__["default"].printMessage(computer);
    }
  }

  return {
    createPlayers,
    autoPlaceShips,
    getPlayerGameboard,
    getComputerGameboard,
    playRound,
    getComputer,
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
  const shipsArray = [];
  const missedArray = [];
  const hitArray = [];
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
/* harmony export */   createComputer: () => (/* binding */ createComputer),
/* harmony export */   createPlayer: () => (/* binding */ createPlayer)
/* harmony export */ });
/* harmony import */ var _game_loop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_loop */ "./src/js/game_loop.js");


const createPlayer = (gameboard, name = 'player') => ({
  name,
  gameboard,
});

const createComputer = (gameboard, name = 'computer') => {
  const allCoordinates = [];
  let lastHit;
  let firstHit;
  const targetQueue = [];
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

  (function shuffleAllCoordinates() {
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
  })();

  const getAttackCoordinates = () => {
    const playerGameboard = _game_loop__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayerGameboard();
    removeDuplicates(playerGameboard.getMissedArray());
    return allCoordinates.pop();
  };

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

  return { name, gameboard, computerAttack, getAttackCoordinates };
};


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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/DOM.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixpREFBVTtBQUNuQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxTQUFTLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDclBVOztBQUU1QjtBQUNQO0FBQ0E7QUFDQSxDQUFDOztBQUVNO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsY0FBYztBQUNsQyxzQkFBc0IsY0FBYztBQUNwQztBQUNBO0FBQ0E7O0FBRUEsNENBQTRDLE9BQU87QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLDRCQUE0QixrREFBUTtBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QixrREFBUTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDs7Ozs7Ozs7Ozs7Ozs7O0FDakpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVELGlFQUFlLFVBQVUsRUFBQzs7Ozs7OztVQ2QxQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzP2UzMjAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9qcy9ET00uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9qcy9nYW1lX2xvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9qcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9qcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9qcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0ICcuLi9zdHlsZS5jc3MnO1xuaW1wb3J0IGdhbWVMb29wIGZyb20gJy4vZ2FtZV9sb29wJztcblxuY29uc3QgRE9NTW9kdWxlID0gKCgpID0+IHtcbiAgY29uc3QgZ2FtZWJvYXJkQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYW1lYm9hcmQtY29udGFpbmVyJyk7XG4gIGNvbnN0IG1lc3NhZ2VEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2UtZGlzcGxheScpO1xuICBsZXQgaW5pdGlhbFJvdztcbiAgbGV0IGluaXRpYWxDb2w7XG5cbiAgY29uc3QgY3JlYXRlR3JpZHMgPSAoKSA9PiB7XG4gICAgY29uc3QgZ3JpZFNpemUgPSAxMDtcbiAgICBnYW1lYm9hcmRDb250YWluZXJzLmZvckVhY2goKGNvbnRhaW5lcikgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkU2l6ZTsgaSArPSAxKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ3JpZFNpemU7IGogKz0gMSkge1xuICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2JvYXJkLWNlbGwnKTtcbiAgICAgICAgICBjZWxsLmRhdGFzZXQucm93ID0gaTtcbiAgICAgICAgICBjZWxsLmRhdGFzZXQuY29sID0gajtcbiAgICAgICAgICBjb250YWluZXIuYXBwZW5kKGNlbGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyUmVhbFNoaXBzID0gKCkgPT4ge1xuICAgIGNvbnN0IHNoaXBzQXJyYXkgPSBnYW1lTG9vcC5nZXRQbGF5ZXJHYW1lYm9hcmQoKS5nZXRTaGlwc0FycmF5KCk7XG4gICAgc2hpcHNBcnJheS5mb3JFYWNoKChzaGlwcykgPT4ge1xuICAgICAgc2hpcHMuY29vcmRpbmF0ZXMuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgICAgY29uc3QgYm9hcmRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgW2RhdGEtcm93PScke2Nvb3JkWzBdfSddW2RhdGEtY29sPScke2Nvb3JkWzFdfSddYCxcbiAgICAgICAgKTtcbiAgICAgICAgYm9hcmRDZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFyR2FtZUJvYXJkID0gKCkgPT4ge1xuICAgIGNvbnN0IGRyYWdnYWJsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJhZ2dhYmxlJyk7XG4gICAgZHJhZ2dhYmxlcy5mb3JFYWNoKChkcmFnZ2FibGUpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldEJvYXJkQ2VsbHMgPSBkcmFnZ2FibGUuY2xvc2VzdCgnLmJvYXJkLWNlbGwnKTtcbiAgICAgIHRhcmdldEJvYXJkQ2VsbHMudGV4dENvbnRlbnQgPSAnJztcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCByZW5kZXJTaGlwcyA9ICgpID0+IHtcbiAgICBjb25zdCBzaGlwc0FycmF5ID0gZ2FtZUxvb3AuZ2V0UGxheWVyR2FtZWJvYXJkKCkuZ2V0U2hpcHNBcnJheSgpO1xuICAgIHNoaXBzQXJyYXkuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgY29uc3Qgc2hpcEluc3RhbmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBzaXplID0gJ2NsYW1wKDFyZW0sIDAuMnJlbSArIDN2dywgM3JlbSknO1xuICAgICAgaWYgKHNoaXAuY29vcmRpbmF0ZXNbMF1bMF0gPT09IHNoaXAuY29vcmRpbmF0ZXNbMV1bMF0pIHtcbiAgICAgICAgc2hpcEluc3RhbmNlLnN0eWxlLndpZHRoID0gYGNhbGMoJHtzaGlwLmxlbmd0aH0gKiAke3NpemV9KWA7XG4gICAgICAgIHNoaXBJbnN0YW5jZS5zdHlsZS5oZWlnaHQgPSBzaXplO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hpcEluc3RhbmNlLnN0eWxlLndpZHRoID0gc2l6ZTtcbiAgICAgICAgc2hpcEluc3RhbmNlLnN0eWxlLmhlaWdodCA9IGBjYWxjKCR7c2hpcC5sZW5ndGh9ICogJHtzaXplfSlgO1xuICAgICAgfVxuICAgICAgc2hpcEluc3RhbmNlLmNsYXNzTGlzdC5hZGQoJ3NoaXAnLCAnZHJhZ2dhYmxlJyk7XG4gICAgICBzaGlwSW5zdGFuY2UuZHJhZ2dhYmxlID0gdHJ1ZTtcblxuICAgICAgY29uc3QgYm9hcmRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYFtkYXRhLXJvdz0nJHtzaGlwLnN0YXJ0WzBdfSddW2RhdGEtY29sPScke3NoaXAuc3RhcnRbMV19J11gLFxuICAgICAgKTtcbiAgICAgIGJvYXJkQ2VsbC5hcHBlbmQoc2hpcEluc3RhbmNlKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBwb3B1bGF0ZUdhbWVib2FyZCA9ICgpID0+IHtcbiAgICBnYW1lTG9vcC5hdXRvUGxhY2VTaGlwcygpO1xuICAgIHJlbmRlclNoaXBzKCk7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlQ29tcHV0ZXJHYW1lYm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgY29tcHV0ZXJHYW1lYm9hcmQgPSBnYW1lTG9vcC5nZXRDb21wdXRlckdhbWVib2FyZCgpO1xuICAgIGNvbnN0IGhpdEFycmF5ID0gY29tcHV0ZXJHYW1lYm9hcmQuZ2V0SGl0QXJyYXkoKTtcbiAgICBjb25zdCBtaXNzQXJyYXkgPSBjb21wdXRlckdhbWVib2FyZC5nZXRNaXNzZWRBcnJheSgpO1xuICAgIGNvbnNvbGUubG9nKG1pc3NBcnJheSk7XG4gICAgaGl0QXJyYXkuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgLmNvbXB1dGVyLWdhbWVib2FyZCA+IFtkYXRhLXJvdz0nJHtjb29yZFswXX0nXVtkYXRhLWNvbD0nJHtjb29yZFsxXX0nXWAsXG4gICAgICApO1xuICAgICAgdGFyZ2V0Q2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICB9KTtcbiAgICBtaXNzQXJyYXkuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgLmNvbXB1dGVyLWdhbWVib2FyZCA+IFtkYXRhLXJvdz0nJHtjb29yZFswXX0nXVtkYXRhLWNvbD0nJHtjb29yZFsxXX0nXWAsXG4gICAgICApO1xuICAgICAgdGFyZ2V0Q2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzZWQnKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVQbGF5ZXJHYW1lYm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gZ2FtZUxvb3AuZ2V0UGxheWVyR2FtZWJvYXJkKCk7XG4gICAgY29uc3QgaGl0QXJyYXkgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0SGl0QXJyYXkoKTtcbiAgICBjb25zdCBtaXNzQXJyYXkgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0TWlzc2VkQXJyYXkoKTtcbiAgICBoaXRBcnJheS5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0Q2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAucGxheWVyLWdhbWVib2FyZCA+IFtkYXRhLXJvdz0nJHtjb29yZFswXX0nXVtkYXRhLWNvbD0nJHtjb29yZFsxXX0nXWAsXG4gICAgICApO1xuICAgICAgdGFyZ2V0Q2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICB9KTtcbiAgICBtaXNzQXJyYXkuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgLnBsYXllci1nYW1lYm9hcmQgPiBbZGF0YS1yb3c9JyR7Y29vcmRbMF19J11bZGF0YS1jb2w9JyR7Y29vcmRbMV19J11gLFxuICAgICAgKTtcbiAgICAgIHRhcmdldENlbGwuY2xhc3NMaXN0LmFkZCgnbWlzc2VkJyk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcHJpbnRNZXNzYWdlID0gKHBsYXllcikgPT4ge1xuICAgIGlmIChwbGF5ZXIubmFtZSA9PT0gJ3BsYXllcicpIG1lc3NhZ2VEaXNwbGF5LnRleHRDb250ZW50ID0gJ1BsYXllciB3aW5zJztcbiAgICBlbHNlIG1lc3NhZ2VEaXNwbGF5LnRleHRDb250ZW50ID0gJ0NvbXB1dGVyIHdpbnMnO1xuICB9O1xuXG4gIGNvbnN0IHNldFVwQXR0YWNrRXZlbnRMaXN0ZW5lciA9ICgpID0+IHtcbiAgICBjb25zdCBjb21wdXRlckdhbWVib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmNvbXB1dGVyLWdhbWVib2FyZCcsXG4gICAgKTtcbiAgICBjb21wdXRlckdhbWVib2FyZENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xuXG4gICAgICBpZiAoXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21pc3NlZCcpIHx8XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpXG4gICAgICApXG4gICAgICAgIHJldHVybjtcblxuICAgICAgaWYgKHRhcmdldC5jbG9zZXN0KCcuYm9hcmQtY2VsbCcpKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KHRhcmdldC5kYXRhc2V0LnJvdywgMTApO1xuICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludCh0YXJnZXQuZGF0YXNldC5jb2wsIDEwKTtcbiAgICAgICAgY29uc3QgYXR0YWNrQ29vcmQgPSBbcm93LCBjb2xdO1xuICAgICAgICBnYW1lTG9vcC5wbGF5Um91bmQoYXR0YWNrQ29vcmQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHNldFVwU2hpcHNEcmFnZ2FibGVFdmVudExpc3RlbmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGRyYWdnYWJsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJhZ2dhYmxlJyk7XG5cbiAgICBkcmFnZ2FibGVzLmZvckVhY2goKGRyYWdnYWJsZSkgPT4ge1xuICAgICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChldmVudCkgPT4ge1xuICAgICAgICBkcmFnZ2FibGUuY2xhc3NMaXN0LmFkZCgnZHJhZ2dpbmcnKTtcblxuICAgICAgICBjb25zdCBjbGlja2VkWCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIGNvbnN0IGNsaWNrZWRZID0gZXZlbnQuY2xpZW50WTtcblxuICAgICAgICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWdhbWVib2FyZCcpO1xuICAgICAgICBjb25zdCBib3VuZGluZ0JveCA9IHBsYXllckdhbWVib2FyZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBjb25zdCByZWxhdGl2ZVggPSBjbGlja2VkWCAtIGJvdW5kaW5nQm94LmxlZnQ7XG4gICAgICAgIGNvbnN0IHJlbGF0aXZlWSA9IGNsaWNrZWRZIC0gYm91bmRpbmdCb3gudG9wO1xuXG4gICAgICAgIGNvbnN0IGNlbGxXaWR0aCA9XG4gICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC1jZWxsJykub2Zmc2V0V2lkdGg7XG4gICAgICAgIGNvbnN0IGNlbGxIZWlnaHQgPVxuICAgICAgICAgIHBsYXllckdhbWVib2FyZC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQtY2VsbCcpLm9mZnNldEhlaWdodDtcblxuICAgICAgICBjb25zdCBjbGlja2VkUm93ID0gTWF0aC5mbG9vcihyZWxhdGl2ZVkgLyBjZWxsSGVpZ2h0KTtcbiAgICAgICAgY29uc3QgY2xpY2tlZENvbCA9IE1hdGguZmxvb3IocmVsYXRpdmVYIC8gY2VsbFdpZHRoKTtcblxuICAgICAgICBjb25zdCBpbml0aWFsQ2VsbCA9IHBsYXllckdhbWVib2FyZC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbZGF0YS1yb3c9JyR7Y2xpY2tlZFJvd30nXVtkYXRhLWNvbD0nJHtjbGlja2VkQ29sfSddYCxcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhjbGlja2VkUm93LCBjbGlja2VkQ29sKTtcblxuICAgICAgICBpZiAoaW5pdGlhbENlbGwpIHtcbiAgICAgICAgICBpbml0aWFsUm93ID0gY2xpY2tlZFJvdztcbiAgICAgICAgICBpbml0aWFsQ29sID0gY2xpY2tlZENvbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbml0aWFsUm93ID0gbnVsbDtcbiAgICAgICAgICBpbml0aWFsQ29sID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgKCkgPT4ge1xuICAgICAgICBkcmFnZ2FibGUuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcbiAgICAgICAgaW5pdGlhbFJvdyA9IG51bGw7XG4gICAgICAgIGluaXRpYWxDb2wgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3Qgc2V0VXBCb2FyZENlbGxzRHJhZ092ZXJFdmVudExpc3RlbmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItZ2FtZWJvYXJkJyk7XG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCBkcmFnZ2FibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJhZ2dpbmcnKTtcblxuICAgICAgY29uc3QgYm9hcmRDZWxsU2l6ZSA9IGNvbnRhaW5lclxuICAgICAgICAucXVlcnlTZWxlY3RvcignLmJvYXJkLWNlbGwnKVxuICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCB0YXJnZXRSb3cgPSBNYXRoLmZsb29yKFxuICAgICAgICAoZXZlbnQuY2xpZW50WSAtIGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApIC9cbiAgICAgICAgICBib2FyZENlbGxTaXplLmhlaWdodCxcbiAgICAgICk7XG4gICAgICBjb25zdCB0YXJnZXRDb2wgPSBNYXRoLmZsb29yKFxuICAgICAgICAoZXZlbnQuY2xpZW50WCAtIGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0KSAvXG4gICAgICAgICAgYm9hcmRDZWxsU2l6ZS53aWR0aCxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHRhcmdldENlbGwgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYFtkYXRhLXJvdz0nJHt0YXJnZXRSb3d9J11bZGF0YS1jb2w9JyR7dGFyZ2V0Q29sfSddYCxcbiAgICAgICk7XG5cbiAgICAgIGlmIChkcmFnZ2FibGUgJiYgdGFyZ2V0Q2VsbCkge1xuICAgICAgICBpZiAoaW5pdGlhbFJvdyAhPT0gbnVsbCAmJiBpbml0aWFsQ29sICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3Qgcm93T2Zmc2V0ID0gdGFyZ2V0Um93IC0gaW5pdGlhbFJvdztcbiAgICAgICAgICBjb25zdCBjb2xPZmZzZXQgPSB0YXJnZXRDb2wgLSBpbml0aWFsQ29sO1xuICAgICAgICAgIGNvbnN0IHBsYXllckdhbWVib2FyZCA9IGdhbWVMb29wLmdldFBsYXllckdhbWVib2FyZCgpO1xuICAgICAgICAgIGNvbnN0IG5ld1N0YXJ0ID0gcGxheWVyR2FtZWJvYXJkLnVwZGF0ZVNoaXBDb29yZGluYXRlcyhcbiAgICAgICAgICAgIGluaXRpYWxSb3csXG4gICAgICAgICAgICBpbml0aWFsQ29sLFxuICAgICAgICAgICAgcm93T2Zmc2V0LFxuICAgICAgICAgICAgY29sT2Zmc2V0LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoIW5ld1N0YXJ0KSByZXR1cm47XG5cbiAgICAgICAgICBjb25zdCByZWFsVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGAucGxheWVyLWdhbWVib2FyZCA+IFtkYXRhLXJvdz0nJHtuZXdTdGFydFswXX0nXVtkYXRhLWNvbD0nJHtuZXdTdGFydFsxXX0nXWAsXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHJlYWxUYXJnZXQuYXBwZW5kQ2hpbGQoZHJhZ2dhYmxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHNldHVwUm90YXRlU2hpcEV2ZW50TGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZHJhZ2dhYmxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcmFnZ2FibGUnKTtcbiAgICBkcmFnZ2FibGVzLmZvckVhY2goKGRyYWdnYWJsZSkgPT4ge1xuICAgICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lTG9vcC5nZXRQbGF5ZXJHYW1lYm9hcmQoKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0Q2VsbCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuYm9hcmQtY2VsbCcpO1xuICAgICAgICBjb25zdCB0YXJnZXRSb3cgPSBwYXJzZUludCh0YXJnZXRDZWxsLmRhdGFzZXQucm93LCAxMCk7XG4gICAgICAgIGNvbnN0IHRhcmdldENvbCA9IHBhcnNlSW50KHRhcmdldENlbGwuZGF0YXNldC5jb2wsIDEwKTtcbiAgICAgICAgY29uc3QgbmV3Q29vcmRpbmF0ZXNBcnJheSA9IHBsYXllckdhbWVib2FyZC5yb3RhdGVTaGlwKFxuICAgICAgICAgIHRhcmdldFJvdyxcbiAgICAgICAgICB0YXJnZXRDb2wsXG4gICAgICAgICk7XG4gICAgICAgIGlmICghbmV3Q29vcmRpbmF0ZXNBcnJheSkge1xuICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdzaGFrZScpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0YXJnZXRDZWxsLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIGNsZWFyR2FtZUJvYXJkKCk7XG4gICAgICAgIHJlbmRlclNoaXBzKCk7XG4gICAgICAgIHNldFVwQWxsRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHNldHVwU2hha2VFbmRFdmVudExpc3RlbmVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGRyYWdnYWJsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJhZ2dhYmxlJyk7XG4gICAgZHJhZ2dhYmxlcy5mb3JFYWNoKChkcmFnZ2FibGUpID0+IHtcbiAgICAgIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZHJhZ2dhYmxlLmNsYXNzTGlzdC5yZW1vdmUoJ3NoYWtlJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBzZXRVcEFsbEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHNldFVwQXR0YWNrRXZlbnRMaXN0ZW5lcigpO1xuICAgIHNldFVwU2hpcHNEcmFnZ2FibGVFdmVudExpc3RlbmVyKCk7XG4gICAgc2V0VXBCb2FyZENlbGxzRHJhZ092ZXJFdmVudExpc3RlbmVyKCk7XG4gICAgc2V0dXBSb3RhdGVTaGlwRXZlbnRMaXN0ZW5lcigpO1xuICAgIHNldHVwU2hha2VFbmRFdmVudExpc3RlbmVyKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZUdyaWRzLFxuICAgIHBvcHVsYXRlR2FtZWJvYXJkLFxuICAgIHNldFVwQXR0YWNrRXZlbnRMaXN0ZW5lcixcbiAgICBwcmludE1lc3NhZ2UsXG4gICAgdXBkYXRlUGxheWVyR2FtZWJvYXJkLFxuICAgIHVwZGF0ZUNvbXB1dGVyR2FtZWJvYXJkLFxuICAgIHNldFVwQWxsRXZlbnRMaXN0ZW5lcnMsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBET01Nb2R1bGU7XG5cbkRPTU1vZHVsZS5jcmVhdGVHcmlkcygpO1xuZ2FtZUxvb3AuY3JlYXRlUGxheWVycygpO1xuRE9NTW9kdWxlLnBvcHVsYXRlR2FtZWJvYXJkKCk7XG5ET01Nb2R1bGUuc2V0VXBBbGxFdmVudExpc3RlbmVycygpO1xuIiwiaW1wb3J0IERPTU1vZHVsZSBmcm9tICcuL0RPTSc7XG5pbXBvcnQgeyBjcmVhdGVDb21wdXRlciwgY3JlYXRlUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IGdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5cbmNvbnN0IGdhbWVMb29wID0gKCgpID0+IHtcbiAgbGV0IHBsYXllcjtcbiAgbGV0IGNvbXB1dGVyO1xuXG4gIGNvbnN0IGNyZWF0ZVBsYXllcnMgPSAobmFtZSkgPT4ge1xuICAgIHBsYXllciA9IGNyZWF0ZVBsYXllcihnYW1lYm9hcmQoKSwgbmFtZSk7XG4gICAgY29tcHV0ZXIgPSBjcmVhdGVDb21wdXRlcihnYW1lYm9hcmQoKSk7XG4gIH07XG5cbiAgY29uc3QgYXV0b1BsYWNlU2hpcHMgPSAoKSA9PiB7XG4gICAgY29uc3QgYXJyID0gW3BsYXllciwgY29tcHV0ZXJdO1xuICAgIGFyci5mb3JFYWNoKChwbGF5ZXIpID0+IHtcbiAgICAgIHBsYXllci5nYW1lYm9hcmQuYXV0b1BsYWNlU2hpcHMoKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBnZXRQbGF5ZXJHYW1lYm9hcmQgPSAoKSA9PiBwbGF5ZXIuZ2FtZWJvYXJkO1xuXG4gIGNvbnN0IGdldENvbXB1dGVyR2FtZWJvYXJkID0gKCkgPT4gY29tcHV0ZXIuZ2FtZWJvYXJkO1xuXG4gIGNvbnN0IGdldENvbXB1dGVyID0gKCkgPT4gY29tcHV0ZXI7XG5cbiAgY29uc3QgcGxheWVyV2luID0gKCkgPT4gY29tcHV0ZXIuZ2FtZWJvYXJkLmFyZUFsbFNoaXBzU3VuaygpO1xuXG4gIGNvbnN0IGNvbXB1dGVyV2lucyA9ICgpID0+IHBsYXllci5nYW1lYm9hcmQuYXJlQWxsU2hpcHNTdW5rKCk7XG5cbiAgZnVuY3Rpb24gcGxheVJvdW5kKGNvb3JkKSB7XG4gICAgY29tcHV0ZXIuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmQpO1xuICAgIERPTU1vZHVsZS51cGRhdGVQbGF5ZXJHYW1lYm9hcmQoKTtcbiAgICBpZiAocGxheWVyV2luKCkpIHtcbiAgICAgIERPTU1vZHVsZS5wcmludE1lc3NhZ2UocGxheWVyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgRE9NTW9kdWxlLnVwZGF0ZUNvbXB1dGVyR2FtZWJvYXJkKCk7XG4gICAgY29tcHV0ZXIuY29tcHV0ZXJBdHRhY2soKTtcbiAgICBET01Nb2R1bGUudXBkYXRlUGxheWVyR2FtZWJvYXJkKCk7XG4gICAgaWYgKGNvbXB1dGVyV2lucygpKSB7XG4gICAgICBET01Nb2R1bGUucHJpbnRNZXNzYWdlKGNvbXB1dGVyKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZVBsYXllcnMsXG4gICAgYXV0b1BsYWNlU2hpcHMsXG4gICAgZ2V0UGxheWVyR2FtZWJvYXJkLFxuICAgIGdldENvbXB1dGVyR2FtZWJvYXJkLFxuICAgIHBsYXlSb3VuZCxcbiAgICBnZXRDb21wdXRlcixcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVMb29wO1xuIiwiaW1wb3J0IGNyZWF0ZVNoaXAgZnJvbSAnLi9zaGlwJztcblxuY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBzaGlwc0FycmF5ID0gW107XG4gIGNvbnN0IG1pc3NlZEFycmF5ID0gW107XG4gIGNvbnN0IGhpdEFycmF5ID0gW107XG4gIGxldCB2ZXJ0aWNhbCA9IGZhbHNlO1xuXG4gIGNvbnN0IHNldFZlcnRpY2FsID0gKCkgPT4gKHZlcnRpY2FsID0gdHJ1ZSk7XG5cbiAgY29uc3Qgc2V0SG9yaXpvbnRhbCA9ICgpID0+ICh2ZXJ0aWNhbCA9IGZhbHNlKTtcblxuICBjb25zdCBpc0JleW9uZEJvYXJkID0gKFtyb3csIGNvbF0pID0+IHtcbiAgICBpZiAocm93IDwgMCB8fCByb3cgPiA5IHx8IGNvbCA8IDAgfHwgY29sID4gOSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGlzT2NjdXBpZWQgPSAoW3JvdywgY29sXSkgPT5cbiAgICBzaGlwc0FycmF5LnNvbWUoKHNoaXApID0+XG4gICAgICBzaGlwLmNvb3JkaW5hdGVzLnNvbWUoKGNvb3JkKSA9PiBjb29yZFswXSA9PT0gcm93ICYmIGNvb3JkWzFdID09PSBjb2wpLFxuICAgICk7XG5cbiAgY29uc3QgZ2V0UmluZ0Nvb3JkaW5hdGVzID0gKGFycmF5KSA9PiB7XG4gICAgY29uc3QgbmVpZ2hib3JpbmdDb29yZGluYXRlcyA9IFtdO1xuXG4gICAgY29uc3QgZGlyZWN0aW9ucyA9IFtcbiAgICAgIFstMSwgMF0sXG4gICAgICBbMSwgMF0sXG4gICAgICBbMCwgLTFdLFxuICAgICAgWzAsIDFdLFxuICAgICAgWy0xLCAtMV0sXG4gICAgICBbLTEsIDFdLFxuICAgICAgWzEsIC0xXSxcbiAgICAgIFsxLCAxXSxcbiAgICBdO1xuICAgIGFycmF5LmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgICBkaXJlY3Rpb25zLmZvckVhY2goKGRpcikgPT4ge1xuICAgICAgICBjb25zdCBuZWlnaGJvciA9IFtjb29yZFswXSArIGRpclswXSwgY29vcmRbMV0gKyBkaXJbMV1dO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIWFycmF5LnNvbWUoXG4gICAgICAgICAgICAoY29vcmQpID0+IGNvb3JkWzBdID09PSBuZWlnaGJvclswXSAmJiBjb29yZFsxXSA9PT0gbmVpZ2hib3JbMV0sXG4gICAgICAgICAgKSAmJlxuICAgICAgICAgICFpc0JleW9uZEJvYXJkKG5laWdoYm9yKSAmJlxuICAgICAgICAgICFuZWlnaGJvcmluZ0Nvb3JkaW5hdGVzLnNvbWUoXG4gICAgICAgICAgICAoY29vcmQpID0+IGNvb3JkWzBdID09PSBuZWlnaGJvclswXSAmJiBjb29yZFsxXSA9PT0gbmVpZ2hib3JbMV0sXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgICAgbmVpZ2hib3JpbmdDb29yZGluYXRlcy5wdXNoKG5laWdoYm9yKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5laWdoYm9yaW5nQ29vcmRpbmF0ZXM7XG4gIH07XG5cbiAgY29uc3QgaXNOZXh0VG9TaGlwcyA9IChhcnJheSkgPT4ge1xuICAgIGNvbnN0IHJpbmdDb29yZGluYXRlcyA9IGdldFJpbmdDb29yZGluYXRlcyhhcnJheSk7XG4gICAgcmV0dXJuIHJpbmdDb29yZGluYXRlcy5zb21lKChjb29yZCkgPT5cbiAgICAgIHNoaXBzQXJyYXkuc29tZSgoc2hpcCkgPT5cbiAgICAgICAgc2hpcC5jb29yZGluYXRlcy5zb21lKFxuICAgICAgICAgIChzaGlwQ29vcmQpID0+IHNoaXBDb29yZFswXSA9PT0gY29vcmRbMF0gJiYgc2hpcENvb3JkWzFdID09PSBjb29yZFsxXSxcbiAgICAgICAgKSxcbiAgICAgICksXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBpc0hpdCA9IChyb3csIGNvbCkgPT5cbiAgICBoaXRBcnJheS5zb21lKChjb29yZCkgPT4gY29vcmRbMF0gPT09IHJvdyAmJiBjb29yZFsxXSA9PT0gY29sKTtcblxuICBjb25zdCBpc01pc3NlZCA9IChyb3csIGNvbCkgPT5cbiAgICBtaXNzZWRBcnJheS5zb21lKChjb29yZCkgPT4gY29vcmRbMF0gPT09IHJvdyAmJiBjb29yZFsxXSA9PT0gY29sKTtcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiBzaGlwc0FycmF5LnNvbWUoKHNoaXApID0+IHNoaXAuc3Vuayk7XG5cbiAgY29uc3QgYWRkVG9NaXNzZWRBcnJheSA9IChbcm93LCBjb2xdKSA9PiB7XG4gICAgaWYgKCFtaXNzZWRBcnJheS5maW5kKChtQ29vcmQpID0+IG1Db29yZFswXSA9PT0gcm93ICYmIG1Db29yZFsxXSA9PT0gY29sKSlcbiAgICAgIG1pc3NlZEFycmF5LnB1c2goW3JvdywgY29sXSk7XG4gIH07XG5cbiAgY29uc3QgZ2VuZXJhdGVTaGlwQ29vcmRpbmF0ZXMgPSAobGVuZ3RoLCBjb29yZGluYXRlcykgPT4ge1xuICAgIGxldCByb3cgPSBjb29yZGluYXRlc1swXTtcbiAgICBsZXQgY29sID0gY29vcmRpbmF0ZXNbMV07XG4gICAgY29uc3QgY29vcmRpbmF0ZXNBcnJheSA9IFtdO1xuICAgIGNvb3JkaW5hdGVzQXJyYXkucHVzaChjb29yZGluYXRlcyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aCAtIDE7IGkgKz0gMSkge1xuICAgICAgbGV0IG5ld0Nvb3JkaW5hdGVzO1xuICAgICAgaWYgKHZlcnRpY2FsKSBuZXdDb29yZGluYXRlcyA9IFsocm93ICs9IDEpLCBjb2xdO1xuICAgICAgZWxzZSBuZXdDb29yZGluYXRlcyA9IFtyb3csIChjb2wgKz0gMSldO1xuICAgICAgY29vcmRpbmF0ZXNBcnJheS5wdXNoKG5ld0Nvb3JkaW5hdGVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29vcmRpbmF0ZXNBcnJheTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAobGVuZ3RoLCBjb29yZGluYXRlcykgPT4ge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzQXJyYXkgPSBnZW5lcmF0ZVNoaXBDb29yZGluYXRlcyhsZW5ndGgsIGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoXG4gICAgICBpc05leHRUb1NoaXBzKGNvb3JkaW5hdGVzQXJyYXkpIHx8XG4gICAgICBjb29yZGluYXRlc0FycmF5LnNvbWUoKGNvb3JkcykgPT4gaXNPY2N1cGllZChjb29yZHMpKSB8fFxuICAgICAgY29vcmRpbmF0ZXNBcnJheS5zb21lKChjb29yZHMpID0+IGlzQmV5b25kQm9hcmQoY29vcmRzKSlcbiAgICApXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgQ29vcmRpbmF0ZXMnKTtcbiAgICBjb25zdCBjb29yZHMgPSBbLi4uY29vcmRpbmF0ZXNBcnJheV07XG4gICAgY29uc3Qgc2hpcEluc3RhbmNlID0gY3JlYXRlU2hpcChsZW5ndGgsIGNvb3JkaW5hdGVzQXJyYXksIGNvb3Jkc1swXSk7XG4gICAgc2hpcHNBcnJheS5wdXNoKHNoaXBJbnN0YW5jZSk7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChbcm93LCBjb2xdKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gc2hpcHNBcnJheS5maWx0ZXIoKHNoaXApID0+XG4gICAgICBzaGlwLmNvb3JkaW5hdGVzLnNvbWUoKGNvb3JkKSA9PiBjb29yZFswXSA9PT0gcm93ICYmIGNvb3JkWzFdID09PSBjb2wpLFxuICAgICk7XG4gICAgaWYgKHRhcmdldC5sZW5ndGggPiAwKSB7XG4gICAgICB0YXJnZXRbMF0uaGl0KCk7XG4gICAgICB0YXJnZXRbMF0uaXNTdW5rKCk7XG4gICAgICBoaXRBcnJheS5wdXNoKFtyb3csIGNvbF0pO1xuICAgICAgaWYgKHRhcmdldFswXS5zdW5rKSB7XG4gICAgICAgIGNvbnN0IHJpbmdDb29yZGluYXRlc0FycmF5ID0gZ2V0UmluZ0Nvb3JkaW5hdGVzKHRhcmdldFswXS5jb29yZGluYXRlcyk7XG4gICAgICAgIHJpbmdDb29yZGluYXRlc0FycmF5LmZvckVhY2goKGNvb3JkKSA9PiBhZGRUb01pc3NlZEFycmF5KGNvb3JkKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIG1pc3NlZEFycmF5LnB1c2goW3JvdywgY29sXSk7XG4gIH07XG5cbiAgY29uc3QgYXV0b1BsYWNlU2hpcHMgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XG5cbiAgICBzaGlwTGVuZ3Rocy5mb3JFYWNoKChsZW5ndGgpID0+IHtcbiAgICAgIGxldCBpc1ZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG5cbiAgICAgIHdoaWxlICghaXNWYWxpZFBsYWNlbWVudCkge1xuICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuNSkge1xuICAgICAgICAgIHNldFZlcnRpY2FsKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0SG9yaXpvbnRhbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICBjb25zdCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW3JvdywgY29sXTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHBsYWNlU2hpcChsZW5ndGgsIGNvb3JkaW5hdGVzKTtcbiAgICAgICAgICBpc1ZhbGlkUGxhY2VtZW50ID0gdHJ1ZTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgYXJlQWxsU2hpcHNTdW5rID0gKCkgPT4gc2hpcHNBcnJheS5ldmVyeSgoc2hpcCkgPT4gc2hpcC5zdW5rKTtcblxuICBjb25zdCBnZXRTaGlwc0FycmF5ID0gKCkgPT4gc2hpcHNBcnJheTtcblxuICBjb25zdCBnZXRNaXNzZWRBcnJheSA9ICgpID0+IG1pc3NlZEFycmF5O1xuXG4gIGNvbnN0IGdldEhpdEFycmF5ID0gKCkgPT4gaGl0QXJyYXk7XG5cbiAgY29uc3QgZ2V0U2hpcCA9IChyb3csIGNvbCkgPT4ge1xuICAgIGNvbnN0IGFycmF5ID0gc2hpcHNBcnJheS5maWx0ZXIoKHNoaXApID0+XG4gICAgICBzaGlwLmNvb3JkaW5hdGVzLnNvbWUoKGNvb3JkKSA9PiBjb29yZFswXSA9PT0gcm93ICYmIGNvb3JkWzFdID09PSBjb2wpLFxuICAgICk7XG4gICAgcmV0dXJuIGFycmF5WzBdO1xuICB9O1xuXG4gIGNvbnN0IGdldEFsbFN1bmtTaGlwcyA9ICgpID0+IHNoaXBzQXJyYXkuZmlsdGVyKChzaGlwKSA9PiBzaGlwLnN1bmspO1xuXG4gIGNvbnN0IHVwZGF0ZVNoaXBDb29yZGluYXRlcyA9IChcbiAgICBpbml0aWFsUm93LFxuICAgIGluaXRpYWxDb2wsXG4gICAgcm93T2Zmc2V0LFxuICAgIGNvbE9mZnNldCxcbiAgKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0U2hpcCA9IGdldFNoaXAoaW5pdGlhbFJvdywgaW5pdGlhbENvbCk7XG4gICAgaWYgKCF0YXJnZXRTaGlwKSByZXR1cm47XG4gICAgY29uc3Qgc3RhcnRDb3B5ID0gWy4uLnRhcmdldFNoaXAuc3RhcnRdO1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzQ29weSA9IFsuLi50YXJnZXRTaGlwLmNvb3JkaW5hdGVzXTtcbiAgICBjb25zdCBuZXdSb3cgPSBzdGFydENvcHlbMF0gKyByb3dPZmZzZXQ7XG4gICAgY29uc3QgbmV3Q29sID0gc3RhcnRDb3B5WzFdICsgY29sT2Zmc2V0O1xuXG4gICAgaWYgKGNvb3JkaW5hdGVzQ29weVswXVswXSA9PT0gdGFyZ2V0U2hpcC5jb29yZGluYXRlc1sxXVswXSkgc2V0SG9yaXpvbnRhbCgpO1xuICAgIGVsc2Ugc2V0VmVydGljYWwoKTtcbiAgICBjb25zdCBuZXdDb29yZG5pYXRlc0FycmF5ID0gZ2VuZXJhdGVTaGlwQ29vcmRpbmF0ZXModGFyZ2V0U2hpcC5sZW5ndGgsIFtcbiAgICAgIG5ld1JvdyxcbiAgICAgIG5ld0NvbCxcbiAgICBdKTtcbiAgICB0YXJnZXRTaGlwLnN0YXJ0ID0gW107XG4gICAgdGFyZ2V0U2hpcC5jb29yZGluYXRlcyA9IFtdO1xuICAgIGlmIChcbiAgICAgIG5ld0Nvb3JkbmlhdGVzQXJyYXkuc29tZSgoY29vcmRzKSA9PiBpc0JleW9uZEJvYXJkKGNvb3JkcykpIHx8XG4gICAgICBuZXdDb29yZG5pYXRlc0FycmF5LnNvbWUoKGNvb3JkcykgPT4gaXNPY2N1cGllZChjb29yZHMpKSB8fFxuICAgICAgaXNOZXh0VG9TaGlwcyhuZXdDb29yZG5pYXRlc0FycmF5KVxuICAgICkge1xuICAgICAgdGFyZ2V0U2hpcC5zdGFydCA9IHN0YXJ0Q29weTtcbiAgICAgIHRhcmdldFNoaXAuY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlc0NvcHk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRhcmdldFNoaXAuY29vcmRpbmF0ZXMgPSBuZXdDb29yZG5pYXRlc0FycmF5O1xuICAgIHRhcmdldFNoaXAuc3RhcnQgPSBbbmV3Um93LCBuZXdDb2xdO1xuICAgIHJldHVybiB0YXJnZXRTaGlwLnN0YXJ0O1xuICB9O1xuXG4gIGNvbnN0IHJvdGF0ZVNoaXAgPSAocm93LCBjb2wpID0+IHtcbiAgICBjb25zdCB0YXJnZXRTaGlwID0gZ2V0U2hpcChyb3csIGNvbCk7XG4gICAgY29uc3QgY29vcmRpbmF0ZXNDb3B5ID0gWy4uLnRhcmdldFNoaXAuY29vcmRpbmF0ZXNdO1xuICAgIGlmICh0YXJnZXRTaGlwLmNvb3JkaW5hdGVzWzBdWzBdID09PSB0YXJnZXRTaGlwLmNvb3JkaW5hdGVzWzFdWzBdKVxuICAgICAgc2V0VmVydGljYWwoKTtcbiAgICBlbHNlIHNldEhvcml6b250YWwoKTtcbiAgICBjb25zdCBuZXdDb29yZG5pYXRlc0FycmF5ID0gZ2VuZXJhdGVTaGlwQ29vcmRpbmF0ZXModGFyZ2V0U2hpcC5sZW5ndGgsIFtcbiAgICAgIHJvdyxcbiAgICAgIGNvbCxcbiAgICBdKTtcbiAgICB0YXJnZXRTaGlwLmNvb3JkaW5hdGVzID0gW107XG4gICAgaWYgKFxuICAgICAgbmV3Q29vcmRuaWF0ZXNBcnJheS5zb21lKChjb29yZHMpID0+IGlzQmV5b25kQm9hcmQoY29vcmRzKSkgfHxcbiAgICAgIG5ld0Nvb3JkbmlhdGVzQXJyYXkuc29tZSgoY29vcmRzKSA9PiBpc09jY3VwaWVkKGNvb3JkcykpIHx8XG4gICAgICBpc05leHRUb1NoaXBzKG5ld0Nvb3JkbmlhdGVzQXJyYXkpXG4gICAgKSB7XG4gICAgICB0YXJnZXRTaGlwLmNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXNDb3B5O1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0YXJnZXRTaGlwLmNvb3JkaW5hdGVzID0gbmV3Q29vcmRuaWF0ZXNBcnJheTtcbiAgICByZXR1cm4gbmV3Q29vcmRuaWF0ZXNBcnJheTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHBsYWNlU2hpcCxcbiAgICBzZXRWZXJ0aWNhbCxcbiAgICBzZXRIb3Jpem9udGFsLFxuICAgIGdldFNoaXBzQXJyYXksXG4gICAgZ2V0TWlzc2VkQXJyYXksXG4gICAgZ2V0SGl0QXJyYXksXG4gICAgZ2V0QWxsU3Vua1NoaXBzLFxuICAgIGdldFJpbmdDb29yZGluYXRlcyxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGFyZUFsbFNoaXBzU3VuayxcbiAgICBhdXRvUGxhY2VTaGlwcyxcbiAgICBpc0hpdCxcbiAgICBpc01pc3NlZCxcbiAgICBpc1N1bmssXG4gICAgaXNCZXlvbmRCb2FyZCxcbiAgICBnZXRTaGlwLFxuICAgIGFkZFRvTWlzc2VkQXJyYXksXG4gICAgdXBkYXRlU2hpcENvb3JkaW5hdGVzLFxuICAgIHJvdGF0ZVNoaXAsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7XG4iLCJpbXBvcnQgZ2FtZUxvb3AgZnJvbSAnLi9nYW1lX2xvb3AnO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUGxheWVyID0gKGdhbWVib2FyZCwgbmFtZSA9ICdwbGF5ZXInKSA9PiAoe1xuICBuYW1lLFxuICBnYW1lYm9hcmQsXG59KTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbXB1dGVyID0gKGdhbWVib2FyZCwgbmFtZSA9ICdjb21wdXRlcicpID0+IHtcbiAgY29uc3QgYWxsQ29vcmRpbmF0ZXMgPSBbXTtcbiAgbGV0IGxhc3RIaXQ7XG4gIGxldCBmaXJzdEhpdDtcbiAgY29uc3QgdGFyZ2V0UXVldWUgPSBbXTtcbiAgbGV0IGRpcmVjdGlvbjtcblxuICBjb25zdCByZW1vdmVEdXBsaWNhdGVzID0gKGFycmF5KSA9PiB7XG4gICAgYXJyYXkuZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gYWxsQ29vcmRpbmF0ZXMuZmluZEluZGV4KFxuICAgICAgICAoaXRlbSkgPT4gaXRlbVswXSA9PT0gY29vcmRbMF0gJiYgaXRlbVsxXSA9PT0gY29vcmRbMV0sXG4gICAgICApO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBhbGxDb29yZGluYXRlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIChmdW5jdGlvbiBzaHVmZmxlQWxsQ29vcmRpbmF0ZXMoKSB7XG4gICAgY29uc3QgZ3JpZFNpemUgPSAxMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRTaXplOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ3JpZFNpemU7IGogKz0gMSkge1xuICAgICAgICBhbGxDb29yZGluYXRlcy5wdXNoKFtpLCBqXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IGFsbENvb3JkaW5hdGVzLmxlbmd0aCAtIDE7IGkgPiAwOyBpIC09IDEpIHtcbiAgICAgIGNvbnN0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICAgIFthbGxDb29yZGluYXRlc1tpXSwgYWxsQ29vcmRpbmF0ZXNbal1dID0gW1xuICAgICAgICBhbGxDb29yZGluYXRlc1tqXSxcbiAgICAgICAgYWxsQ29vcmRpbmF0ZXNbaV0sXG4gICAgICBdO1xuICAgIH1cbiAgfSkoKTtcblxuICBjb25zdCBnZXRBdHRhY2tDb29yZGluYXRlcyA9ICgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lTG9vcC5nZXRQbGF5ZXJHYW1lYm9hcmQoKTtcbiAgICByZW1vdmVEdXBsaWNhdGVzKHBsYXllckdhbWVib2FyZC5nZXRNaXNzZWRBcnJheSgpKTtcbiAgICByZXR1cm4gYWxsQ29vcmRpbmF0ZXMucG9wKCk7XG4gIH07XG5cbiAgY29uc3QgZ2V0TmV4dERpcmVjdGlvbiA9IChkaXIpID0+IHtcbiAgICBzd2l0Y2ggKGRpcikge1xuICAgICAgY2FzZSAndXAnOlxuICAgICAgICByZXR1cm4gJ2Rvd24nO1xuICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0TmV4dFRhcmdldEluU2FtZURpcmVjdGlvbiA9IChwbGF5ZXJHYW1lYm9hcmQsIHRhcmdldCkgPT4ge1xuICAgIGxldCB2YWxpZEF0dGFjayA9IGZhbHNlO1xuICAgIGxldCB0cmllZEFsbERpcmVjdGlvbnMgPSBmYWxzZTtcblxuICAgIHdoaWxlICghdmFsaWRBdHRhY2sgJiYgIXRyaWVkQWxsRGlyZWN0aW9ucykge1xuICAgICAgY29uc3QgbmV4dFRhcmdldCA9IFsuLi50YXJnZXRdO1xuICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgIG5leHRUYXJnZXRbMF0gLT0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgbmV4dFRhcmdldFswXSArPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICBuZXh0VGFyZ2V0WzFdIC09IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbmV4dFRhcmdldFsxXSArPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHBsYXllckdhbWVib2FyZC5pc0JleW9uZEJvYXJkKG5leHRUYXJnZXQpIHx8XG4gICAgICAgIHBsYXllckdhbWVib2FyZC5pc01pc3NlZChuZXh0VGFyZ2V0WzBdLCBuZXh0VGFyZ2V0WzFdKSB8fFxuICAgICAgICBwbGF5ZXJHYW1lYm9hcmQuaXNIaXQobmV4dFRhcmdldFswXSwgbmV4dFRhcmdldFsxXSlcbiAgICAgICkge1xuICAgICAgICBkaXJlY3Rpb24gPSBnZXROZXh0RGlyZWN0aW9uKGRpcmVjdGlvbik7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gbnVsbCkge1xuICAgICAgICAgIHRyaWVkQWxsRGlyZWN0aW9ucyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHJpZWRBbGxEaXJlY3Rpb25zKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID09PSBsYXN0SGl0ID8gZmlyc3RIaXQgOiBsYXN0SGl0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsaWRBdHRhY2sgPSB0cnVlO1xuICAgICAgICByZXR1cm4gbmV4dFRhcmdldDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgY29uc3QgY29tcHV0ZXJBdHRhY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gZ2FtZUxvb3AuZ2V0UGxheWVyR2FtZWJvYXJkKCk7XG4gICAgcmVtb3ZlRHVwbGljYXRlcyhwbGF5ZXJHYW1lYm9hcmQuZ2V0TWlzc2VkQXJyYXkoKSk7XG4gICAgaWYgKHRhcmdldFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHJlbW92ZUR1cGxpY2F0ZXModGFyZ2V0UXVldWUpO1xuICAgICAgY29uc3QgbmV4dEF0dGFjayA9IHRhcmdldFF1ZXVlLnNoaWZ0KCk7XG4gICAgICBwbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhuZXh0QXR0YWNrKTtcbiAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuaXNIaXQobmV4dEF0dGFja1swXSwgbmV4dEF0dGFja1sxXSkpIHtcbiAgICAgICAgaWYgKHBsYXllckdhbWVib2FyZC5nZXRTaGlwKG5leHRBdHRhY2tbMF0sIG5leHRBdHRhY2tbMV0pLnN1bmspIHJldHVybjtcbiAgICAgICAgbGFzdEhpdCA9IG5leHRBdHRhY2s7XG4gICAgICAgIGNvbnN0IG5leHRUYXJnZXQgPSBnZXROZXh0VGFyZ2V0SW5TYW1lRGlyZWN0aW9uKFxuICAgICAgICAgIHBsYXllckdhbWVib2FyZCxcbiAgICAgICAgICBsYXN0SGl0LFxuICAgICAgICApO1xuICAgICAgICBpZiAobmV4dFRhcmdldCkgdGFyZ2V0UXVldWUudW5zaGlmdChuZXh0VGFyZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpcmVjdGlvbiA9IGdldE5leHREaXJlY3Rpb24oZGlyZWN0aW9uKTtcbiAgICAgICAgY29uc3QgbmV4dFRhcmdldCA9IGdldE5leHRUYXJnZXRJblNhbWVEaXJlY3Rpb24oXG4gICAgICAgICAgcGxheWVyR2FtZWJvYXJkLFxuICAgICAgICAgIGZpcnN0SGl0LFxuICAgICAgICApO1xuICAgICAgICBpZiAobmV4dFRhcmdldCkgdGFyZ2V0UXVldWUudW5zaGlmdChuZXh0VGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV4dEF0dGFjayA9IGFsbENvb3JkaW5hdGVzLnBvcCgpO1xuICAgICAgcGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2sobmV4dEF0dGFjayk7XG4gICAgICBpZiAocGxheWVyR2FtZWJvYXJkLmlzSGl0KG5leHRBdHRhY2tbMF0sIG5leHRBdHRhY2tbMV0pKSB7XG4gICAgICAgIGZpcnN0SGl0ID0gWy4uLm5leHRBdHRhY2tdO1xuICAgICAgICBsYXN0SGl0ID0gbmV4dEF0dGFjaztcbiAgICAgICAgZGlyZWN0aW9uID0gJ3VwJztcbiAgICAgICAgY29uc3QgbmV4dFRhcmdldCA9IGdldE5leHRUYXJnZXRJblNhbWVEaXJlY3Rpb24oXG4gICAgICAgICAgcGxheWVyR2FtZWJvYXJkLFxuICAgICAgICAgIGxhc3RIaXQsXG4gICAgICAgICk7XG4gICAgICAgIGlmIChuZXh0VGFyZ2V0KSB0YXJnZXRRdWV1ZS51bnNoaWZ0KG5leHRUYXJnZXQpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBuYW1lLCBnYW1lYm9hcmQsIGNvbXB1dGVyQXR0YWNrLCBnZXRBdHRhY2tDb29yZGluYXRlcyB9O1xufTtcbiIsImNvbnN0IGNyZWF0ZVNoaXAgPSAobGVuZ3RoLCBjb29yZGluYXRlcywgc3RhcnQpID0+ICh7XG4gIGxlbmd0aCxcbiAgY29vcmRpbmF0ZXMsXG4gIHN0YXJ0LFxuICBoaXROdW1iZXI6IDAsXG4gIHN1bms6IGZhbHNlLFxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXROdW1iZXIgKz0gMTtcbiAgfSxcbiAgaXNTdW5rKCkge1xuICAgIHRoaXMuc3VuayA9IHRoaXMubGVuZ3RoID09PSB0aGlzLmhpdE51bWJlcjtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy9ET00uanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=