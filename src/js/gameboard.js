import createShip from './ship';

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
      if (vertical) newCoordinates = [(row -= 1), col];
      else newCoordinates = [row, (col += 1)];
      if (isBeyondBoard(newCoordinates))
        throw new Error('New coordinates beyond the board');
      if (isOccupied(newCoordinates)) throw new Error('Coordinates occupied');

      coordinatesArray.push(newCoordinates);
    }

    return coordinatesArray;
  };

  const placeShip = (length, coordinates) => {
    if (isBeyondBoard(coordinates))
      throw new Error('Coordinates beyond the board');
    if (isOccupied(coordinates)) throw new Error('Coordinates occupied');
    const coordinatesArray = generateShipCoordinates(length, coordinates);
    if (isNextToShips(coordinatesArray))
      throw new Error(
        'Please ensure ships are at least 1 unit away from one another',
      );
    const shipInstance = createShip(length, coordinatesArray);
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
        } catch (error) {
          console.log(error);
        }
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
  };
};

export default gameboard;
