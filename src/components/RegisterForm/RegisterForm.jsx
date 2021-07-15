import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [farmer, setFarmer] = useState(false);
  const [buyer, setBuyer] = useState(false);

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      // payload: {
      //   username: username,
      //   password: password,
      // },
      payload: {
        username: username,
        password: password,
        farmer: farmer,
        buyer: buyer,
        first_name: firstName,
        last_name: lastName,
      },
    });
  }; // end registerUser

  return (
    <center>
      <Card className="formPanel">
        <form>
          <h2>Register User</h2>
          {errors.registrationMessage && (
            <h1 className="alert" role="alert">
              {errors.registrationMessage}
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
          <TextField
            variant="outlined"
            type="text"
            label="First Name"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
          />
          <br />
          <br />
          <TextField
            variant="outlined"
            type="text"
            label="Last Name"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
          />
          <h3>
            <center>
            <label>
              I'm a Farmer :
              <input
                type="radio"
                id="radio1"
                name="radio-btn"
                value={farmer}
                checked="checked"
                // defaultChecked={farmer}
                onChange={(event) => setFarmer(!farmer)}
              />
            </label>{`\u00A0\u00A0\u00A0\u00A0`}
            <label>
              I'm a Buyer :
              <input
                type="radio"
                id="radio2"
                name="radio-btn"
                value={buyer}
                // defaultChecked={buyer}
                onChange={(event) => setBuyer(!buyer)}
              />
            </label>
            </center>
          </h3>
          <Button size="small" onClick={(event) => registerUser(event)}>
            Register
          </Button>
        </form>
      </Card>
    </center>
  );
}

export default RegisterForm;
