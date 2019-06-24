import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';

const Button = styled.button`
  border: 5px solid red;
`;

class App extends React.Component {

  componentDidMount() {

    const url = 'https://bookstax-api.herokuapp.com/';
    const local = 'http://localhost:3001';

    fetch(local).then(res=>{
      return res.json();
    }).then(json=>{
      console.log(JSON.stringify(json));
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Button>Click</Button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
