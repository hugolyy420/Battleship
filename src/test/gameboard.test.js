import gameboard from '../js/gameboard';
// create a 2D gameboard with 10 rows and 10 cols
// test add ship horizontally by calculating feasible coordinates

describe('place ship logic', () => {
  const newGameboard = gameboard();
  const coordinates = [3, 3];
  const verticalCoordinates = [6, 3];

  test('place ship horizontally', () => {
    newGameboard.placeShip(5, coordinates);
    expect(newGameboard.getShipsArray()).toEqual([
      expect.objectContaining({
        coordinates: [
          [3, 3],
          [3, 4],
          [3, 5],
          [3, 6],
          [3, 7],
        ],
      }),
    ]);
  });

  test('place ship vertically', () => {
    newGameboard.setVertical();
    newGameboard.placeShip(2, verticalCoordinates);
    expect(newGameboard.getShipsArray()).toEqual([
      expect.anything(),
      expect.objectContaining({
        coordinates: [
          [6, 3],
          [5, 3],
        ],
      }),
    ]);
  });
});

describe('place ship errors', () => {
  const newGameboard = gameboard();
  const coordinates = [3, 3];
  const nextCoordinates = [4, 3];
  const tooCloseCoordinates = [3, 4];
  const badCoordinates = [-1, 0];
  const riskyCoordinates = [0, 8];

  test('throw error if the coordinates are occupied already', () => {
    newGameboard.placeShip(5, coordinates);
    expect(() => newGameboard.placeShip(5, tooCloseCoordinates)).toThrow(
      'Coordinates occupied',
    );
  });

  test('throw error if the coordinates are right next to an existing ship', () => {
    expect(() => newGameboard.placeShip(5, nextCoordinates)).toThrow(
      'Please ensure ships are at least 1 unit away from one another',
    );
  });

  test('throw error if starting coordinate is beyond the board', () => {
    expect(() => newGameboard.placeShip(5, badCoordinates)).toThrow(
      'Coordinates beyond the board',
    );
  });

  test('throw error if any one of the coordinates is beyond the board', () => {
    expect(() => newGameboard.placeShip(5, riskyCoordinates)).toThrow(
      'New coordinates beyond the board',
    );
  });
});

describe('attack logics', () => {
  const newGameboard = gameboard();
  const coordinates = [3, 3];
  newGameboard.placeShip(5, coordinates);
  newGameboard.receiveAttack([3, 3]);
  const shipsArray = newGameboard.getShipsArray();

  test('attack ships', () => {
    expect(shipsArray).toEqual([expect.objectContaining({ hitNumber: 1 })]);
  });

  test('push coordinates into hitArray if hit', () => {
    newGameboard.receiveAttack([3, 4]);
    expect(newGameboard.getHitArray()).toEqual([
      [3, 3],
      [3, 4],
    ]);
  });

  test('push coordinates into missedArray if missed', () => {
    newGameboard.receiveAttack([7, 7]);
    newGameboard.receiveAttack([7, 6]);
    const array = newGameboard.getmissedArray();
    expect(array).toEqual([
      [7, 7],
      [7, 6],
    ]);
  });

  test('throw error if attack same place twice', () => {
    expect(() => newGameboard.receiveAttack([3, 3])).toThrow(
      'You cannot attack the same place twice',
    );
  });
});

describe('gameover logic', () => {
  const newGameboard = gameboard();
  const coordinates = [3, 3];
  newGameboard.placeShip(2, coordinates);

  test('return false if at least one ship is left', () => {
    newGameboard.receiveAttack([3, 3]);
    expect(newGameboard.areAllShipsSunk()).toBeFalsy();
  });

  test('return true if no ship is left', () => {
    newGameboard.receiveAttack([3, 4]);
    expect(newGameboard.areAllShipsSunk()).toBeTruthy();
  });
});
