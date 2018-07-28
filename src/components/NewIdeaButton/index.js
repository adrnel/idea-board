import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import './NewIdeaButton.css'

class NewIdeaButton extends Component {
  render() {
    return (
      <Button variant="fab" color="primary" aria-label="Add" className="idea-button" onClick={()=>{console.log('clicked')}}>
        <AddIcon />
      </Button>
    )
  }
}

export default NewIdeaButton;