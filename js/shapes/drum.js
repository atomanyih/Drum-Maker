var React = require('react');
var SVG = require('../svg');
var BoardPath = require('./board');

export default React.createClass({
  render() {
    const {board, drumPlan, unit} = this.props;
    const {cutAngle, numBoards, radius, alternating} = drumPlan;

    const centerY = radius * unit;

    let boards = [];

    for (let i = 0; i < numBoards; i++) {
      let transform = `rotate(${360 / numBoards * i},0,${centerY})`;

      if (alternating && (i % 2)) {
        boards.push(
          <BoardPath unit={unit} board={board} transform={transform}/>
        );
      } else {
        boards.push(
          <BoardPath unit={unit} board={board} cutAngle={cutAngle} transform={transform}/>
        );
      }
    }

    return (
      <g transform={this.props.transform}>
        {boards}
      </g>
    );
  }
});
