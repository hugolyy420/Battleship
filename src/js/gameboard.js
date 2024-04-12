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

  const getRingCoordinates = (row, col) => {
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

    directions.forEach((dir) => {
      const neighbor = [row + dir[0], col + dir[1]];

      neighboringCoordinates.push(neighbor);
    });
    return neighboringCoordinates;
  };

  const isNextToShips = ([row, col]) => {
    const ringCoordinates = getRingCoordinates(row, col);
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
      if (isNextToShips(newCoordinates))
        throw new Error(
          'Please ensure ships are at least 1 unit away from one another',
        );

      coordinatesArray.push(newCoordinates);
    }

    return coordinatesArray;
  };

  const placeShip = (length, coordinates) => {
    if (isBeyondBoard(coordinates))
      throw new Error('Coordinates beyond the board');
    if (isOccupied(coordinates)) throw new Error('Coordinates occupied');
    if (isNextToShips(coordinates))
      throw new Error(
        'Please ensure ships are at least 1 unit away from one another',
      );
    const coordinatesArray = generateShipCoordinates(length, coordinates);
    const shipInstance = createShip(length, coordinatesArray);
    shipsArray.push(shipInstance);
  };

  const receiveAttack = ([row, col]) => {
    if (isHit(row, col)) return;
    const target = shipsArray.filter((ship) =>
      ship.coordinates.some((coord) => coord[0] === row && coord[1] === col),
    );
    if (target.length > 0) {
      target[0].hit();
      target[0].isSunk();
      hitArray.push([row, col]);
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

  const getmissedArray = () => missedArray;

  const getHitArray = () => hitArray;

  const getShip = (row, col) => {
    return shipsArray.filter((ship) =>
      ship.coordinates.some((coord) => coord[0] === row && coord[1] === col),
    );
  };

  return {
    placeShip,
    setVertical,
    setHorizontal,
    getShipsArray,
    getmissedArray,
    getHitArray,
    receiveAttack,
    areAllShipsSunk,
    autoPlaceShips,
    isHit,
    isMissed,
    getShip,
  };
};

export default gameboard;
