import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home'
import ChatIcon from '@material-ui/icons/Chat';
import "./Navbar.css"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  
}));

export default function Navbar({landingpage , chatpage , signout}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          
          <HomeIcon onClick = {landingpage}/>
          <ChatIcon onClick = {chatpage}/>
          <ExitToAppIcon onClick = {signout}/>

         
         
     
        </Toolbar>
      </AppBar>
    </div>
  );
}
