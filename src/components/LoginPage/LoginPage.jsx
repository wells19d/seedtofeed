import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import '../../index.css';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center>
        <Button
          className="submit-buttons"
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
