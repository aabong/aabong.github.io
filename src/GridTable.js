import React from 'react';

class GridTable extends React.Component {
  render() {
    console.log(this.props.states);
    console.log(this.props.currentState);
    const accepted =
      this.props.currentState >= 0 &&
      this.props.states.get(this.props.currentState).isAccept;

    let rows = Array(this.props.height)
      .fill()
      .map((x, i) => i);
    let columns = Array(this.props.width)
      .fill()
      .map((y, j) => j);
    return (
      <table
        className={
          'Grid' +
          (this.props.isFinished ? (accepted ? ' Accept' : ' Reject') : '')
        }
      >
        {rows.map((i) => (
          <tr key={i}>
            {columns.map((j) => (
              <td
                key={j}
                x={j}
                y={i}
                {...(i === this.props.robotY && j === this.props.robotX
                  ? { robot: '' }
                  : {})}
                {...(i === 0 || (this.props.wallData[i][j] & 8) > 0
                  ? { top: '' }
                  : {})}
                {...(i === this.props.height - 1 ||
                (this.props.wallData[i][j] & 2) > 0
                  ? { bottom: '' }
                  : {})}
                {...(j === 0 || (this.props.wallData[i][j] & 1) > 0
                  ? { left: '' }
                  : {})}
                {...(j === this.props.width - 1 ||
                (this.props.wallData[i][j] & 4) > 0
                  ? { right: '' }
                  : {})}
                {...(this.props.isRunning
                  ? {}
                  : { onMouseDown: this.props.onMoveRobot })}
                {...(this.props.isRunning
                  ? {}
                  : { onMouseOver: this.props.onChangeWalls })}
                {...(this.props.isRunning
                  ? {}
                  : { onDragOver: this.props.onChangeWalls })}
              ></td>
            ))}
          </tr>
        ))}
      </table>
    );
  }
}

export default GridTable;
