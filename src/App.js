import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import './App.css';
const buttonStyle = {
  bottom: 20,
  right: 20,
  position: 'fixed'
};
const ideaStyle = {
  display: 'inline-block',
  margin: 10,
  height: 150,
  width: 150
};
class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Idea Board
            </Typography>
          </Toolbar>
        </AppBar>
        <Card style={ideaStyle}>
          <CardContent>
            <Typography color="textSecondary">
              Word of the Day
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <Card style={ideaStyle}>
          <CardContent>
            <Typography color="textSecondary">
              Word of the Day
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <Button variant="fab" color="primary" aria-label="Add" style={buttonStyle} onClick={()=>{console.log('clicked')}}>
          <AddIcon />
        </Button>
      </div>
    );
  }
}

export default App;
