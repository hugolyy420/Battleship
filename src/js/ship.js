const createShip = (length) => ({
  length,
  hitNumber: 0,
  sunk: false,
  hit() {
    this.hitNumber += 1;
  },
  isSunk() {
    this.sunk = this.length === this.hitNumber;
  },
});

export default createShip;
