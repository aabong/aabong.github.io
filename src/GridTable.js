import React from 'react';

class GridTable extends React.Component {
  render() {
    let rows = Array(this.props.height)
      .fill()
      .map((x, i) => i);
    let columns = Array(this.props.width)
      .fill()
      .map((y, j) => j);
    return (
      <table className='Grid'>
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
                onMouseDown={this.props.onMoveRobot}
                onMouseOver={this.props.onChangeWalls}
                onDragOver={this.props.onChangeWalls}
              ></td>
            ))}
          </tr>
        ))}
      </table>
    );
  }
}

export default GridTable;
