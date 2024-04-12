const createPlayer = (gameboard, name = 'computer') => {
  const generateRandomCoord = () => {
    const gridSize = 10;
    const allCoordinates = [];
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

    const nextAttack = allCoordinates.pop();
    return nextAttack;
  };

  return { name, gameboard, generateRandomCoord };
};

export default createPlayer;
