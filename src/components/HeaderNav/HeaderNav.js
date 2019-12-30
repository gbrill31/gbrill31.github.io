import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button
} from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function HeaderNav() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Herolo Weather Task
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/"
          >
            Forecast
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/favorites"
          >
            Favorites
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderNav;