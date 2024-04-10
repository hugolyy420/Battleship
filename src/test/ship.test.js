import createShip from '../js/ship';

test('Create ship with correct length', () => {
  const ship = createShip(5);
  expect(ship).toHaveProperty('length', 5);
});

test('Increase hit number', () => {
  const ship = createShip(4);
  expect(ship).toHaveProperty('hitNumber', 0);
  ship.hit();
  expect(ship).toHaveProperty('hitNumber', 1);
});

test('Sunk ship', () => {
  const ship = createShip(1);
  expect(ship).toHaveProperty('sunk', false);
  ship.hit();
  ship.isSunk();
  expect(ship).toHaveProperty('sunk', true);
});
