import DOMModule from './DOM';
import { createComputer, createPlayer } from './player';
import gameboard from './gameboard';

const gameLoop = (() => {
  let player;
  let computer;
  let playerAttack = true;

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

  function playRound(coord) {
    if (playerAttack) {
      computer.gameboard.receiveAttack(coord);
      playerAttack = false;
    } else {
      player.gameboard.receiveAttack(coord);
      playerAttack = true;
    }
  }

  const checkPlayerWin = () => computer.gameboard.areAllShipsSunk();

  const checkComputerWin = () => player.gameboard.areAllShipsSunk();

  return {
    createPlayers,
    autoPlaceShips,
    getPlayerGameboard,
    getComputerGameboard,
    playRound,
    checkPlayerWin,
    checkComputerWin,
    getComputer,
  };
})();

export default gameLoop;
