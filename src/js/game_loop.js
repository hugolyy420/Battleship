import DOMModule from './DOM';
import { createComputer, createPlayer } from './player';
import gameboard from './gameboard';

const gameLoop = (() => {
  let player;
  let computer;

  const createPlayers = (name) => {
    player = createPlayer(gameboard(), name);
    computer = createComputer(gameboard());
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
    DOMModule.updatePlayerGameboard();
    if (playerWin()) {
      DOMModule.printMessage(player);
      return;
    }
    DOMModule.updateComputerGameboard();
    // const attackCoord = computer.getAttackCoordinates();
    // player.gameboard.receiveAttack(attackCoord);
    computer.computerAttack();
    DOMModule.updatePlayerGameboard();
    if (computerWins()) {
      DOMModule.printMessage(computer);
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

export default gameLoop;
