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
      <div>
        <div>
          <label>
            Number of boards:
            <input type="number" defaultValue={this.state.numBoards} min={3} onChange={this.handleChange}/>
          </label>
          <NumberDisplay label="Radius" value={drumPlan.radius}/>
          <NumberDisplay label="Cut Angle" value={drumPlan.cutAngle}/>
        </div>
        <div>
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