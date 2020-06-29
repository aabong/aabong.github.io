import React from 'react';
import zero from './0.png';
import one from './1.png';
import two from './2.png';
import three from './3.png';
import four from './4.png';
import five from './5.png';
import six from './6.png';
import seven from './7.png';
import eight from './8.png';
import nine from './9.png';
import ten from './10.png';
import eleven from './11.png';
import twelve from './12.png';
import thirteen from './13.png';
import fourteen from './14.png';
import fifteen from './15.png';

class TransitionEntry extends React.Component {
  constructor(props) {
    super(props);
    this.onRemove = this.onRemove.bind(this);
    this.onDirectionChange = this.onDirectionChange.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
  }

  onRemove(e) {
    this.props.onRemove({
      stateIndex: parseInt(this.props.stateIndex),
      transitionIndex: parseInt(this.props.transitionIndex),
    });
  }

  onDirectionChange(e) {
    this.props.onTransitionDirectionChange({
      stateIndex: parseInt(this.props.stateIndex),
      transitionIndex: parseInt(this.props.transitionIndex),
      direction: e.target.value,
    });
  }

  onStateChange(e) {
    this.props.onTransitionStateChange({
      stateIndex: parseInt(this.props.stateIndex),
      transitionIndex: parseInt(this.props.transitionIndex),
      nextState: parseInt(e.target.value),
    });
  }

  render() {
    const imageMap = {
      0: zero,
      1: one,
      2: two,
      3: three,
      4: four,
      5: five,
      6: six,
      7: seven,
      8: eight,
      9: nine,
      10: ten,
      11: eleven,
      12: twelve,
      13: thirteen,
      14: fourteen,
      15: fifteen,
    };
    let directionOptions = [
      [0, 'Stay'],
      [1, 'Left'],
      [2, 'Down'],
      [4, 'Right'],
      [8, 'Up'],
    ];
    return (
      <tr class='Transition-Row'>
        <td>
          <img
            className='Transition-Image'
            src={imageMap[this.props.transitionIndex]}
            alt=''
          />
        </td>
        <td>
          <select
            className='Transition-Direction'
            name='direction'
            onChange={this.onDirectionChange}
          >
            {directionOptions.map((option) => {
              if ((this.props.transitionIndex & option[0]) === 0) {
                return (
                  <option
                    value={option[1]}
                    selected={this.props.direction === option[1]}
                  >
                    {option[1]}
                  </option>
                );
              } else {
                return null;
              }
            })}
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
              if (state.key === this.props.nextState) {
                return (
                  <option value={state.key} selected>
                    {state.name}
                  </option>
                );
              } else {
                return <option value={state.key}>{state.name}</option>;
              }
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
