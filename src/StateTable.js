import React from 'react';
import StateEntry from './StateEntry';

class StateTable extends React.Component {
  render() {
    return (
      <div className='State-Container'>
        <table className='State-Table'>
          <th>
            States{' '}
            <button
              className='Add-State'
              onClick={this.props.onAddState}
              style={{
                display: this.props.states.size < 100 ? 'block' : 'none',
              }}
              disabled={this.props.isRunning}
            >
              +
            </button>
          </th>
          <tbody>
            {Array.from(this.props.states.keys()).map((index) => {
              let state = this.props.states.get(index);

              return (
                <StateEntry
                  key={index}
                  stateIndex={index}
                  name={state.name}
                  accept={state.isAccept}
                  states={this.props.states}
                  isRunning={this.props.isRunning}
                  currentState={this.props.currentState}
                  transitions={state.transitions}
                  onRemove={this.props.onRemoveState(index)}
                  onNameChange={this.props.onStateNameChange(index)}
                  onAcceptChange={this.props.onAcceptChange(index)}
                  onAddTransition={this.props.onAddTransition}
                  onRemoveTransition={this.props.onRemoveTransition}
                  onTransitionDirectionChange={
                    this.props.onTransitionDirectionChange
                  }
                  onTransitionStateChange={this.props.onTransitionStateChange}
                />
              );
            })}
          </tbody>
        </table>
        <button onClick={this.props.onExportStates}>Export States</button>
        <p>todo: Import states function + validation</p>
      </div>
    );
  }
}

export default StateTable;
