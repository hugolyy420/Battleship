import gameLoop from './game_loop';

export const createPlayer = (gameboard, name = null) => {
  return { name, gameboard };
};

export const createComputer = (gameboard, name = 'computer') => {
  const allCoordinates = [];
  let lastHit;
  let targetQueue = [];
  let direction;

  const shuffleAllCoordinates = (() => {
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

  const generateRandomCoord = () => {
    const nextAttack = allCoordinates.pop();
    return nextAttack;
  };

  const getNextDirection = (direction) => {
    switch (direction) {
      case 'up':
        return 'down';
        break;
      case 'down':
        return 'left';
        break;
      case 'left':
        return 'right';
        break;
    }
  };

  const getNextTargetInSameDirection = (lastHit, direction) => {};

  const computerAttack = () => {
    const playerGameboard = gameLoop.getPlayerGameboard();
    if (targetQueue.length > 0) {
      let nextAttack = targetQueue.shift();
      if (this.gameboard.isHit(nextAttack[0], nextAttack[1])) {
        lastHit = nextAttack;
        let nextTarget = getNextTargetInSameDirection(lastHit, direction);
        if (nextTarget) targetQueue.unshift(nextTarget);
      } else {
        direction = getNextDirection(direction);
        let nextTarget = getNextTargetInSameDirection(lastHit, direction);
        if (nextTarget) targetQueue.unshift(nextTarget);
      }
    } else {
      let nextAttack = allCoordinates.pop();
      playerGameboard.receiveAttack(nextAttack);
      if (playerGameboard.isHit(nextAttack[0], nextAttack[1])) {
        lastHit = nextAttack;
        direction = 'up'; // start with 'up'
        let nextTarget = getNextTargetInSameDirection(lastHit, direction);
        if (nextTarget) targetQueue.unshift(nextTarget);
      }
    }
  };

  return { name, gameboard, generateRandomCoord };
};
