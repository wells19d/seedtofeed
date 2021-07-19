import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
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

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />

      <center>
        <Button className='submit-buttons' size="small" onClick={() => {history.push('/login');}}>
          Login Page
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
