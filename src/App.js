import React from 'react';
import StateTable from './StateTable';
import Grid from './Grid';
import defaultStates from './DefaultStates.json';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      states: this.convertJSONToMap(defaultStates),
      gridWidth: 25,
      gridHeight: 25,
      robotX: 0,
      robotY: 0,
      gridAlterationMode: 'move',
      wallSelection: 0,
      steps: [],
      isRunning: false,
      isFinished: false,
      currentState: -1,
    };

    let wallData = [];
    for (let i = 0; i < this.state.gridHeight; i++) {
      let row = [];
      for (let j = 0; j < this.state.gridWidth; j++) {
        row.push(0);
      }
      wallData.push(row);
    }
    this.state.wallData = wallData;

    this.onExportStates = this.onExportStates.bind(this);
    this.onMoveRobot = this.onMoveRobot.bind(this);
    this.onChangeWalls = this.onChangeWalls.bind(this);
    this.onChangeMode = this.onChangeMode.bind(this);
    this.onWallSelectionChanged = this.onWallSelectionChanged.bind(this);
    this.onAddState = this.onAddState.bind(this);
    this.onRemoveState = this.onRemoveState.bind(this);
    this.onSkipToEndClicked = this.onSkipToEndClicked.bind(this);
  }

  convertJSONToMap(json) {
    let map = new Map(json);
    for (let entry of map.entries()) {
      entry[1].key = entry[0];
      entry[1].transitions = new Map(entry[1].transitions);
      for (let transitionEntry of entry[1].transitions) {
        transitionEntry[1].state = entry[0];
        transitionEntry[1].key = transitionEntry[0];
      }
    }

    return map;
  }

  // State change functions
  onAddState() {
    if (this.state.isRunning) {
      return;
    }

    let keys = Array.from(this.state.states.keys());
    let index = this.state.states.size === 0 ? 0 : keys[keys.length - 1] + 1;
    this.setState({
      states: this.state.states.set(index, {
        key: index,
        name: 'New State',
        isAccept: false,
        transitions: new Map(),
      }),
    });
  }

  onRemoveState = (index) => () => {
    if (this.state.isRunning) {
      return;
    }

    this.state.states.forEach((state, stateKey, map) => {
      if (stateKey !== index) {
        state.transitions.forEach((transition, transitionKey, map) => {
          if (transition.nextState === index) {
            transition.nextState = stateKey;
          }
        });
      }
    });
    this.state.states.delete(index);
    this.setState(this.state);
  };

  onStateNameChange = (index) => (e) => {
    if (this.state.isRunning) {
      e.target.value = this.state.states.get(index).name;
      return;
    }

    this.state.states.get(index).name = e.target.value;
    this.setState(this.state);
  };

  onAcceptChange = (index) => (e) => {
    if (this.state.isRunning) {
      return;
    }

    this.state.states.get(index).isAccept = e.target.checked;
    this.setState(this.state);
  };

  onAddTransition = (data) => {
    if (this.state.isRunning) {
      return;
    }

    this.state.states.get(data.stateIndex).transitions.set(data.key, {
      state: parseInt(data.stateIndex),
      key: parseInt(data.key),
      direction: data.direction,
      nextState: parseInt(data.stateIndex),
    });
    this.setState(this.state);
  };

  onRemoveTransition = (data) => {
    if (this.state.isRunning) {
      return;
    }

    this.state.states
      .get(data.stateIndex)
      .transitions.delete(data.transitionIndex);
    this.setState(this.state);
  };

  onTransitionDirectionChange = (data) => {
    if (this.state.isRunning) {
      return;
    }

    this.state.states
      .get(data.stateIndex)
      .transitions.get(data.transitionIndex).direction = data.direction;
    this.setState(this.state);
  };

  onTransitionStateChange = (data) => {
    if (this.state.isRunning) {
      return;
    }

    this.state.states
      .get(data.stateIndex)
      .transitions.get(data.transitionIndex).nextState = data.nextState;
    this.setState(this.state);
  };

  onExportStates = (e) => {
    const jsonMap = new Map();
    for (let state of this.state.states) {
      const transitions = [];
      for (let transition of state[1].transitions) {
        const transitionCopy = JSON.parse(JSON.stringify(transition[1]));
        delete transitionCopy.key;
        delete transitionCopy.state;
        transitions.push([transition[0], transitionCopy]);
      }
      const stateCopy = JSON.parse(JSON.stringify(state[1]));
      delete stateCopy.key;
      stateCopy.transitions = transitions;
      jsonMap.set(state[0], stateCopy);
    }
    const statesJSON = JSON.stringify([...jsonMap], null, 2);
    const file = new Blob([statesJSON], { type: 'text/plain' });
    const element = document.createElement('a');
    element.href = URL.createObjectURL(file);
    element.download = 'states.robot';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Grid change functions
  onMoveRobot(e) {
    if (this.state.isRunning) {
      return;
    }

    if (this.state.gridAlterationMode === 'move') {
      let x = parseInt(e.target.getAttribute('x'));
      let y = parseInt(e.target.getAttribute('y'));
      if (
        x >= 0 &&
        x < this.state.gridWidth &&
        y >= 0 &&
        y < this.state.gridHeight
      ) {
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
    if ((e.buttons & 1) === 0 || this.state.isRunning) {
      return;
    }
    let x = parseInt(e.target.getAttribute('x'));
    let y = parseInt(e.target.getAttribute('y'));
    let newData;
    if (
      x >= 0 &&
      x < this.state.gridWidth &&
      y >= 0 &&
      y < this.state.gridHeight
    ) {
      switch (this.state.gridAlterationMode) {
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
          if (
            (this.state.wallSelection & 2) > 0 &&
            y < this.state.gridHeight - 1
          ) {
            newData[y + 1][x] = newData[y + 1][x] | 8;
          }
          if (
            (this.state.wallSelection & 4) > 0 &&
            x < this.state.gridHidth - 1
          ) {
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
          if (
            (this.state.wallSelection & 2) > 0 &&
            y < this.state.gridHeight - 1
          ) {
            newData[y + 1][x] = newData[y + 1][x] & 7;
          }
          if (
            (this.state.wallSelection & 4) > 0 &&
            x < this.state.gridWidth - 1
          ) {
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
    if (this.state.isRunning) {
      return;
    }

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
    if (this.state.isRunning) {
      return;
    }

    this.setState({
      gridAlterationMode: e.target.value,
    });
  }

  onWallSelectionChanged(e) {
    if (this.state.isRunning) {
      return;
    }

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

  // Simulation functions
  stepBackward() {
    if (this.state.steps.length === 0) {
      return;
    }

    this.state.steps.pop();
  }

  stepForward() {
    let x =
      this.state.steps.length === 0
        ? this.state.robotX
        : this.state.steps[this.state.steps.length - 1].x;
    let y =
      this.state.steps.length === 0
        ? this.state.robotY
        : this.state.steps[this.state.steps.length - 1].y;
    let wallData = this.state.wallData[y][x];
    if (x === 0) {
      wallData = wallData | 1;
    } else if (x === this.state.gridWidth - 1) {
      wallData = wallData | 4;
    }

    if (y === 0) {
      wallData = wallData | 8;
    } else if (y === this.state.gridHeight - 1) {
      wallData = wallData | 2;
    }

    if (this.state.steps.length === 0) {
      this.state.steps.push({
        x: x,
        y: y,
        state: this.state.states.size === 0 ? -1 : 0,
      });
    } else {
      const currentState = this.state.steps[this.state.steps.length - 1].state;
      const transition =
        this.state.states.size === 0
          ? null
          : this.state.states.get(currentState).transitions.get(wallData);
      if (transition) {
        switch (transition.direction) {
          case 'Left':
            x -= 1;
            break;
          case 'Down':
            y += 1;
            break;
          case 'Right':
            x += 1;
            break;
          case 'Up':
            y -= 1;
            break;
          default:
        }
        this.state.steps.push({
          x: x,
          y: y,
          state: transition.nextState,
        });
      } else {
        this.state.steps.push({
          x: x,
          y: y,
          state: -1,
        });
      }
    }
  }

  onStepClicked = (isForward) => () => {
    if (isForward) {
      this.stepForward();
    } else {
      this.stepBackward();
    }

    if (this.state.steps.length === 0) {
      this.setState({
        isFinished: false,
        currentState: -1,
      });
    } else {
      this.update();
    }
  };

  onSkipToEndClicked() {
    const steps = this.state.steps;
    while (
      steps.length < 10000 &&
      (steps.length === 0 || steps[steps.length - 1].state !== -1)
    ) {
      this.stepForward();
    }
    this.update();
  }

  update() {
    const newStep = this.state.steps[this.state.steps.length - 1];
    let currentState = newStep.state;
    if (this.state.steps.length > 1 && currentState === -1) {
      currentState = this.state.steps[this.state.steps.length - 2].state;
    }
    const isFinished =
      this.state.steps.length === 10000 || newStep.state === -1;
    this.setState({
      robotX: newStep.x,
      robotY: newStep.y,
      isRunning: true,
      isFinished: isFinished,
      currentState: currentState,
    });
  }

  onReset = (isSkipToBeginning) => () => {
    this.setState({
      robotX:
        this.state.steps.length > 0 ? this.state.steps[0].x : this.state.robotX,
      robotY:
        this.state.steps.length > 0 ? this.state.steps[0].y : this.state.robotY,
      steps: [],
      isRunning: isSkipToBeginning,
      isFinished: false,
      currentState: -1,
    });
  };

  render() {
    return (
      <div className='App'>
        <StateTable
          states={this.state.states}
          isRunning={this.state.isRunning}
          currentState={this.state.currentState}
          onAddState={this.onAddState}
          onRemoveState={this.onRemoveState}
          onStateNameChange={this.onStateNameChange}
          onAcceptChange={this.onAcceptChange}
          onAddTransition={this.onAddTransition}
          onRemoveTransition={this.onRemoveTransition}
          onTransitionDirectionChange={this.onTransitionDirectionChange}
          onTransitionStateChange={this.onTransitionStateChange}
          onExportStates={this.onExportStates}
        />
        <Grid
          states={this.state.states}
          width={this.state.gridWidth}
          height={this.state.gridHeight}
          wallData={this.state.wallData}
          robotX={this.state.robotX}
          robotY={this.state.robotY}
          mode={this.state.gridAlterationMode}
          wallSelection={this.state.wallSelection}
          isRunning={this.state.isRunning}
          isFinished={this.state.isFinished}
          steps={this.state.steps}
          currentState={this.state.currentState}
          onMoveRobot={this.onMoveRobot}
          onChangeWalls={this.onChangeWalls}
          onChangeMode={this.onChangeMode}
          onWallSelectionChanged={this.onWallSelectionChanged}
          onSkipToBeginningClicked={this.onReset(true)}
          onStepBackwardClicked={this.onStepClicked(false)}
          onStepForwardClicked={this.onStepClicked(true)}
          onSkipToEndClicked={this.onSkipToEndClicked}
          onStopClicked={this.onReset(false)}
        />
      </div>
    );
  }
}

export default App;
