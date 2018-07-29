import React, { Component } from 'react';
import Header from './components/Header';
import Ideas from './components/Ideas';
import NewIdeaButton from './components/NewIdeaButton';
import './App.css';

const defaultCard = {
  date: (new Date()).toLocaleDateString("en-US"),
  title: 'Idea Title',
  bodyText: '',
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [defaultCard]
    };
    this.addIdea = this.addIdea.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
  }

  addIdea() {
    this.setState((prevState) => {
      return prevState.cards.push(defaultCard);
    });
  }

  deleteIdea(id) {
    console.log('id: ', id)
    this.setState((prevState) => {
      return prevState.cards.splice(id, 1);
    });
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Ideas cards={this.state.cards} deleteIdea={this.deleteIdea}/>
        <NewIdeaButton addIdea={this.addIdea}/>
      </div>
    );
  }
}

export default App;
