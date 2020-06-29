import React from 'react';
import NewTransitionSelector from './NewTransitionSelector';
import TransitionEntry from './TransitionEntry';

class StateEntry extends React.Component {
  render() {
    return (
      <tr
        className={
          'State-Row' +
          (this.props.currentState === this.props.stateIndex
            ? ' Current-State'
            : '')
        }
      >
        <input
          type='text'
          defaultValue={this.props.name}
          onChange={this.props.onNameChange}
          disabled={this.props.isRunning}
        />
        <button
          className='Remove-State'
          onClick={this.props.onRemove}
          disabled={this.props.isRunning}
        >
          x
        </button>
        <br />
        <input
          type='checkbox'
          name={'accept-' + this.props.stateIndex}
          id={'accept-' + this.props.stateIndex}
          checked={this.props.accept}
          onChange={this.props.onAcceptChange}
          disabled={this.props.isRunning}
        />
        <label for={'accept-' + this.props.stateIndex}>Is Accept State?</label>
        <br />
        <NewTransitionSelector
          isRunning={this.props.isRunning}
          stateIndex={this.props.stateIndex}
          transitions={this.props.transitions}
          onAddTransition={this.props.onAddTransition}
        />
        <table class='Transition-Table'>
          {this.props.transitions.size > 0 && (
            <tr>
              <th>Wall Type</th>
              <th>Direction</th>
              <th>Next State</th>
            </tr>
          )}
          {Array.from(this.props.transitions.keys()).map((transitionKey) => {
            let transition = this.props.transitions.get(transitionKey);
            return (
              <TransitionEntry
                states={this.props.states}
                isRunning={this.props.isRunning}
                stateIndex={this.props.stateIndex}
                transitionIndex={transition.key}
                direction={transition.direction}
                nextState={transition.nextState}
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
