import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Email Address:
          <input
            type="text"
            name="username"
            value={username}
            required
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
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>



      <div>
        <label htmlFor="username">
            First Name:
                <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    required
                    onChange={(event) => setFirstName(event.target.value)}
                />
        </label>
    </div>
    <div>
        <label htmlFor="username">
            Last Name:
                <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    required
                    onChange={(event) => setLastName(event.target.value)}
                />
        </label>
    </div>
    <div>
        <label>
            Are you a farmer?
            <input
              type="checkbox"
              defaultChecked={farmer}
              onChange={(event) => setFarmer(!farmer)}
            />
        </label>
        <label>
            Are you a buyer?
            <input
              type="checkbox"
              defaultChecked={buyer}
              onChange={(event) => setBuyer(!buyer)}
            />
        </label>
    </div>




      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
