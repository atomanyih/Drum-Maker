var React = require('react');
var SVG = require('../svg');

export default React.createClass({
  getDefaultProps() {
    return {
      cutAngle: 0
    };
  },
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
      <SVG.Path pathData={pathData.toString()} transform={this.props.transform} opacity={this.props.opacity}/>
    );
  }
});