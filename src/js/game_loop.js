import createPlayer from './player';
import gameboard from './gameboard';

const gameLoop = (() => {
  let player;
  let computer;

  function createPlayers(name) {
    this.player = createPlayer(gameboard(), name);
    this.computer = createPlayer(gameboard());
  }

  function autoPlaceShips() {
    const arr = [this.player, this.computer];
    arr.forEach((player) => {
      player.gameboard.autoPlaceShips();
    });
  }

  return { player, computer, createPlayers, autoPlaceShips };
})();

export default gameLoop;
