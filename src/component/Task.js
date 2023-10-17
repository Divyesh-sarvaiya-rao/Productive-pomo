import React, { useState, useEffect } from 'react'
import { FaBars } from "react-icons/fa";

function Task() {
const [visible, setVisible] = useState(false);
const close_taskaddbox = () =>{
  	setVisible(false)
  }
	return (
		<div className='task_component'>
			<div className='task_header'>
				<span>Tasks</span>
				<div className='dots_menu'>
				<FaBars />
				</div>
			</div>
			<div className='task_button' onClick={() => setVisible(!visible)}>
				<strong>+</strong> Add Task
			</div>
			<div className='task_preview'>

			</div>
			{visible && <div className='task_add_box'>
				<input type='text' className='task_name_input' placeHolder='What are you working on?' />
				<span>Est Pomodoros</span><br/>
				<input type='number' className='number_input' min='0'step='1' placeHolder="Est Time" />
				<div className='btn_div'>
					<button className='cancel_btn' onClick={close_taskaddbox}>Cancel</button>
					<button className='save_btn'>Save</button>
				</div>
			</div>}
			
		</div>
	)
}

export default Task
