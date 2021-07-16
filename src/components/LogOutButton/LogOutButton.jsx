import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import '../Nav/Nav.css';
import { useHistory } from "react-router-dom";

function LogOutButton(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className="navButtons"
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
