import React, { Component } from 'react';
import Header from './components/Header';
import Ideas from './components/Ideas';
import NewIdeaButton from './components/NewIdeaButton';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Ideas/>
        <NewIdeaButton/>
      </div>
    );
  }
}

export default App;
