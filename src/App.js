import React, { useState } from 'react'
// import MainHeader from './component/MainHeader.js'
import Home from './component/Home.js'

import './App.css';

function App() {
// const [timerTime, setTime] = useState('');
// const time=(time)=>{
  // setTime(time)
// }
  return (
   <> 
    <div className='main'>
      {/* <MainHeader time={time}/> */}
      <Home />
    </div>
   </>
  );
}

export default App  