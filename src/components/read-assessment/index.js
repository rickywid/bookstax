import React from 'react';
import Timer from '../../helpers/timer';
// import styled from 'styled-components';

class ReadAssessment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showStartPage: true,
      startTime: false,
      showResults: false,
      wpm: 0,
    };

    this.timer = new Timer();
  }

  componentDidMount() {
    console.log('read assessment mounted');
  }

  onHandleStart() {
    this.setState((prevState) => {
      const state = prevState;
      state.showStartPage = !prevState.showStartPage;
      state.startTime = true;
      this.timer.start();

      return state;
    });
  }

  onHandleStop() {
    this.setState((prevState) => {
      const state = prevState;
      state.startTime = false;
      state.showResults = true;
      const seconds = this.timer.stop();

      state.wpm = this.calculateWpm(seconds);
      return state;
    });
  }

  calculateWpm(seconds) {
    // wordCount = 944
    // seconds is 273
    // WordsPerSecond = wordCount / seconds = 3.64
    // WPM = 3.64 * 60 = 218.46

    this.setState((prevState) => {
      const state = prevState;
      state.wpm = (400 / seconds) * 60;
      return state;
    });
  }

  render() {
    const { showStartPage, showResults, wpm } = this.state;

    if (showStartPage) {
      return (
        <div>
          instructions
          <button onClick={this.onHandleStart.bind(this)} type="button">Start</button>
        </div>
      );
    }

    return (
      <div className="read-assessment">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque, provident est earum illum odio voluptatibus nobis quibusdam assumenda ipsa vel iure explicabo temporibus consequuntur delectus molestias labore quis, impedit.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque, provident est earum illum odio voluptatibus nobis quibusdam assumenda ipsa vel iure explicabo temporibus consequuntur delectus molestias labore quis, impedit.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque, provident est earum illum odio voluptatibus nobis quibusdam assumenda ipsa vel iure explicabo temporibus consequuntur delectus molestias labore quis, impedit.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque, provident est earum illum odio voluptatibus nobis quibusdam assumenda ipsa vel iure explicabo temporibus consequuntur delectus molestias labore quis, impedit.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque, provident est earum illum odio voluptatibus nobis quibusdam assumenda ipsa vel iure explicabo temporibus consequuntur delectus molestias labore quis, impedit.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque, provident est earum illum odio voluptatibus nobis quibusdam assumenda ipsa vel iure explicabo temporibus consequuntur delectus molestias labore quis, impedit.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque, provident est earum illum odio voluptatibus nobis quibusdam assumenda ipsa vel iure explicabo temporibus consequuntur delectus molestias labore quis, impedit.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque, provident est earum illum odio voluptatibus nobis quibusdam assumenda ipsa vel iure explicabo temporibus consequuntur delectus molestias labore quis, impedit.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque, provident est earum illum odio voluptatibus nobis quibusdam assumenda ipsa vel iure explicabo temporibus consequuntur delectus molestias labore quis, impedit.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque, provident est earum illum odio voluptatibus nobis quibusdam assumenda ipsa vel iure explicabo temporibus consequuntur delectus molestias labore quis, impedit.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque, provident est earum illum odio voluptatibus nobis quibusdam assumenda ipsa vel iure explicabo temporibus consequuntur delectus molestias labore quis, impedit.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque, provident est earum illum odio voluptatibus nobis quibusdam assumenda ipsa vel iure explicabo temporibus consequuntur delectus molestias labore quis, impedit.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque, provident est earum illum odio voluptatibus nobis quibusdam assumenda ipsa vel iure explicabo temporibus consequuntur delectus molestias labore quis, impedit.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque, provident est earum illum odio voluptatibus nobis quibusdam assumenda ipsa vel iure explicabo temporibus consequuntur delectus molestias labore quis, impedit.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque, provident est earum illum odio voluptatibus nobis quibusdam assumenda ipsa vel iure explicabo temporibus consequuntur delectus molestias labore quis, impedit.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque, provident est earum illum odio voluptatibus nobis quibusdam assumenda ipsa vel iure explicabo temporibus consequuntur delectus molestias labore quis, impedit.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque, provident est earum illum odio voluptatibus nobis quibusdam assumenda ipsa vel iure explicabo temporibus consequuntur delectus molestias labore quis, impedit.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque, provident est earum illum odio voluptatibus nobis quibusdam assumenda ipsa vel iure explicabo temporibus consequuntur delectus molestias labore quis, impedit.
        </p>
        <button onClick={this.onHandleStop.bind(this)} type="button">Stop</button>

        { showResults
          ? (
            <div>
              WPM:
              { wpm }
            </div>
          )
          : <div />
        }
      </div>
    );
  }
}

export default ReadAssessment;
