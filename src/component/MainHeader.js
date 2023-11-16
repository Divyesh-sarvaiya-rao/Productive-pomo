import React, { useState } from 'react'
import { FaCheckCircle } from "react-icons/fa";
// import favicon from '../favicon.png/';
function MainHeader(props) {
	const [visible, setVisible] = useState(false);
	// const setting=()=>{
	// 	setVisible(true);
	// }
	let pomodoroTime = 25;
	let shortbreacktime = 5;
	let longbreacktime = 15;
	const mainInput = {
		pomodoro: pomodoroTime,
		shortBreak: shortbreacktime,
		longBreak: longbreacktime
	}
	const [inputTime, setInputTime] = useState(mainInput)
	const [time, setTime] = useState('')
	const setting_done = () => {
		setVisible(false);
		setTime(inputTime);
	}
	props.time(time)
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
							<path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />
						</svg>
						<span className='header_btn'>&emsp;Report</span>
					</button>
					<button onClick={() => setVisible(!visible)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-wide" viewBox="0 0 16 16">
							<path d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 1 0-9.995 4.998 4.998 0 0 1 0 9.996z" />
						</svg>
						<span className='header_btn'>&emsp;Setting</span>
					</button>
					<button>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
							<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
							<path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
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
								onChange={e => { setInputTime({ pomodoro: e.target.value, shortBreak: inputTime.shortBreak, longBreak: inputTime.longBreak }) }} />
						</div>
						<div className=" input_div">
							<label className=" lable_name">Short Break</label>
							<input type="number" min="0" step="1" className="number_input" value={inputTime.shortBreak}
								onChange={e => { setInputTime({ pomodoro: inputTime.pomodoro, shortBreak: e.target.value, longBreak: inputTime.longBreak }) }} />
						</div>
						<div className=" input_div">
							<label className=" lable_name">Long Break</label>
							<input type="number" min="0" step="1" className="number_input" value={inputTime.longBreak}
								onChange={e => { setInputTime({ pomodoro: inputTime.pomodoro, shortBreak: inputTime.shortBreak, longBreak: e.target.value }) }} />
						</div>
					</div>
					<div className='setting_done_btn'>
						<button className='done_btn ' onClick={setting_done} >Done</button>
					</div>
				</div>
			</div>}
		</>
	)
}
export default MainHeader