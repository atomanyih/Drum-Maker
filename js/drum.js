var React = require('react');
var {DrumPlan, Board, TwoByFour} = require('./plans');
var {BoardDiagram, DrumDiagram} = require('./diagram');

var NumberDisplay = React.createClass({
  render() {
    function round(num) {
      return Math.round(num * 100) / 100;
    }

    return (
      <div>
        {this.props.label}: {round(this.props.value)}
      </div>
    );
  }
});

var Controls = React.createClass({
  propTypes: {
    numBoards: React.PropTypes.number,
    handleChange: React.PropTypes.func,
  },
  render() {
    const {numBoards, handleChange} = this.props;

    return (
      <div>
        <label>
          Number of boards:
          <input type="number" defaultValue={numBoards} min={3} onChange={handleChange}/>
        </label>
      </div>
    );
  }
})

var App = React.createClass({
  getInitialState() {
    return {
      numBoards: 4
    }
  },
  handleChange(event) {
    this.setState({numBoards: event.target.value});
  },
  render() {
    var drumPlan = new DrumPlan(this.state.numBoards, TwoByFour);
    return (
      <div className="drumApp">
        <div>
          <Controls handleChange={this.handleChange} numBoards={this.state.numBoards}/>
          <NumberDisplay label="Radius" value={drumPlan.radius}/>
          <NumberDisplay label="Cut Angle" value={drumPlan.cutAngle}/>
          <BoardDiagram board={TwoByFour} cutAngle={drumPlan.cutAngle}/>
        </div>
        <div>
          <DrumDiagram drumPlan={drumPlan} board={TwoByFour}/>
        </div>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('root'));