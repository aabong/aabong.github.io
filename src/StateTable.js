import React from 'react';
import StateEntry from './StateEntry';

class StateTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { states: new Map() };
    this.onAddState = this.onAddState.bind(this);
    this.onRemoveState = this.onRemoveState.bind(this);
  }

  onAddState() {
    let keys = Array.from(this.state.states.keys());
    let index = this.state.states.size === 0 ? 0 : keys[keys.length - 1] + 1;
    this.setState({
      states: this.state.states.set(index, {
        key: index,
        name: 'New State',
        isAccept: false,
        isCurrentState: false,
        transitions: new Map(),
      }),
    });
  }

  onRemoveState = (index) => () => {
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

  onNewTransition = (data) => {
    this.state.states.get(data.stateIndex).transitions.set(data.key, {
      key: data.key,
      image: data.image,
      direction: data.direction,
      nextState: data.state,
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

  render() {
    return (
      <table className='State-Table'>
        <th>
          States{' '}
          <button
            className='Add-State'
            onClick={this.onAddState}
            style={{
              display: this.state.states.size < 100 ? 'block' : 'none',
            }}
          >
            +
          </button>
        </th>
        <tbody>
          {Array.from(this.state.states.keys()).map((index) => {
            let state = this.state.states.get(index);

            return (
              <StateEntry
                key={index}
                stateIndex={index}
                name={state.name}
                accept={state.isAccept}
                transitions={state.transitions}
                onRemove={this.onRemoveState(index)}
                onNameChange={this.onStateNameChange(index)}
                onAcceptChange={this.onAcceptChange(index)}
                onNewTransition={this.onNewTransition}
                onRemoveTransition={this.onRemoveTransition}
                onTransitionDirectionChange={this.onTransitionDirectionChange}
              />
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default StateTable;
