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
    const {numBoards, handleChange, pattern} = this.props;

    function handleBoardChange(event) {
      handleChange('numBoards', event);
    }

    function handlePatternChange(event) {
      handleChange('pattern', event);
    }

    return (
      <div>
        <label>
          Number of boards:
          <input type="number" defaultValue={numBoards} min={3} onChange={handleBoardChange}/>
        </label>
        <label>
          Board pattern:
          <select defaultValue={pattern} onChange={handlePatternChange}>
            <option>Uniform</option>
            <option>Alternating</option>
          </select>
        </label>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState() {
    return {
      numBoards: 10,
      pattern: 'Alternating',
    }
  },
  handleChange(key, event) {
    let state = {};
    state[key] = event.target.value;
    this.setState(state);
  },
  render() {
    var drumPlan = new DrumPlan(this.state.numBoards, TwoByFour, this.state.pattern == 'Alternating');
    return (
      <div className="drumApp">
        <div>
          <Controls handleChange={this.handleChange} numBoards={this.state.numBoards} pattern={this.state.pattern}/>
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