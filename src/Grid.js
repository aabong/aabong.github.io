import React from 'react';
import GridTable from './GridTable';
import GridOptions from './GridOptions';

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 25,
      height: 25,
      robotX: 0,
      robotY: 0,
      mode: 'move',
      wallSelection: 0,
    };
    let wallData = [];
    for (let i = 0; i < this.state.height; i++) {
      let row = [];
      for (let j = 0; j < this.state.width; j++) {
        row.push(0);
      }
      wallData.push(row);
    }
    this.state.wallData = wallData;
    this.onMoveRobot = this.onMoveRobot.bind(this);
    this.onChangeWalls = this.onChangeWalls.bind(this);
    this.onChangeMode = this.onChangeMode.bind(this);
    this.onWallSelectionChanged = this.onWallSelectionChanged.bind(this);
  }

  onMoveRobot(e) {
    if (this.state.mode === 'move') {
      let x = parseInt(e.target.getAttribute('x'));
      let y = parseInt(e.target.getAttribute('y'));
      if (x >= 0 && x < this.state.width && y >= 0 && y < this.state.height) {
        this.setState({
          robotX: x,
          robotY: y,
        });
      }
    } else {
      this.onChangeWalls(e);
    }
  }

  onChangeWalls(e) {
    if ((e.buttons & 1) === 0) {
      return;
    }
    let x = parseInt(e.target.getAttribute('x'));
    let y = parseInt(e.target.getAttribute('y'));
    let newData;
    if (x >= 0 && x < this.state.width && y >= 0 && y < this.state.height) {
      switch (this.state.mode) {
        case 'build':
          newData = this.modifyWallData(
            this.state.wallData,
            x,
            y,
            this.state.wallData[y][x] | this.state.wallSelection
          );
          if ((this.state.wallSelection & 1) > 0 && x > 0) {
            newData[y][x - 1] = newData[y][x - 1] | 4;
          }
          if ((this.state.wallSelection & 2) > 0 && y < this.state.height - 1) {
            newData[y + 1][x] = newData[y + 1][x] | 8;
          }
          if ((this.state.wallSelection & 4) > 0 && x < this.state.width - 1) {
            newData[y][x + 1] = newData[y][x + 1] | 1;
          }
          if ((this.state.wallSelection & 8) > 0 && y > 0) {
            newData[y - 1][x] = newData[y - 1][x] | 2;
          }

          this.setState({
            wallData: newData,
          });
          break;
        case 'remove':
          newData = this.modifyWallData(
            this.state.wallData,
            x,
            y,
            this.state.wallData[y][x] & (15 - this.state.wallSelection)
          );
          if ((this.state.wallSelection & 1) > 0 && x > 0) {
            newData[y][x - 1] = newData[y][x - 1] & 11;
          }
          if ((this.state.wallSelection & 2) > 0 && y < this.state.height - 1) {
            newData[y + 1][x] = newData[y + 1][x] & 7;
          }
          if ((this.state.wallSelection & 4) > 0 && x < this.state.width - 1) {
            newData[y][x + 1] = newData[y][x + 1] & 14;
          }
          if ((this.state.wallSelection & 8) > 0 && y > 0) {
            newData[y - 1][x] = newData[y - 1][x] & 13;
          }

          this.setState({
            wallData: newData,
          });
          break;
        default:
      }
    }
  }

  modifyWallData(data, x, y, value) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      let row = [];
      for (let j = 0; j < data[i].length; j++) {
        if (j === x && i === y) {
          row.push(value);
        } else {
          row.push(data[i][j]);
        }
      }
      newData.push(row);
    }

    return newData;
  }

  onChangeMode(e) {
    this.setState({
      mode: e.target.value,
    });
  }

  onWallSelectionChanged(e) {
    if (e.target.checked) {
      this.setState({
        wallSelection: this.state.wallSelection | e.target.value,
      });
    } else {
      this.setState({
        wallSelection: this.state.wallSelection & (15 - e.target.value),
      });
    }
  }

  render() {
    return (
      <div className='Grid-Container'>
        <GridTable
          width={this.state.width}
          height={this.state.height}
          robotX={this.state.robotX}
          robotY={this.state.robotY}
          wallData={this.state.wallData}
          onMoveRobot={this.onMoveRobot}
          onChangeWalls={this.onChangeWalls}
        />
        <GridOptions
          mode={this.state.mode}
          onChangeMode={this.onChangeMode}
          onWallSelectionChanged={this.onWallSelectionChanged}
        />
        <p>
          Click on any cell in the grid to position the robot. You can build and
          remove walls by holding and dragging the cursor. You can pick which
          wall sides should be built or removed with the check boxes. The robot
          can only take 10,000 steps.
        </p>
      </div>
    );
  }
}

export default Grid;
