import React, { Component } from 'react';
import Header from './components/Header';
import Ideas from './components/Ideas';
import NewIdeaButton from './components/NewIdeaButton';
import Notification from './components/Notification';
import axios from 'axios';
import './App.css';
import { getIdeas, addIdeas, deleteIdeas, updateIdeaTitle, updateIdeaText } from './api';

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
    // get request would actually look something like: axios.get(`https://ideaboard.com/ideas/`)
    getIdeas()
      .then(res => {
        this.setState({cards: res.data.ideas});
      })
  }

  updateTitle(title, id) {
    // post request would actually look something like: axios.post(`https://ideaboard.com/idea/delete/, { title, id }`)
    updateIdeaTitle(title, id)
      .then(res => {
        this.setState((prevState) => {
          const index = prevState.cards.findIndex((element) =>  element.id === Number(id));
          prevState.cards[index].title = res.data.title;
          prevState.isFocus = false;
          prevState.notificationMessage = 'Idea title updated successfully';
          prevState.isNotificationOpen = true;
          return prevState
        });
      })
      .catch(() => {
        this.setState((prevState) => {
          prevState.notificationMessage = 'Error something has gone wrong';
          prevState.isNotificationOpen = true;
          return prevState;
        })
      })
  }

  updateBodyText(bodyText, id) {
    // post request would actually look something like: axios.post(`https://ideaboard.com/idea/delete/, { bodyText, id }`)
    updateIdeaText(bodyText, id)
      .then(res => {
        this.setState((prevState) => {
          const index = prevState.cards.findIndex((element) =>  element.id === Number(id));
          prevState.cards[index].bodyText = res.data.body;
          prevState.isFocus = false;
          prevState.notificationMessage = 'Idea text updated successfully';
          prevState.isNotificationOpen = true;
          return prevState
        });
      })
      .catch(() => {
        this.setState((prevState) => {
          prevState.notificationMessage = 'Error something has gone wrong';
          prevState.isNotificationOpen = true;
          return prevState;
        })
      })
  }

  addIdea() {
    // get request would actually look something like: axios.get(`https://ideaboard.com/ideas/new`)
    addIdeas()
      .then(res => {
        this.setState((prevState) => {
          const id = res.data.id;
          const created_date = res.data.created_date;
          prevState.isFocus = true;
          prevState.focusId = id;
          prevState.notificationMessage = 'New idea added successfully';
          prevState.isNotificationOpen = true;
          return prevState.cards.push({...defaultCard, id, created_date});
        });
      })
      .catch(() => {
        this.setState((prevState) => {
          prevState.notificationMessage = 'Error something has gone wrong';
          prevState.isNotificationOpen = true;
          return prevState;
        })
      })
  }

  deleteIdea(id) {
    // post request would actually look something like: axios.post(`https://ideaboard.com/idea/delete/, { id }`)
    deleteIdeas(id)
      .then(res => {
        if(res.status === 202){
          this.setState((prevState) => {
            const responseId = res.data.id;
            const index = prevState.cards.findIndex((element) =>  element.id === Number(responseId));
            prevState.cards.splice(index, 1);
            prevState.notificationMessage = 'idea deleted successfully';
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
