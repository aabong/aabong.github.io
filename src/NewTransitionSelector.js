import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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

class NewTransitionSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (index) => () => {
    this.setState({ anchorEl: null });
    if (index) {
      this.props.onAddTransition({
        stateIndex: parseInt(this.props.stateIndex),
        key: parseInt(index),
        direction: 'stay',
      });
    }
  };

  render() {
    return (
      <div>
        <Button
          style={{
            display: this.props.transitions.size < 16 ? 'block' : 'none',
          }}
          onClick={this.handleClick}
          disabled={this.props.isRunning}
        >
          Add transition
        </Button>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose(null)}
        >
          {[
            [0, zero],
            [1, one],
            [2, two],
            [3, three],
            [4, four],
            [5, five],
            [6, six],
            [7, seven],
            [8, eight],
            [9, nine],
            [10, ten],
            [11, eleven],
            [12, twelve],
            [13, thirteen],
            [14, fourteen],
            [15, fifteen],
          ].map((index) => {
            let keys = Array.from(this.props.transitions.keys());
            if (!keys.includes(index[0])) {
              return (
                <MenuItem key={index} onClick={this.handleClose(index[0])}>
                  <img src={index[1]} alt='' />
                </MenuItem>
              );
            } else {
              return null;
            }
          })}
        </Menu>
      </div>
    );
  }
}

export default NewTransitionSelector;
