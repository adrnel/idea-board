import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Sort from '@material-ui/icons/Sort';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (sortByString) => {
    this.setState({ anchorEl: null });
    this.props.sortHandler(sortByString)
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={this.handleClick}>
            <Sort />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={() => this.handleClose('Title')}>Sort title alphabetically</MenuItem>
            <MenuItem onClick={() => this.handleClose('Date')}>Sort by most recent</MenuItem>
          </Menu>
          <Typography variant="title" color="inherit">
            Idea Board
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

Header.propTypes = {
  sortHandler: PropTypes.func.isRequired
};

export default Header;