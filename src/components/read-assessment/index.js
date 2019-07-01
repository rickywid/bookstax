import React from 'react';
// import styled from 'styled-components';

class ReadAssessment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showStartPage: true,
      startTime: false,
      showResults: false,
    };
  }

  componentDidMount() {
    console.log('read assessment mounted');
  }

  onHandleStart() {
    this.setState((prevState) => {
      const state = prevState;
      state.showStartPage = !prevState.showStartPage;
      state.startTime = true;

      return state;
    });
  }

  onHandleStop() {
    this.setState((prevState) => {
      const state = prevState;
      state.startTime = false;
      state.showResults = true;

      return state;
    });
  }

  render() {
    const { showStartPage, showResults } = this.state;

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

        { showResults ? <div>WPM: 250</div> : <div /> }
      </div>
    );
  }
}

export default ReadAssessment;
