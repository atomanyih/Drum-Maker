export function DrumPlan(numBoards, board, alternating) {
  var radius = board.length / ( 2 * Math.tan(Math.PI / numBoards));
  var cutAngle = 90 - 90 * (numBoards - 2) / numBoards;
  if(alternating) {
    cutAngle = cutAngle * 2;
  }
  return {
    radius: radius,
    cutAngle: cutAngle,
    numBoards: numBoards,
    alternating: alternating,
    board: board,
  };
}

export function Board(length, height) {
  return {
    length: length,
    height: height,
    flipped() {
      return new Board(height, length)
    }
  };
}

export const TwoByFour = new Board(3.5, 1.5).flipped();