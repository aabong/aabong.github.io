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
          name={'accept-' + this.props.stateIndex}
          id={'accept-' + this.props.stateIndex}
          onChange={this.props.onAcceptChange}
        />
        <label for={'accept-' + this.props.stateIndex}>Is Accept State?</label>
        <br />
        <NewTransitionSelector
          stateIndex={this.props.stateIndex}
          transitions={this.props.transitions}
          onAddTransition={this.props.onAddTransition}
        />
        <table class='Transition-Table'>
          {Array.from(this.props.transitions.keys()).map((transitionKey) => {
            let transition = this.props.transitions.get(transitionKey);
            return (
              <TransitionEntry
                states={this.props.states}
                stateIndex={this.props.stateIndex}
                transitionIndex={transition.key}
                nextState={transition.nextState}
                image={transition.image}
                onRemove={this.props.onRemoveTransition}
                onTransitionDirectionChange={
                  this.props.onTransitionDirectionChange
                }
                onTransitionStateChange={this.props.onTransitionStateChange}
              />
            );
          })}
        </table>
      </tr>
    );
  }
}

export default StateEntry;
