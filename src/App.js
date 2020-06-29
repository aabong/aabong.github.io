import React from 'react';
import StateTable from './StateTable';
import Grid from './Grid';
import defaultStates from './DefaultStates.json';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { states: this.convertJSONToMap(defaultStates) };
    this.onAddState = this.onAddState.bind(this);
    this.onRemoveState = this.onRemoveState.bind(this);
  }

  convertJSONToMap(json) {
    let map = new Map(json);
    for (let entry of map.entries()) {
      entry[1].transitions = new Map(entry[1].transitions);
    }

    return map;
  }

  onAddState() {
    let keys = Array.from(this.state.states.keys());
    let index = this.state.states.size === 0 ? 0 : keys[keys.length - 1] + 1;
    this.setState({
      states: this.state.states.set(index, {
        key: index,
        name: 'New State',
        isAccept: false,
        transitions: new Map(),
      }),
    });
  }

  onRemoveState = (index) => () => {
    this.state.states.forEach((state, stateKey, map) => {
      if (stateKey !== index) {
        state.transitions.forEach((transition, transitionKey, map) => {
          if (transition.nextState === index) {
            transition.nextState = stateKey;
          }
        });
      }
    });
    this.state.states.delete(index);
    this.setState(this.state);
  };

  onStateNameChange = (index) => (e) => {
    this.state.states.get(index).name = e.target.value;
    this.setState(this.state);
  };

  onAcceptChange = (index) => (e) => {
    this.state.states.get(index).isAccept = e.target.checked;
    this.setState(this.state);
  };

  onAddTransition = (data) => {
    this.state.states.get(data.stateIndex).transitions.set(data.key, {
      state: parseInt(data.stateIndex),
      key: parseInt(data.key),
      direction: data.direction,
      nextState: parseInt(data.stateIndex),
    });
    this.setState(this.state);
  };

  onRemoveTransition = (data) => {
    this.state.states
      .get(data.stateIndex)
      .transitions.delete(data.transitionIndex);
    this.setState(this.state);
  };

  onTransitionDirectionChange = (data) => {
    this.state.states
      .get(data.stateIndex)
      .transitions.get(data.transitionIndex).direction = data.direction;
    this.setState(this.state);
  };

  onTransitionStateChange = (data) => {
    this.state.states
      .get(data.stateIndex)
      .transitions.get(data.transitionIndex).nextState = data.nextState;
    this.setState(this.state);
  };

  render() {
    return (
      <div className='App'>
        <StateTable
          states={this.state.states}
          onAddState={this.onAddState}
          onRemoveState={this.onRemoveState}
          onStateNameChange={this.onStateNameChange}
          onAcceptChange={this.onAcceptChange}
          onAddTransition={this.onAddTransition}
          onRemoveTransition={this.onRemoveTransition}
          onTransitionDirectionChange={this.onTransitionDirectionChange}
          onTransitionStateChange={this.onTransitionStateChange}
        />
        <Grid />
      </div>
    );
  }
}

export default App;
