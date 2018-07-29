import React, { Component } from 'react';
import Header from './components/Header';
import Ideas from './components/Ideas';
import NewIdeaButton from './components/NewIdeaButton';
import Notification from './components/Notification';
import './App.css';
import { getIdeas, addIdeas, deleteIdeas, updateIdeaTitle, updateIdeaText } from './api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
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
    this.sortHandler = this.sortHandler.bind(this);
  }

  componentDidMount() {
    if(localStorage.getItem('cards')){
      this.setState({cards: JSON.parse(localStorage.getItem('cards'))});
    } else {
      getIdeas()
        .then(res => {
          this.setState({cards: res.data.ideas});
        })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.cards.length > 0) localStorage.setItem('cards', JSON.stringify(prevState.cards))
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
          const date = res.data.created_date;
          prevState.isFocus = true;
          prevState.focusId = id;
          prevState.notificationMessage = 'New idea added successfully';
          prevState.isNotificationOpen = true;
          return prevState.cards.push({
            title: 'Idea Title',
            bodyText: 'Enter text here',
            id,
            date
          });
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

  sortHandler(sortByString) {
    this.setState((prevState) => {
      let sortedCards = [...prevState.cards];
      sortedCards.sort((a, b)=> {
        if (sortByString === 'Title'){
          if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          return 0;
        }
        if (sortByString === 'Date'){
          if(a.date > b.date) return -1;
          if(a.date < b.date) return 1;
          return 0;
        }
        return a.date - b.date
      });
      prevState.cards = sortedCards;
      return prevState;
    })
  }

  render() {
    return (
      <div className="App">
        <Header sortHandler={this.sortHandler}/>
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
