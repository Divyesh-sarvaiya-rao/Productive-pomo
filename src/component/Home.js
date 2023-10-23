import { useState, useEffect, useRef } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import useSound from 'use-sound';
import Timer from './Timer.js';
import Task from './Task.js';
import sound from '../sounds/music.wav';

function Home(props) {
  // console.log('home component Time :',props.taskTime);
  // let pomodoroTime = props.taskTime ? props.taskTime.pomodoro * 60 : 25 * 60;
  // let shortbreacktime = props.taskTime ? props.taskTime.shortBreak * 60 : 5 * 60;
  // let longbreacktime = props.taskTime ? props.taskTime.longBreak * 60 : 15 *60;
 
  let pomodoroTime = 25 ;
  let shortbreacktime = 5 ;
  let longbreacktime =  15;
 
  // console.log('homeTime::',pomodoroTime);
  let mainTime = {
    pomodoro: pomodoroTime*60,
    shortBreak: shortbreacktime*60,
    longBreak: longbreacktime*60
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

  // if (props.taskTime.pomodoro) {
  //   // console.log('set timer called', mainTime);
  //   setTimer(mainTime);
  // }
  // if (props && props.taskTime) {
  //   pomodoroTime=props.taskTime.pomodoroTime;
  //   shortbreacktime=props.taskTime.shortBreakTime;
  //   longbreacktime=props.taskTime.longbreacktime;
  //   const mainTime = {
  //     pomodoro: pomodoroTime * 60,
  //     shortBreak: shortbreacktime * 60,
  //     longBreak: longbreacktime * 60
  //   }
  //   setTimer(mainTime)
  // }
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
          time = { pomodoro: pomodoroTime, shortBreak: shortbreacktime, longBreak: longbreacktime }
          }
        } else {
          time = { pomodoro: timer.pomodoro - 1, shortBreak: shortbreacktime, longBreak: longbreacktime }
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
          time = { pomodoro: timer.pomodoro, shortBreak: shortbreacktime, longBreak: longbreacktime }
        } else {
          time = { pomodoro: timer.pomodoro, shortBreak: timer.shortBreak - 1, longBreak: longbreacktime }
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
          time = { pomodoro: timer.pomodoro, shortBreak: shortbreacktime, longBreak: longbreacktime }
        } else {
          time = { pomodoro: timer.pomodoro, shortBreak: shortbreacktime, longBreak: timer.longBreak - 1 }
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
    

    const[visible,setVisible] =useState(false);

const [inputTime,setInputTime]=useState(mainTime)
const [time,setTime]=useState('')
const setting_done=()=>{
	setVisible(false);
	setTime(inputTime);
}
  return (
    <>
    <div className='header'>
			<h4 className='header-text'>
					<div>
						<FaCheckCircle />&nbsp;Productive Pomo
					</div>
			</h4>
			<div className='header-button'>
				<button>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-bar-chart" viewBox="0 0 16 16">
 					<path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
					</svg>
					<span className='header_btn'>&emsp;Report</span>
				</button>
				<button onClick={() => setVisible(!visible)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-wide" viewBox="0 0 16 16">
  					<path d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 1 0-9.995 4.998 4.998 0 0 1 0 9.996z"/>
					</svg>
					<span className='header_btn'>&emsp;Setting</span> 
				</button>
				<button>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
  					<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  					<path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
					</svg>
					<span className='header_btn'>&emsp;Login</span>
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
						<button className='done_btn ' onClick={setting_done} >Done</button>
					</div>
				</div>
		</div>}
      <div className='home_component' style={{ backgroundColor: bgcolor.color }}>
    
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

                <button className="startBut" onClick={toggleStart} style={{ color: bgcolor.color }}>
                  {!start ? "START" : "STOP"}
                </button>

              </div>

            </div>

          </div>

          <div className='pomodoro_count text-center'>#1</div>
        <div className='taskName text-center'>{taskName}</div>
          <Task />

        </div>
      </div>
    </>
  );
}

export default Home