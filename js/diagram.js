var React = require('react');
var SVG = require('./svg');
import {GridPath} from './grid'

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
    const {width, height, board, cutAngle} = this.props;

    return (
      <SVG width={width} height={height}>
        <BoardPath unit={60} board={board} transform={`translate(${width/2},0)`} opacity={0.2}/>
        <CutBoardPath unit={60}
                      board={board}
                      cutAngle={cutAngle}
                      transform={`translate(${width/2},0)`}/>
      </SVG>
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

    const unit = 10;
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
          <CutBoardPath unit={unit} board={board} cutAngle={cutAngle} transform={transform}/>
        );
      }
    }

    return (
      <SVG width={width} height={height}>
        <GridPath unit={unit} width={width} height={height}/>

        <g transform={`translate(${width / 2},${height / 2 - centerY})`}>
          {boards}
        </g>
      </SVG>
    );
  }
});

export const JointDiagram = React.createClass({
  getDefaultProps: function () {
    return {
      width: 256,
      height: 256,
    }
  },

  render() {
    const {width, height, board, drumPlan} = this.props;
    const {cutAngle, numBoards, radius, alternating} = drumPlan;

    const unit = 60;
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
          <CutBoardPath unit={unit} board={board} cutAngle={cutAngle} transform={transform}/>
        );
      }
    }

    return (
      <SVG width={width} height={height}>
        <g transform={`translate(${width / 2},1)`}>
          {boards}
        </g>
      </SVG>
    );
  }
})