import React, { useState } from 'react';
import {useSelector} from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Signum(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Signum Dashboard');

  return (
    <div>
      <h2>{heading}</h2>
      <iframe frameBorder="none" width='100%' height='500px' src="https://grandfarm.signumiot.com/app/dashboard">
    </iframe>
    </div>
  );
}

export default Signum;
