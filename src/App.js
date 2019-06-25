import React from 'react';
// import styled from 'styled-components';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

class App extends React.Component {
  componentDidMount() {
    console.log('app mounted');
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
