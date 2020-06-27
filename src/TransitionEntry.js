import React from 'react';

class TransitionEntry extends React.Component {
  constructor(props) {
    super(props);
    this.onRemove = this.onRemove.bind(this);
    this.onDirectionChange = this.onDirectionChange.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
  }

  onRemove(e) {
    this.props.onRemove({
      stateIndex: this.props.stateIndex,
      transitionIndex: this.props.transitionIndex,
    });
  }

  onDirectionChange(e) {
    this.props.onTransitionDirectionChange({
      stateIndex: this.props.stateIndex,
      transitionIndex: this.props.transitionIndex,
      direction: e.target.value,
    });
  }

  onStateChange(e) {
    this.props.onTransitionStateChange({
      stateIndex: this.props.stateIndex,
      transitionIndex: this.props.transitionIndex,
      nextState: e.target.value,
    });
  }

  render() {
    return (
      <tr class='Transition-Row'>
        <td>
          <img className='Transition-Image' src={this.props.image} alt='' />
        </td>
        <td>
          <select
            className='Transition-Direction'
            name='direction'
            onChange={this.onDirectionChange}
          >
            <option value='stay'>Stay</option>
            {(this.props.transitionIndex & 1) === 0 && (
              <option value='left'>Left</option>
            )}
            {(this.props.transitionIndex & 2) === 0 && (
              <option value='down'>Down</option>
            )}
            {(this.props.transitionIndex & 4) === 0 && (
              <option value='right'>Right</option>
            )}
            {(this.props.transitionIndex & 8) === 0 && (
              <option value='up'>Up</option>
            )}
          </select>
        </td>
        <td>
          <select
            className='Next-State-Transition'
            name='nextState'
            onChange={this.onStateChange}
          >
            {Array.from(this.props.states.keys()).map((stateIndex) => {
              let state = this.props.states.get(stateIndex);
              return <option value={state.key}>{state.name}</option>;
            })}
          </select>
        </td>
        <td>
          <button className='Remove-Transition' onClick={this.onRemove}>
            x
          </button>
        </td>
      </tr>
    );
  }
}

export default TransitionEntry;
