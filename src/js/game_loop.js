import DOMModule from './DOM';
import createComputer from './computer';
import createPlayer from './player';
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

  const getPlayer = () => player;

  const playerWin = () => computer.gameboard.areAllShipsSunk();

  const computerWins = () => player.gameboard.areAllShipsSunk();

  const resetComputer = () => computer.resetComputer();

  const checkWin = () => {
    if (playerWin()) DOMModule.printMessage(getPlayer());
    else if (computerWins()) DOMModule.printMessage(getComputer());

    if (playerWin() || computerWins()) {
      DOMModule.toggleGameboardEventListenerStatus();
      DOMModule.toggleButtonSectionDisplay();

      return true;
    }
  };

  function playRound(coord) {
    computer.gameboard.receiveAttack(coord);
    DOMModule.updateComputerGameboard();

    if (checkWin()) return;

    computer.computerAttack();
    DOMModule.updatePlayerGameboard();

    if (checkWin()) return;
  }

  return {
    createPlayers,
    autoPlaceShips,
    getPlayerGameboard,
    getComputerGameboard,
    playRound,
    getComputer,
    getPlayer,
    resetComputer,
  };
})();

export default gameLoop;
