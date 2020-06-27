import React from 'react';

class StateTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { states: new Map() };
    this.addState = this.addState.bind(this);
    this.removeState = this.removeState.bind(this);
  }

  addState() {
    let keys = Array.from(this.state.states.keys());
    let index = this.state.states.size === 0 ? 0 : keys[keys.length - 1] + 1;
    this.setState({
      states: this.state.states.set(index, {
        name: 'New State',
        isAccept: false,
        transitions: {},
      }),
    });
  }

  removeState = (index) => () => {
    this.state.states.delete(index);
    this.setState({ states: this.state.states });
  };

  onNameChange = (index) => (e) => {
    this.state.states.get(index).name = e.target.value;
    this.setState({ states: this.state.states });
  };

  onAcceptChange = (index) => (e) => {
    this.state.states.get(index).isAccept = e.target.checked;
    this.setState({ states: this.state.states });
  };

  render() {
    return (
      <table className='State-Table'>
        <th>
          States{' '}
          <button className='Add-State' onClick={this.addState}>
            +
          </button>
        </th>
        <tbody>
          {Array.from(this.state.states.keys()).map((index) => {
            let state = this.state.states.get(index);

            return (
              <StateEntry
                index={index}
                name={state.name}
                accept={state.isAccept}
                transitions={state.transitions}
                onRemove={this.removeState(index)}
                onNameChange={this.onNameChange(index)}
                onAcceptChange={this.onAcceptChange(index)}
              />
            );
          })}
        </tbody>
      </table>
    );
  }
}

class StateEntry extends React.Component {
  render() {
    return (
      <tr className='State-Row'>
        <input
          type='checkbox'
          name='accept'
          onChange={this.props.onAcceptChange}
        />
        <label for='accept'>Is Accept State?</label>
        <input
          type='text'
          defaultValue={this.props.name}
          onChange={this.props.onNameChange}
        />
        <button onClick={this.props.onRemove}>X</button>
      </tr>
    );
  }
}

export default StateTable;
