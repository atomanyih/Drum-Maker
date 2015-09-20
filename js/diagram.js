var React = require('react');
var SVG = require('./svg');

const CutBoardPath = React.createClass({
  propTypes: {
    unit: React.PropTypes.number,
    board: React.PropTypes.object,
  },
  render: function () {
    var width = this.props.board.length * this.props.unit;
    var height = this.props.board.height * this.props.unit;

    var cutAngle = this.props.cutAngle;

    var cutOffset = height *  Math.tan(cutAngle / 180 * Math.PI);

    var pathData = [
      'M', -width / 2, 0,
      'L', width / 2, 0,
      'L', width / 2 - cutOffset, height,
      'L', cutOffset - width / 2, height,
      'L', -width / 2, 0,
    ].join(' ');

    return (
      <SVG.Path pathData={pathData} transform={this.props.transform}/>
    );
  }
});

const BoardPath = React.createClass({
  render: function () {
    var width = this.props.board.length * this.props.unit;
    var height = this.props.board.height * this.props.unit;

    var pathData = [
      'M', -width / 2, 0,
      'L', width / 2, 0,
      'L', width / 2, height,
      'L', -width / 2, height,
      'L', -width / 2, 0,
    ].join(' ');

    return (
      <SVG.Path pathData={pathData} transform={this.props.transform} opacity={this.props.opacity}/>
    );
  }
});

export const BoardDiagram = React.createClass({
  getDefaultProps: function () {
    return {
      width: 256,
      height: 256,
    }
  },

  render: function () {
    const {width, height} = this.props;

    return (
      <SVG width={width} height={height}>
        <BoardPath unit={60} board={this.props.board} transform={`translate(${width/2},0)`} opacity={0.2}/>
        <CutBoardPath unit={60}
                   board={this.props.board}
                   cutAngle={this.props.cutAngle}
                   transform={`translate(${width/2},0)`}/>
      </SVG>
    );
  }
});

export const DrumDiagram = React.createClass({
  getDefaultProps: function () {
    return {
      width: 256,
      height: 256,
    }
  },

  render() {
    const {width, height, board, drumPlan} = this.props;
    const {cutAngle, numBoards, radius} = drumPlan;
    let boards = [];

    const unit = height / (2*radius);

    for (let i = 0; i < numBoards; i++) {
      let transform = `translate(${width/2}) rotate(${360 / numBoards * i},0,${height / 2})`;

      boards.push(
        <CutBoardPath unit={unit} board={board} cutAngle={cutAngle} transform={transform}/>
      );
    }

    return (
      <SVG width={width} height={height}>
        {boards}
      </SVG>
    );
  }
});