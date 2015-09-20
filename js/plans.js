export function DrumPlan(numBoards, board) {
  var radius = board.length / ( 2 * Math.tan(Math.PI / numBoards));
  var cutAngle = 90 - 90 * (numBoards - 2) / numBoards;
  return {
    radius: radius,
    cutAngle: cutAngle,
    numBoards: numBoards
  };
}

export function Board(length, height) {
  return {
    length: length,
    height: height
  };
}

export const TwoByFour = new Board(3.5, 1.5);