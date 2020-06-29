import React from 'react';
import one from './1.png';
import two from './2.png';
import four from './4.png';
import eight from './8.png';

class GridOptions extends React.Component {
  render() {
    return (
      <div>
        <div>
          <input
            type='radio'
            id='move'
            name='mode'
            value='move'
            checked={this.props.mode === 'move'}
            onChange={this.props.onChangeMode}
          />
          <label for='move'>Move Robot</label>
          <input
            type='radio'
            id='build'
            name='mode'
            value='build'
            checked={this.props.mode === 'build'}
            onChange={this.props.onChangeMode}
          />
          <label for='build'>Build Walls</label>
          <input
            type='radio'
            id='remove'
            name='mode'
            value='remove'
            checked={this.props.mode === 'remove'}
            onChange={this.props.onChangeMode}
          />
          <label for='remove'>Remove Walls</label>
        </div>
        <div>
          <input
            type='checkbox'
            id='left'
            value='1'
            onChange={this.props.onWallSelectionChanged}
          />
          <label for='left'>
            <img src={one} alt='' />
          </label>
          <input
            type='checkbox'
            id='bottom'
            value='2'
            onChange={this.props.onWallSelectionChanged}
          />
          <label for='bottom'>
            <img src={two} alt='' />
          </label>
          <input
            type='checkbox'
            id='right'
            value='4'
            onChange={this.props.onWallSelectionChanged}
          />
          <label for='right'>
            <img src={four} alt='' />
          </label>
          <input
            type='checkbox'
            id='top'
            value='8'
            onChange={this.props.onWallSelectionChanged}
          />
          <label for='top'>
            <img src={eight} alt='' />
          </label>
        </div>
        <div>
          <button>&lt;</button>
          <button>Play</button>
          <button>&gt;</button>
        </div>
      </div>
    );
  }
}

export default GridOptions;
