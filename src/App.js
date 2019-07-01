import React from 'react';
// import styled from 'styled-components';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

class App extends React.Component {
  componentDidMount() {
    // fetch('http://localhost:3001').then(res => res.json()).then(json => console.log(json));
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <p>BookStax</p>
          {Routes}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
