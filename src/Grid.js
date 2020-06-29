import React from 'react';
import one from './1.png';
import two from './2.png';
import four from './4.png';
import eight from './8.png';

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
    let rows = Array(this.state.height)
      .fill()
      .map((x, i) => i);
    let columns = Array(this.state.width)
      .fill()
      .map((y, j) => j);
    return (
      <div className='Grid-Container'>
        <table className='Grid'>
          {rows.map((i) => (
            <tr key={i}>
              {columns.map((j) => (
                <td
                  key={j}
                  x={j}
                  y={i}
                  {...(i === this.state.robotY && j === this.state.robotX
                    ? { robot: '' }
                    : {})}
                  {...(i === 0 || (this.state.wallData[i][j] & 8) > 0
                    ? { top: '' }
                    : {})}
                  {...(i === this.state.height - 1 ||
                  (this.state.wallData[i][j] & 2) > 0
                    ? { bottom: '' }
                    : {})}
                  {...(j === 0 || (this.state.wallData[i][j] & 1) > 0
                    ? { left: '' }
                    : {})}
                  {...(j === this.state.width - 1 ||
                  (this.state.wallData[i][j] & 4) > 0
                    ? { right: '' }
                    : {})}
                  onMouseDown={this.onMoveRobot}
                  onMouseOver={this.onChangeWalls}
                  onDragOver={this.onChangeWalls}
                ></td>
              ))}
            </tr>
          ))}
        </table>
        <div>
          <input
            type='radio'
            id='move'
            name='mode'
            value='move'
            checked={this.state.mode === 'move'}
            onChange={this.onChangeMode}
          />
          <label for='move'>Move Robot</label>
          <input
            type='radio'
            id='build'
            name='mode'
            value='build'
            checked={this.state.mode === 'build'}
            onChange={this.onChangeMode}
          />
          <label for='build'>Build Walls</label>
          <input
            type='radio'
            id='remove'
            name='mode'
            value='remove'
            checked={this.state.mode === 'remove'}
            onChange={this.onChangeMode}
          />
          <label for='remove'>Remove Walls</label>
        </div>
        <div>
          <input
            type='checkbox'
            id='left'
            value='1'
            onChange={this.onWallSelectionChanged}
          />
          <label for='left'>
            <img src={one} alt='' />
          </label>
          <input
            type='checkbox'
            id='bottom'
            value='2'
            onChange={this.onWallSelectionChanged}
          />
          <label for='bottom'>
            <img src={two} alt='' />
          </label>
          <input
            type='checkbox'
            id='right'
            value='4'
            onChange={this.onWallSelectionChanged}
          />
          <label for='right'>
            <img src={four} alt='' />
          </label>
          <input
            type='checkbox'
            id='top'
            value='8'
            onChange={this.onWallSelectionChanged}
          />
          <label for='top'>
            <img src={eight} alt='' />
          </label>
        </div>
      </div>
    );
  }
}

export default Grid;
