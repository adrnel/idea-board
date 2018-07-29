import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import './Ideas.css'

class Ideas extends Component {
  renderCards(cards) {
    const cardsArray = [];
    for (let i = 0; i < cards.length; i++) {
      cardsArray.push(<Card className="ideas-card" key={i}>
        <div className="idea-date">
          {cards[i].date}
        </div>
        <Button
          value={i}
          variant="fab"
          color="secondary"
          aria-label="Add"
          className="idea-close-button"
          onClick={(e) => {this.props.deleteIdea(e.currentTarget.value)}}
        >
          <DeleteIcon />
        </Button>
        <input
          className={`idea-title ${i}`}
          placeholder={cards[i].title + i}
          onBlur={(e) => {this.props.updateTitle(e.currentTarget.value, e.currentTarget.className.split(' ')[1])}}
        />
        <textarea
          className={`idea-text-body ${i}`}
          placeholder={cards[i].bodyText}
          onBlur={(e) => {this.props.updateBodyText(e.currentTarget.value, e.currentTarget.className.split(' ')[1])}}/>
      </Card>);
    }
    return <div>{cardsArray}</div>;
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
      bodyText: PropTypes.string
    })
  ).isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBodyText: PropTypes.func.isRequired,
  deleteIdea: PropTypes.func.isRequired
};
export default Ideas;