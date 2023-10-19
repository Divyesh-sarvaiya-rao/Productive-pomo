import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { FaWhmcs } from "react-icons/fa";
// import favicon from '../favicon.png/';
function MainHeader(props) {
const[visible,setVisible] =useState(false);
// const setting=()=>{
// 	setVisible(true);
// }
let pomodoroTime = 25;
let shortbreacktime = 5;
let longbreacktime = 15;
const mainInput = {
	pomodoroTime:pomodoroTime,
	shortBreakTime:shortbreacktime,
	longBreakTime:longbreacktime
}
const [inputTime,setInputTime]=useState(mainInput)
const [time,setTime]=useState('')
const setting_done=()=>{
	setVisible(false);
	setTime(inputTime);
}
props.time(time)
	return (
		<>
		<div className='header'>
			<h4 className='header-text'>
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill='white'>
							<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
						</svg>&nbsp;Productive Pomo
					</div>
			</h4>
			<div className='header-button'>
				<button>Report</button>
				<button onClick={() => setVisible(!visible)}><FaWhmcs />Setting</button>
				<button><FaUser />Login</button>
			</div>
		</div>
		{visible && <div className='setting_div'>
				<div className="container">
					<div className=" timeName"><span>Time (minutes)</span></div>
					<div class=" time_input_div">
						<div className=" input_div">
							<label className=" lable_name">Pomodoro</label>
							<input type="number" min="0" step="1" className="number_input" value={inputTime.pomodoroTime} 
							onChange={e=>{setInputTime({pomodoroTime:e.target.value,shortBreakTime:inputTime.shortBreakTime,longBreakTime:inputTime.longBreakTime})}}/>
						</div>
						<div className=" input_div">
							<label className=" lable_name">Short Break</label>
							<input type="number" min="0" step="1" className="number_input" value={inputTime.shortBreakTime} 
							onChange={e=>{setInputTime({pomodoroTime:inputTime.pomodoroTime,shortBreakTime:e.target.value,longBreakTime:inputTime.longBreakTime})}}/>
						</div>
						<div className=" input_div">
							<label className=" lable_name">Long Break</label>
							<input type="number" min="0" step="1" className="number_input" value={inputTime.longBreakTime}
							onChange={e=>{setInputTime({pomodoroTime:inputTime.pomodoroTime,shortBreakTime:inputTime.shortBreakTime,longBreakTime:e.target.value})}}/>
						</div>
					</div>
					<div className='setting_done_btn'>
						<button className='done_btn' onClick={setting_done}>Done</button>
					</div>
				</div>
		</div>}
		</>
	)
}
export default MainHeader