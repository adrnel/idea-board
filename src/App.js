import React, { Component } from 'react';
import Header from './components/Header';
import Ideas from './components/Ideas';
import NewIdeaButton from './components/NewIdeaButton';
import './App.css';

const generateRandomNumber = () => Math.floor(Math.random() * Math.floor(10000000));

const defaultCard = {
  date: (new Date()).toLocaleDateString("en-US"),
  title: 'Idea Title',
  bodyText: 'Enter text here',
  id: generateRandomNumber(),
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [{...defaultCard}],
      isFocus: false,
      focusId: 0
    };
    this.updateTitle = this.updateTitle.bind(this);
    this.updateBodyText = this.updateBodyText.bind(this);
    this.addIdea = this.addIdea.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
  }

  updateTitle(title, id) {
    this.setState((prevState) => {
      const index = prevState.cards.findIndex((element) =>  element.id === Number(id));
      prevState.cards[index].title = title;
      prevState.isFocus = false;
      return prevState
    });
  }

  updateBodyText(bodyText, id) {
    this.setState((prevState) => {
      const index = prevState.cards.findIndex((element) =>  element.id === Number(id));
      prevState.cards[index].bodyText = bodyText;
      prevState.isFocus = false;
      return prevState
    });
  }

  addIdea() {
    this.setState((prevState) => {
      const id = generateRandomNumber();
      prevState.isFocus = true;
      prevState.focusId = id;
      return prevState.cards.push({...defaultCard, id});
    });
  }

  deleteIdea(id) {
    this.setState((prevState) => {
      const index = prevState.cards.findIndex((element) =>  element.id === Number(id));
      prevState.cards.splice(index, 1);
      return prevState;
    });
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Ideas
          cards={this.state.cards}
          isFocus={this.state.isFocus}
          focusId={this.state.focusId}
          deleteIdea={this.deleteIdea}
          updateTitle={this.updateTitle}
          updateBodyText={this.updateBodyText}
        />
        <NewIdeaButton addIdea={this.addIdea}/>
      </div>
    );
  }
}

export default App;
