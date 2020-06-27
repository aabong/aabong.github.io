import React from 'react';

class TransitionEntry extends React.Component {
  constructor(props) {
    super(props);
    this.onRemove = this.onRemove.bind(this);
  }

  onRemove(e) {
    this.props.onRemove({
      stateIndex: this.props.stateIndex,
      transitionIndex: this.props.transitionIndex,
    });
  }

  render() {
    return (
      <tr class='Transition-Row'>
        <img src={this.props.image} alt='' />
        <button className='Remove-Transition' onClick={this.onRemove}>
          x
        </button>
      </tr>
    );
  }
}

export default TransitionEntry;
