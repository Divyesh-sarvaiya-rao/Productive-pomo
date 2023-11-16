import { useState, useEffect, useRef } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import useSound from 'use-sound';
import Timer from './Timer.js';
import Task from './Task.js';
import sound from '../sounds/music2.wav';

function Home() {

  let pomodoroTime = 25 *60;
  let shortbreackTime = 5 *60;
  let longbreackTime =  15*60;
  
  let locaSetTime = localStorage.getItem('userSetTime');
  let mainTime;
  if (locaSetTime) {
    mainTime=JSON.parse(locaSetTime)
  }
  else{
    mainTime = {
      pomodoro: pomodoroTime,
      shortBreak: shortbreackTime,
      longBreak: longbreackTime
    }
  }

  const bgcolorType = {
    color: 'rgb(186, 73, 73)',
    type: 'mainClock'
  }
  const [bgcolor, setColor] = useState(bgcolorType)
  const [playsound]= useSound(sound)
  const backgroundChange = (color, type) => {
    setColor(color = { color: color, type: type });
  }
  useEffect(() => {
    document.body.style.backgroundColor = bgcolor.color;
    document.body.style.transition = 'background-color 3s'
  })
  const [activebutton, setactivebutton] = useState('first');
  const clickedbuttonhandler = (name) => {
    setactivebutton(name);
    setStart(false)
    console.log(activebutton);
  }; 

  let [timer, setTimer] = useState(mainTime);
  const [start, setStart] = useState(false);
  const firstStart = useRef(true);
  const tick = useRef();

  useEffect(() => {
    if (firstStart.current) {
      console.log("first render, don't run useEffect for timer");
      firstStart.current = !firstStart.current;
      return;
    }
    if (start) {
      let time;
      tick.current = setInterval(() => {
        if (bgcolor.type === 'mainClock') {
        if (timer.pomodoro === 0) {
          console.log('timer component clock out');
          playsound();
          clearInterval(tick.current);
          setStart(false);
          if(window.confirm("Your task is completed Do you want to Reset this clock ")){
          time = { pomodoro: mainTime.pomodoro, shortBreak: mainTime.shortBreak, longBreak: mainTime.longBreak }
          }
        } else {
          time = { pomodoro: timer.pomodoro - 1, shortBreak: timer.shortBreak, longBreak: timer.longBreak }
        }
        console.log("mainClock called : ", time);
      }
      else if (bgcolor.type === 'shortClock') {
        if (timer.shortBreak === 0) {
          console.log('timer component clock out');
          clearInterval(tick.current);
          playsound();
          setStart(false);
          backgroundChange("rgb(186, 73, 73)", "mainClock");
          pomodorotime();
          clickedbuttonhandler('first');
          time = { pomodoro: mainTime.pomodoro, shortBreak: mainTime.shortBreak, longBreak: mainTime.longBreak }
        } else {
          time = { pomodoro: timer.pomodoro, shortBreak: timer.shortBreak - 1, longBreak: timer.longBreak }
        }
      }
      else if (bgcolor.type === 'longClock') {
        if (timer.longBreak === 0) {
          console.log('timer component clock out');
          clearInterval(tick.current);
          playsound();
          setStart(false);
          backgroundChange("rgb(186, 73, 73)", "mainClock");
          pomodorotime();
          clickedbuttonhandler('first');
          time = { pomodoro: mainTime.pomodoro, shortBreak: mainTime.shortBreak, longBreak: mainTime.longBreak }
        } else {
          time = { pomodoro: timer.pomodoro, shortBreak: timer.shortBreak, longBreak: timer.longBreak - 1 }
        }
      }
        setTimer(() => timer = time);
      }, 1000);
    } else {
      console.log("clear interval");
      clearInterval(tick.current);
    }
    return () => clearInterval(tick.current);
  },[start]);

  const toggleStart = () => {
    setStart(!start);
  };

  const dispSecondsAsMins = (seconds) => {
    console.log("seconds :" + seconds);
    let mins = Math.floor(seconds / 60);
    let seconds_ = seconds % 60;
    let minsString = mins.toString();
    let secondsString = seconds_.toString();
  
    if (minsString.length === 1) {
      minsString = "0" + minsString;
    }
    if (secondsString.length === 1) {
      secondsString = "0" + secondsString;
    }
    return minsString + ":" + secondsString;
  };
  
  const pomodorotime = () => {
    console.log("pomodoro function called :")
    // setTimer(time);  
    console.log(window.statusbar);
  }
  const shortBreack = () => {
    console.log("shortBreack function called : ")
    // setTimer(shortbreacktime);
  }
  const longBreack = () => {
    console.log("longBreack function called : ")
    // setTimer(longbreacktime);
  }
  let taskName;
    if (bgcolor.type==='mainClock') {
      taskName='Time to focus!'
    } else if(bgcolor.type==='shortClock'){
      taskName='Time to Shortbreak!'
    }
    else if (bgcolor.type==='longClock') {
      taskName='Time to Longbreak!'
    }
    
let user_set_time;
if (locaSetTime) {
  const setTime=JSON.parse(locaSetTime); 
  user_set_time={
    pomodoro:setTime.pomodoro/60,
    shortBreak:setTime.shortBreak/60,
    longBreak:setTime.longBreak/60
  };
}
else{
  user_set_time={
    pomodoro:25,
    shortBreak:5,
    longBreak:15
  }
}
const[visible,setVisible] =useState(false);
const [inputTime,setInputTime]=useState(user_set_time)
const setting_done=()=>{
	setVisible(false);
  let user_time={
    pomodoro:inputTime.pomodoro*60,
    shortBreak:inputTime.shortBreak*60,
    longBreak:inputTime.longBreak*60
  }
  console.log('User input time :',inputTime);
  setTimer(user_time);
  localStorage.setItem('userSetTime',JSON.stringify(user_time));
  // setInputTime(user_set_time);
}
const reset_inputs=()=>{
  let default_time={pomodoro:25*60,shortBreak:5*60,longBreak:15*60}
  setInputTime({pomodoro:25,shortBreak:5,longBreak:15});
  localStorage.setItem('userSetTime',JSON.stringify(default_time));
  setTimer(default_time);  
}

  return (
    <>
    {/* header component start here */}
	<div className='header'>
		<h4 className='header-text'>
			<div>
				<FaCheckCircle />&nbsp;Productive Pomo
			</div>
		</h4>
		<div className='header-button'>
			<button onClick={() => setVisible(!visible)}>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-wide" viewBox="0 0 16 16">
				<path d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 1 0-9.995 4.998 4.998 0 0 1 0 9.996z"/>
				</svg>
				<span className='header_btn'>&emsp;Setting</span> 
			</button>
		</div>
	</div>
	{visible && <div className='setting_div'>
		<div className="container">
			<div className=" timeName"><span>Time (minutes)</span></div>
			<div className=" time_input_div">
				<div className=" input_div">
					<label className=" lable_name">Pomodoro</label>
					<input type="number" min="0" step="1" className="number_input" value={inputTime.pomodoro} 
					onChange={e=>{setInputTime({pomodoro:e.target.value,shortBreak:inputTime.shortBreak,longBreak:inputTime.longBreak})}}/>
				</div>
				<div className=" input_div">
					<label className=" lable_name">Short Break</label>
					<input type="number" min="0" step="1" className="number_input" value={inputTime.shortBreak} 
					onChange={e=>{setInputTime({pomodoro:inputTime.pomodoro,shortBreak:e.target.value,longBreak:inputTime.longBreak})}}/>
				</div>
				<div className=" input_div">
					<label className=" lable_name">Long Break</label>
					<input type="number" min="0" step="1" className="number_input" value={inputTime.longBreak} 
					onChange={e=>{setInputTime({pomodoro:inputTime.pomodoro,shortBreak:inputTime.shortBreak,longBreak:e.target.value})}}/>
				</div>
			</div>
			<div className='setting_done_btn'>
				<button className='reset_btn' onClick={reset_inputs}>Reset</button>
				<button className='done_btn ' onClick={setting_done} >Done</button>
			</div>
		</div>
	</div>}
    {/* Home component start here */}

    { !visible&& <div className='home_component' >
        <div className='first_row'>
          <div className='row second_row'>
		<div className=' button_col'>
			<button id='pomodoro' onClick={() => { backgroundChange("rgb(186, 73, 73)", "mainClock"); pomodorotime();clickedbuttonhandler('first') }}
			style={{backgroundColor: activebutton==='first'? 'rgba(0, 0, 0, 0.15)':''}} >Pomodoro</button>
			<button id='shortBreack' onClick={() => { backgroundChange("rgb(56,133,138)", "shortClock"); shortBreack();clickedbuttonhandler('second') }}
			style={{backgroundColor: activebutton==='second'? 'rgba(0, 0, 0, 0.15)':''}}>Short Break</button>
			<button id='longBreack' onClick={() => { backgroundChange("rgb(57,112,151)", "longClock"); longBreack();clickedbuttonhandler('third') }}
			style={{backgroundColor: activebutton==='third'? 'rgba(0, 0, 0, 0.15)':''}} >Long Break</button>
		</div>
            <div className='timer-div '>
              <Timer dispSecondsAsMins={dispSecondsAsMins} timer={timer} bgcolor={bgcolor.type} />
              <div className="startDiv text-center">
                <button className="startBut" onClick={toggleStart} style={{ color: bgcolor.color,transition:'color 3s'}}>
                  {!start ? "START" : "STOP"}
                </button>
              </div>
            </div>
          </div>
          {/* <div className='pomodoro_count text-center'>#1</div> */}
        <div className='taskName text-center'>{taskName}</div>
          <Task />
        </div>
      </div>}
    </>
  );
}

export default Home
