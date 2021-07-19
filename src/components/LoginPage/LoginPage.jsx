import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';

const submitButton = {
  border: 'solid black 0px',
  background: '#fdb41b',
  padding: '3px 10px',
  boxShadow: '3px 3px 4px 0px grey',
};

const standardButtons = {
  border: 'solid black 0px',
  boxShadow: '2px 2px 3px 0px grey',
  minWidth: '1px',
};

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center>
        <Button
        className='submit-buttons'
          size="small"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register New User
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
