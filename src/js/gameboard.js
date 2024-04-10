import createShip from './ship';

const gameboard = () => {
  const shipsArray = [];
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
    const coordinatesArray = generateShipCoordinates(length, coordinates);
    const shipInstance = createShip(5, coordinatesArray);
    shipsArray.push(shipInstance);
    return shipInstance;
  };

  return { placeShip, setVertical, setHorizontal };
};

export default gameboard;
