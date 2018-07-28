import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import './Ideas.css'

class Ideas extends Component {
  render() {
    return (
      <div>
        <Card className="ideas-card">
          <div className="idea-date">
            Jan 1st
          </div>
          <Button variant="fab" color="secondary" aria-label="Add" className="idea-close-button" onClick={()=>{console.log('clicked')}}>
            <DeleteIcon />
          </Button>
          <div className="idea-title" contentEditable="true">
            React
          </div>
          <textarea className="idea-text-body" defaultValue="React" />
        </Card>

        <Card className="ideas-card">
          <div className="idea-date">
            Jan 1st
          </div>
          <Button variant="fab" color="secondary" aria-label="Add" className="idea-close-button" onClick={()=>{console.log('clicked')}}>
            <DeleteIcon />
          </Button>
          <div className="idea-title" contentEditable="true">
            React
          </div>
          <textarea className="idea-text-body" defaultValue="React" />
        </Card>

        <Card className="ideas-card">
          <div className="idea-date">
            Jan 1st
          </div>
          <Button variant="fab" color="secondary" aria-label="Add" className="idea-close-button" onClick={()=>{console.log('clicked')}}>
            <DeleteIcon />
          </Button>
          <div className="idea-title" contentEditable="true">
            React
          </div>
          <textarea className="idea-text-body" defaultValue="React" />
        </Card>
      </div>
    )
  }
}

export default Ideas;