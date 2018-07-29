import React, { Component } from 'react';
import Header from './components/Header';
import Ideas from './components/Ideas';
import NewIdeaButton from './components/NewIdeaButton';
import './App.css';

const defaultCard = {
  date: (new Date()).toLocaleDateString("en-US"),
  title: 'Idea Title',
  bodyText: 'Enter text here',
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [{...defaultCard}]
    };
    this.updateTitle = this.updateTitle.bind(this);
    this.updateBodyText = this.updateBodyText.bind(this);
    this.addIdea = this.addIdea.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
  }

  updateTitle(title, id) {
    this.setState((prevState) => {
      prevState.cards[id].title = title;
      return prevState
    });
  }

  updateBodyText(bodyText, id) {
    this.setState((prevState) => {
      prevState.cards[id].bodyText = bodyText;
      return prevState
    });
  }

  addIdea() {
    this.setState((prevState) => {
      return prevState.cards.push({...defaultCard});
    });
  }

  deleteIdea(id) {
    this.setState((prevState) => {
      prevState.cards.splice(Number(id), 1);
      return prevState;
    });
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Ideas cards={this.state.cards} deleteIdea={this.deleteIdea} updateTitle={this.updateTitle} updateBodyText={this.updateBodyText}/>
        <NewIdeaButton addIdea={this.addIdea}/>
      </div>
    );
  }
}

export default App;
