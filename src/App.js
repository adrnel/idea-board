import React, { Component } from 'react';
import Header from './components/Header';
import Ideas from './components/Ideas';
import NewIdeaButton from './components/NewIdeaButton';
import Notification from './components/Notification';
import axios from 'axios';
import './App.css';
import { getIdeas, deleteIdeas } from './api';

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
      focusId: 0,
      notificationMessage: '',
      isNotificationOpen: false
    };
    this.updateTitle = this.updateTitle.bind(this);
    this.updateBodyText = this.updateBodyText.bind(this);
    this.addIdea = this.addIdea.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
  }

  componentDidMount() {
    // get request would actually look something like: axios.get(`https://ideaboard.com/idea/get`)
    getIdeas()
      .then(res => {
        this.setState({cards: res.data});
      })
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
    // post request would actually look something like: axios.post(`https://ideaboard.com/idea/delete/, { id }`)
    deleteIdeas()
      .then(res => {
        if(res.status === 202){
          this.setState((prevState) => {
            const index = prevState.cards.findIndex((element) =>  element.id === Number(id));
            prevState.cards.splice(index, 1);
            prevState.notificationMessage = 'Note deleted successfully';
            prevState.isNotificationOpen = true;
            return prevState;
          })
        } else {
          this.setState((prevState) => {
            prevState.notificationMessage = 'Error something has gone wrong';
            prevState.isNotificationOpen = true;
            return prevState;
          })
        }
      })
      .catch(() => {
        this.setState((prevState) => {
          prevState.notificationMessage = 'Error something has gone wrong';
          prevState.isNotificationOpen = true;
          return prevState;
        })
      })
  }

  closeNotification(title, id) {
    this.setState({ isNotificationOpen: false });
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
        <Notification
          message={this.state.notificationMessage}
          isOpen={this.state.isNotificationOpen}
          close={this.closeNotification}
        />
      </div>
    );
  }
}

export default App;
