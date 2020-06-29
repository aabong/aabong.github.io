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
            disabled={this.props.isRunning}
          />
          <label for='move'>Move Robot</label>
          <input
            type='radio'
            id='build'
            name='mode'
            value='build'
            checked={this.props.mode === 'build'}
            onChange={this.props.onChangeMode}
            disabled={this.props.isRunning}
          />
          <label for='build'>Build Walls</label>
          <input
            type='radio'
            id='remove'
            name='mode'
            value='remove'
            checked={this.props.mode === 'remove'}
            onChange={this.props.onChangeMode}
            disabled={this.props.isRunning}
          />
          <label for='remove'>Remove Walls</label>
        </div>
        <div>
          <input
            type='checkbox'
            id='left'
            value='1'
            checked={(this.props.wallSelection & 1) > 0}
            onChange={this.props.onWallSelectionChanged}
            disabled={this.props.isRunning}
          />
          <label for='left'>
            <img src={one} alt='' />
          </label>
          <input
            type='checkbox'
            id='bottom'
            value='2'
            checked={(this.props.wallSelection & 2) > 0}
            onChange={this.props.onWallSelectionChanged}
            disabled={this.props.isRunning}
          />
          <label for='bottom'>
            <img src={two} alt='' />
          </label>
          <input
            type='checkbox'
            id='right'
            value='4'
            checked={(this.props.wallSelection & 4) > 0}
            onChange={this.props.onWallSelectionChanged}
            disabled={this.props.isRunning}
          />
          <label for='right'>
            <img src={four} alt='' />
          </label>
          <input
            type='checkbox'
            id='top'
            value='8'
            checked={(this.props.wallSelection & 8) > 0}
            onChange={this.props.onWallSelectionChanged}
            disabled={this.props.isRunning}
          />
          <label for='top'>
            <img src={eight} alt='' />
          </label>
        </div>
        <div>
          <button
            onClick={this.props.onSkipToBeginningClicked}
            disabled={this.props.steps.length === 0}
          >
            &lt;&lt;
          </button>
          <button
            onClick={this.props.onStepBackwardClicked}
            disabled={this.props.steps.length === 0}
          >
            &lt;
          </button>
          <button onClick={this.props.onPlayClicked}>
            {this.props.timer
              ? this.props.isPaused
                ? 'Resume'
                : 'Pause'
              : 'Play'}
          </button>
          <button
            onClick={this.props.onStepForwardClicked}
            disabled={this.props.isFinished}
          >
            &gt;
          </button>
          <button
            onClick={this.props.onSkipToEndClicked}
            disabled={this.props.isFinished}
          >
            &gt;&gt;
          </button>
          {this.props.isRunning && (
            <button className='Stop' onClick={this.props.onStopClicked}>
              Stop
            </button>
          )}
          {this.props.isRunning && <p>Step: {this.props.steps.length}</p>}
        </div>
      </div>
    );
  }
}

export default GridOptions;
