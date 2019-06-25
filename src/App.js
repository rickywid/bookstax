import React from 'react';
import styled from 'styled-components';
import './App.css';

const Button = styled.button`
  border: 5px solid red;
`;

class App extends React.Component {
  componentDidMount() {
    // const url = 'https://bookstax-api.herokuapp.com/';
    const local = 'http://localhost:3001';

    fetch(local)
      .then(res => res.json())
      .then(json => console.log(JSON.stringify(json)));
  }

  render() {
    return (
      <div className="App">
        <Button>styled-component button</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    );
  }
}

export default App;
