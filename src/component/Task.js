import React, { useState } from 'react'
import { FaCheckCircle, FaTrash, FaPlusCircle } from "react-icons/fa";

function Task() {
	const [visible, setVisible] = useState(false);
	const close_taskaddbox = () => {
		setVisible(false)
	}
	const initial = { taskName: '' }
	let data = localStorage.getItem('added_task')
	let array;
	if (data) {
		array = JSON.parse(data);
	}
	else {
		array = [];
	}
	// const [check, setCheck] = useState(false);
	const [inputText, setInputText] = useState(initial);
	let [task, setTask] = useState(array);
	const submit = () => {
		console.log("Task added");
		if (inputText.taskName === '') {
			alert('Please something to add task')
		} else {
			let inputTask = {
				taskId: new Date().getTime().toString(),
				taskName: inputText.taskName.trim(),
				taskCheck: false,
				taskDate: new Date().toString().slice(0, 10)
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
			let newTask = task.filter((tasklist) => tasklist.taskId !== id);
			// newTask.splice(id, 1)
			setTask([...newTask]);
			console.log("Funcion deleted with this ID :", id);
			localStorage.setItem('added_task', JSON.stringify(newTask));
		}
	}
	const check_task = (id) => {
		console.log("Task checked with ID:", id);
		const newTask = task.filter((tasklist) => {

			if (tasklist.taskId === id) {
				tasklist.taskCheck = !tasklist.taskCheck;
				console.log("Task check is :", tasklist.taskCheck);
			}
			return task;
		});
		setTask([...newTask]);
		localStorage.setItem('added_task', JSON.stringify(newTask));
	}

	const [menuvisible, setMenuVisible] = useState(false);
	const clear_task = () => {
		console.log('clear task called :');
		setTask([]);
		localStorage.removeItem('added_task');
	}
	return (
		<div className='task_component'>
			<div className='task_header'>
				<span>Tasks</span>
				<div className='dropdown'>
					<ul className='dropbtn icons btn-right showleft' onClick={() => setMenuVisible(!menuvisible)}>
						<li></li>
						<li></li>
						<li></li>
					</ul>
					{menuvisible && <div className='dropdown-content'>
						<button className='clear_btn' onClick={() => { clear_task(); setMenuVisible(false) }}>Clear all task</button>
					</div>}
				</div>
			</div>
			{
				task.map((taskList, i) => {
					return (<div className='task_preview' key={i} index={i} title={"Task Created : " + taskList.taskDate}
						style={{ backgroundColor: taskList.taskCheck ? '#979797' : '#E5E1E1' }}>
						<div className='check_task' onClick={() => { check_task(taskList.taskId) }}
							style={{ color: taskList.taskCheck ? 'green' : 'white' }}><FaCheckCircle /></div>
						<div id='taskName' style={{ textDecoration: taskList.taskCheck ? 'line-through' : '' }}>{taskList.taskName}
							<div className='task_date'>Task Created on : {taskList.taskDate}</div>
						</div>
						<div className='delete_task' onClick={() => { deleteTask(taskList.taskId) }}><FaTrash /></div>
					</div>)
				})
			}
			{!visible && <div className='task_button' onClick={() => setVisible(!visible)}>
				<FaPlusCircle />&nbsp; Add Task
			</div>}

			{visible && <div className='task_add_box'>
				<input type='text' className='task_name_input' placeholder='What are you working on?' value={inputText.taskName}
					onChange={e => { setInputText({ taskName: e.target.value, }) }} />
				{/* <span>Est Pomodoros</span><br /> */}
				{/* <input type='number' className='number_input' min='0' step='1' placeholder="Est Time" value={inputText.taskTime}
					onChange={e => { setInputText({ taskName: inputText.taskName, taskTime: e.target.value }) }} /> */}
				<div className='btn_div'>
					<button className='cancel_btn' onClick={close_taskaddbox}>Cancel</button>
					<button className='save_btn' onClick={() => { submit(); close_taskaddbox() }}>Save</button>
				</div>
			</div>}

		</div>
	)
}

export default Task
