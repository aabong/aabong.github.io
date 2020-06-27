import React from 'react';
import NewTransitionSelector from './NewTransitionSelector';
import TransitionEntry from './TransitionEntry';

class StateEntry extends React.Component {
  render() {
    return (
      <tr className='State-Row'>
        <input
          type='text'
          defaultValue={this.props.name}
          onChange={this.props.onNameChange}
        />
        <button className='Remove-State' onClick={this.props.onRemove}>
          x
        </button>
        <br />
        <input
          type='checkbox'
          name='accept'
          onChange={this.props.onAcceptChange}
        />
        <label for='accept'>Is Accept State?</label>
        <br />
        <NewTransitionSelector
          stateIndex={this.props.stateIndex}
          transitions={this.props.transitions}
          onNewTransition={this.props.onNewTransition}
        />
        <table class='Transition-Table'>
          {Array.from(this.props.transitions.keys()).map((transitionKey) => {
            let transition = this.props.transitions.get(transitionKey);
            return (
              <TransitionEntry
                stateIndex={this.props.stateIndex}
                transitionIndex={transition.key}
                image={transition.image}
                onRemove={this.props.onRemoveTransition}
              />
            );
          })}
        </table>
      </tr>
    );
  }
}

export default StateEntry;
