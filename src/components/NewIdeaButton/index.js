import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import './NewIdeaButton.css'

class NewIdeaButton extends Component {
  render() {
    return (
      <Button variant="fab" color="primary" aria-label="Add" className="idea-button" onClick={this.props.addIdea}>
        <AddIcon />
      </Button>
    )
  }
}

NewIdeaButton.propTypes = {
  addIdea: PropTypes.func.isRequired
}
export default NewIdeaButton;