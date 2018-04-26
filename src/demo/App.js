import React from 'react';
import { CidiMouseMove } from '../lib';
import img from './logo.svg';
const App = () => (
  <div>
    <CidiMouseMove distX='0.02' distY ='0.02' oMult='3'>
      <img style={{
        width: '300px',
        height: '300px'
      }} src={img} alt='test' />
    </CidiMouseMove>
  </div>
);

export default App;
