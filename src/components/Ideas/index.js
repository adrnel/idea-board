import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import './Ideas.css'

class Ideas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      charlimit: 0
    }
  }

  renderCards(cards) {
    if (cards.length > 0) {
      const cardsArray = [];
      for (let i = 0; i < cards.length; i++) {
        cardsArray.push(<Card className="ideas-card" key={cards[i].id}>
          <div className="idea-date">
            {cards[i].date}
          </div>
          <Button
            value={cards[i].id}
            variant="fab"
            color="secondary"
            aria-label="Add"
            className="idea-close-button"
            onClick={(e) => {this.props.deleteIdea(e.currentTarget.value)}}
          >
            <DeleteIcon />
          </Button>
          <input
            className={`idea-title ${cards[i].id}`}
            defaultValue={cards[i].title}
            onBlur={(e) => {this.props.updateTitle(e.currentTarget.value, e.currentTarget.className.split(' ')[1])}}
            autoFocus={this.props.isFocus && this.props.focusId === cards[i].id}
          />
          <textarea
            className={`idea-text-body ${cards[i].id}`}
            maxLength="150"
            defaultValue={cards[i].bodyText}
            onBlur={(e) => {this.props.updateBodyText(e.currentTarget.value, e.currentTarget.className.split(' ')[1])}}
            onChange={(e) => {
              const charLength = e.currentTarget.value.length;
              this.setState((prevState) => {
              prevState.charlimit = charLength;
              return prevState
            })}}
          />
          <div className="char-limit">{150 - this.state.charlimit < 16 &&
          150 - this.state.charlimit > -1 ?
          150 - this.state.charlimit :
            ''}</div>
        </Card>);
      }
      return <div>{cardsArray}</div>;
    } else {
      return <div className="no-cards-text" >Your ideas board is empty. Click the plus to begin adding ideas</div>
    }
  }

  render() {
    return (
      this.renderCards(this.props.cards)
    )
  }
}

Ideas.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      title: PropTypes.string,
      bodyText: PropTypes.string,
      id: PropTypes.number,
    })
  ).isRequired,
  updateTitle: PropTypes.func.isRequired,
  isFocus: PropTypes.bool.isRequired,
  focusId: PropTypes.number.isRequired,
  updateBodyText: PropTypes.func.isRequired,
  deleteIdea: PropTypes.func.isRequired
};

export default Ideas;