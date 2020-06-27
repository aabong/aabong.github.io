import React from 'react';

class TransitionEntry extends React.Component {
  constructor(props) {
    super(props);
    this.onRemove = this.onRemove.bind(this);
    this.onDirectionChange = this.onDirectionChange.bind(this);
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
            {[0, 2, 3, 4, 8, 9, 10, 12].includes(
              this.props.transitionIndex
            ) && <option value='left'>Left</option>}
            {[0, 1, 3, 4, 6, 7, 10, 13].includes(
              this.props.transitionIndex
            ) && <option value='down'>Down</option>}
            {[0, 1, 2, 4, 5, 7, 9, 14].includes(this.props.transitionIndex) && (
              <option value='right'>Right</option>
            )}
            {[0, 1, 2, 3, 5, 6, 8, 11].includes(this.props.transitionIndex) && (
              <option value='up'>Up</option>
            )}
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
