var React = require('react');

const SVG = React.createClass({
  getDefaultProps: function() {
    return {
      width: 128,
      height: 64,
      fill: 'currentcolor'
    }
  },

  render: function() {
    const {width, height, fill} = this.props;

    var viewBox = [0, 0, width, height].join(' ');

    return (
      <svg xmlns="http://www.w3.org/svg/2000"
           viewBox={viewBox}
           width={width}
           height={height}
           stroke={fill}
           fill="none">
        {this.props.children}
      </svg>
    );
  }
});

SVG.Path = React.createClass({
  render: function() {
    return (
      <path d={this.props.pathData} transform={this.props.transform} opacity={this.props.opacity}/>
    );
  }
});

module.exports = SVG;