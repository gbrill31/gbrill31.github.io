import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem,
  Switch
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloudIcon from '@material-ui/icons/Cloud';
import MenuIcon from '@material-ui/icons/Menu';

import './HeaderNav.scss';

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

const navButtons = [
  {
    id: 0,
    title: 'Forecast',
    to: '/',
    icon: () => <CloudIcon />
  },
  {
    id: 1,
    title: 'Favorites',
    to: '/favorites',
    icon: () => <FavoriteIcon />
  }
];

function HeaderNav({
  saveWeatherUnits, units
}) {
  const classes = useStyles();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const getOpositeUnits = () => {
    return units === 'C' ? 'F' : 'C';
  }


  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleOpenMenu}
          >
            <MenuIcon />
          </IconButton>
          {
            Boolean(anchorEl) ? (
              <Menu
                id="settings-menu"
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem>
                  Show Fahrenheit
                  <Switch
                    checked={units === 'F'}
                    onChange={() => {
                      saveWeatherUnits(getOpositeUnits());
                    }}
                    value="C"
                    inputProps={{ 'aria-label': 'toggle fahrenheit' }}
                  />
                </MenuItem>
              </Menu>
            ) : null
          }
          <Typography variant="h6" className={classes.title}>
            Weather App
          </Typography>
          {
            navButtons.map(btn => (
              <Button
                key={btn.id}
                color="inherit"
                component={Link}
                style={{
                  background: location.pathname === btn.to ? '#09608e' : '',
                  borderRadius: 0
                }}
                to={btn.to}
              >
                <span className="navBtnTitle">{btn.title}</span>
                <span className="navBtnIcon">{btn.icon()}</span>
              </Button>
            ))
          }
        </Toolbar>
      </AppBar>
    </div >
  );
};

export default HeaderNav;