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

    var cutOffset = height * Math.tan(cutAngle / 180 * Math.PI);

    var pathData = SVG.startPath()
      .moveTo(-width / 2, 0)
      .lineTo(width / 2, 0)
      .lineTo(width / 2 - cutOffset, height)
      .lineTo(cutOffset - width / 2, height)
      .lineTo(-width / 2, 0);

    return (
      <SVG.Path pathData={pathData.toString()} transform={this.props.transform}/>
    );
  }
});

const BoardPath = React.createClass({
  render: function () {
    var width = this.props.board.length * this.props.unit;
    var height = this.props.board.height * this.props.unit;

    var pathData = SVG.startPath()
      .moveTo(-width / 2, 0)
      .lineTo(width / 2, 0)
      .lineTo(width / 2, height)
      .lineTo(-width / 2, height)
      .lineTo(-width / 2, 0);

    return (
      <SVG.Path pathData={pathData.toString()} transform={this.props.transform} opacity={this.props.opacity}/>
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

const UnitPath = React.createClass({
  render() {
    var measuredAmount = this.props.unit * 12;
    const pathData = SVG.startPath()
      .moveTo(4, 0)
      .lineTo(4, 4)
      .lineTo(4 + measuredAmount, 4)
      .lineTo(4 + measuredAmount, 0);

    return (
      <SVG.Path pathData={pathData.toString()}/>
    );
  }
});

export const DrumDiagram = React.createClass({
  getDefaultProps: function () {
    return {
      width: 512,
      height: 512,
    }
  },

  render() {
    const {width, height, board, drumPlan} = this.props;
    const {cutAngle, numBoards, radius} = drumPlan;
    let boards = [];

    const unit = 10;
    const centerY = radius * unit;

    for (let i = 0; i < numBoards; i++) {
      let transform = `translate(${width / 2},${height / 2 - centerY}) rotate(${360 / numBoards * i},0,${centerY})`;

      boards.push(
        <CutBoardPath unit={unit} board={board} cutAngle={cutAngle} transform={transform}/>
      );
    }

    return (
      <SVG width={width} height={height}>
        <UnitPath unit={unit}/>
        {boards}
      </SVG>
    );
  }
});