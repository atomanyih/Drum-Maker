var React = require('react');
var SVG = require('./svg');
import {GridPath} from './grid'
var DrumPath = require('./shapes/drum');
var BoardPath = require('./shapes/board');

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
        <BoardPath unit={60}
                   board={board}
                   transform={`translate(${width/2},0)`}
                   opacity={0.2}/>
        <BoardPath unit={60}
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
    const {width, height, drumPlan} = this.props;
    const {radius} = drumPlan;

    const unit = 10;
    const centerY = radius * unit;

    return (
      <SVG width={width} height={height}>
        <GridPath unit={unit} width={width} height={height}/>

        <DrumPath transform={`translate(${width / 2},${height / 2 - centerY})`}
                  drumPlan={drumPlan}
                  unit={unit}/>
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
    const {width, height, drumPlan} = this.props;

    return (
      <SVG width={width} height={height}>
        <DrumPath transform={`translate(${width / 2},1)`} drumPlan={drumPlan} unit={60}/>
      </SVG>
    );
  }
})