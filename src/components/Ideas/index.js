import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import './Ideas.css'

const ideaStyle = {
  display: 'inline-block',
  margin: 10,
  height: 150,
  width: 150
};

class Ideas extends Component {
  render() {
    return (
      <div>
        <Card className="ideas-card">
          <CardContent>
            <Typography color="textSecondary">
              Word of the Day
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <Card className="ideas-card">
          <CardContent>
            <Typography color="textSecondary">
              Word of the Day
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default Ideas;