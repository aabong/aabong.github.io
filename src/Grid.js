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
    };
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
                  {...(i === 0 ? { top: '' } : {})}
                  {...(i === this.state.height - 1 ? { bottom: '' } : {})}
                  {...(j === 0 ? { left: '' } : {})}
                  {...(j === this.state.width - 1 ? { right: '' } : {})}
                ></td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default Grid;
