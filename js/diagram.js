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

const RulePath = React.createClass({
  render() {
    const {unit, height, width, transform} = this.props;
    const measuredAmount = unit * 12;
    const tickSize = 4;

    const linePath = SVG.startPath()
      .moveTo(0, height / 2)
      .lineTo(width, height / 2);

    let ticks = [];

    for (let x = 0; x < width / 2; x += measuredAmount) {
      const leftTickPath = SVG.startPath()
        .moveTo(width / 2 - x, height / 2 - tickSize)
        .lineTo(width / 2 - x, height / 2 + tickSize);
      const rightTickPath = SVG.startPath()
        .moveTo(width / 2 + x, height / 2 - tickSize)
        .lineTo(width / 2 + x, height / 2 + tickSize);

      ticks.push(
        <g>
          <SVG.Path pathData={leftTickPath.toString()} opacity={.25}/>
          <SVG.Path pathData={rightTickPath.toString()} opacity={.25}/>
        </g>
      )
    }

    return (
      <g transform={transform}>
        <SVG.Path pathData={linePath.toString()} opacity={.25}/>
        {ticks}
      </g>
    );
  }
});

const GridPath = React.createClass({
  render() {
    const {unit, height, width} = this.props;

    return (
      <g>
        <RulePath unit={unit} height={height} width={width}/>
        <RulePath unit={unit} height={height} width={width} transform={`rotate(90,${width/2},${height/2})`}/>
      </g>
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
    const {cutAngle, numBoards, radius, alternating} = drumPlan;
    let boards = [];

    const unit = 10;
    const centerY = radius * unit;

    for (let i = 0; i < numBoards; i++) {
      let transform = `translate(${width / 2},${height / 2 - centerY}) rotate(${360 / numBoards * i},0,${centerY})`;

      if (alternating && (i % 2)) {
        boards.push(
          <BoardPath unit={unit} board={board} transform={transform}/>
        );
      } else {
        boards.push(
          <CutBoardPath unit={unit} board={board} cutAngle={cutAngle} transform={transform}/>
        );
      }

    }

    return (
      <SVG width={width} height={height}>
        <GridPath unit={unit} width={width} height={height}/>
        {boards}
      </SVG>
    );
  }
});