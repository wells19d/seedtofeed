import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <center>
      <Card className="formPanel">
        <form>
          <h2>Login</h2>
          {errors.loginMessage && (
            <h1 className="alert" role="alert">
              {errors.loginMessage}
            </h1>
          )}
          <br />
          <TextField
            variant="outlined"
            label="Email Address"
            type="text"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
          />
          <br />
          <br />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
          />
          <br />
          <br />
          <Button size="small" onClick={(event) => login(event)}>
            Login
          </Button>
        </form>
      </Card>
    </center>
  );
}

export default LoginForm;
