import React, { useState } from 'react'
import { FaBars,FaCheckCircle,FaTrash,FaPlusCircle } from "react-icons/fa";

function Task() {
	const [visible, setVisible] = useState(false);
	const close_taskaddbox = () => {
		setVisible(false)
	}
	const initial = { taskName: '', taskTime: '' }
	let data = localStorage.getItem('added_task')
	let array;
	if (data) {
		array = JSON.parse(data);
	}
	else {
		array = [];
	}
	const [check, setCheck] = useState(false);
	const [inputText, setInputText] = useState(initial);
	const [task, setTask] = useState(array);
	const submit = () => {
		console.log("Task added");
		if (inputText.taskName === '') {
			alert('Please something to add task')
		} else {
			let inputTask = {
				taskId: new Date().getTime().toString(),
				taskName: inputText.taskName,
				taskTime: inputText.taskTime,
				taskCheck:false
			}
			setTask([...task, inputTask])
			setInputText(initial);
			task.push(inputTask)
			localStorage.setItem('added_task', JSON.stringify(task));
		}
	}
	const deleteTask = (id) => {
		let choice = window.confirm("Do you want Delete this Task ");
		if (choice) {
			let newTask = task.filter((tasklist)=> tasklist.taskId !== id);
			// newTask.splice(id, 1)
			setTask([...newTask]);
			console.log("Funcion deleted with this ID :", id);
			localStorage.setItem('added_task', JSON.stringify(newTask));
		}
	}
	// const check_task = (id,key) => {
	// 	console.log("check task called ::",id);
	// 	const newTask = task.filter((tasklist)=>{
	// 		// const deleteTask = task.filter((tasklist)=>tasklist.taskId !==id);
	// 		// setTask([...deleteTask])
	// 		if (tasklist.taskId===id) {
				
	// 			let updated_task={
	// 				taskId:tasklist.taskId,
	// 				taskName:tasklist.taskName,
	// 				taskTime:tasklist.taskTime,
	// 				taskCheck:true
	// 			}
	// 			task.push(updated_task)
	// 		}
	// 	})
	// 	setTask([newTask])
	// 	console.log(task);
	// 	// setCheck(!true);
	// }
	return (
		<div className='task_component'>
			<div className='task_header'>
				<span>Tasks</span>
				<div className='dots_menu'>
					<FaBars />
				</div>
			</div>
			{
				task.map((taskList, i) => {
					return (<div className='task_preview' key={i} index={i}>
						<div id='taskName' style={{ textDecoration: check ? 'line-through' : '' }}>{taskList.taskName}</div>
						<div className='check_task' onClick={() => { setCheck(!check) }}
							style={{ color: check ? 'green' : 'white' }}><FaCheckCircle /></div>
						<div className='delete_task' onClick={() => { deleteTask(taskList.taskId) }}><FaTrash /></div>
					</div>)
				})
			}
			{!visible && <div className='task_button' onClick={() => setVisible(!visible)}>
				<FaPlusCircle />&nbsp; Add Task
			</div>}

			{visible && <div className='task_add_box'>
				<input type='text' className='task_name_input' placeholder='What are you working on?' value={inputText.taskName}
					onChange={e => { setInputText({ taskName: e.target.value, taskTime: inputText.taskTime }) }} />
				<span>Est Pomodoros</span><br />
				<input type='number' className='number_input' min='0' step='1' placeholder="Est Time" value={inputText.taskTime}
					onChange={e => { setInputText({ taskName: inputText.taskName, taskTime: e.target.value }) }} />
				<div className='btn_div'>
					<button className='cancel_btn' onClick={close_taskaddbox}>Cancel</button>
					<button className='save_btn' onClick={() => { submit(); close_taskaddbox() }}>Save</button>
				</div>
			</div>}

		</div>
	)
}

export default Task
