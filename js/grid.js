var React = require('react');
var SVG = require('./svg');

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

export const GridPath = React.createClass({
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