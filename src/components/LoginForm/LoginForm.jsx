import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
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
        <h3>Login</h3>
        {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
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
      value={username}
      required
      onChange={(event) => setPassword(event.target.value)}
      InputLabelProps={{
        shrink: true,
      }}
      size="small"
      />
      <br />
      <br />
      <Button onClick={(event) => login(event)}>Login</Button>
        </form>
      </Card>
    </center>
  );
}

export default LoginForm;

/*

<form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div>
    </form>

*/