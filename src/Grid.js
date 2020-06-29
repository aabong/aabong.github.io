import React from 'react';
import GridTable from './GridTable';
import GridOptions from './GridOptions';

class Grid extends React.Component {
  render() {
    return (
      <div className='Grid-Container'>
        <GridTable
          states={this.props.states}
          isRunning={this.props.isRunning}
          isFinished={this.props.isFinished}
          width={this.props.width}
          height={this.props.height}
          robotX={this.props.robotX}
          robotY={this.props.robotY}
          wallData={this.props.wallData}
          currentState={this.props.currentState}
          onMoveRobot={this.props.onMoveRobot}
          onChangeWalls={this.props.onChangeWalls}
        />
        <GridOptions
          isRunning={this.props.isRunning}
          isFinished={this.props.isFinished}
          steps={this.props.steps}
          mode={this.props.mode}
          wallSelection={this.props.wallSelection}
          onChangeMode={this.props.onChangeMode}
          onWallSelectionChanged={this.props.onWallSelectionChanged}
          onSkipToBeginningClicked={this.props.onSkipToBeginningClicked}
          onStepBackwardClicked={this.props.onStepBackwardClicked}
          onStepForwardClicked={this.props.onStepForwardClicked}
          onSkipToEndClicked={this.props.onSkipToEndClicked}
          onStopClicked={this.props.onStopClicked}
        />
        <p>
          Click on any cell in the grid to position the robot. You can build and
          remove walls by holding and dragging the cursor. You can pick which
          wall sides should be built or removed with the check boxes. The first
          state is automatically considered the start state. The robot can only
          take 10,000 steps.
        </p>
      </div>
    );
  }
}

export default Grid;
