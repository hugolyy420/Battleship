import gameboard from '../js/gameboard';
// create a 2D gameboard with 10 rows and 10 cols
// test add ship horizontally by calculating feasible coordinates

describe('place ship logic', () => {
  const newGameboard = gameboard();
  const coordinates = [3, 3];
  const verticalCoordinates = [6, 3];

  test('place ship horizontally', () => {
    expect(newGameboard.placeShip(5, coordinates)).toHaveProperty(
      'coordinates',
      [
        [3, 3],
        [3, 4],
        [3, 5],
        [3, 6],
        [3, 7],
      ],
    );
  });

  test('place ship vertically', () => {
    newGameboard.setVertical();
    expect(newGameboard.placeShip(2, verticalCoordinates)).toHaveProperty(
      'coordinates',
      [
        [6, 3],
        [5, 3],
      ],
    );
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

  test('throw error if the coordinates are', () => {
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
