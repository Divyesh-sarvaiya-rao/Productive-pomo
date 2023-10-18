import React, { useState } from 'react'
import { FaBars } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

function Task() {
const [visible, setVisible] = useState(false);
const close_taskaddbox = () =>{
  	setVisible(false)
  }
  const initial={taskName:'',taskTime:''}
//   const initialTask={taskName:'',taskTime:''}
const [inputText,setInputText] =useState(initial);
const [task,setTask]= useState([]);
const submit =()=>{
	console.log("Task added");
	if (inputText.taskName==='') {
		alert('Please something to add task')
	}else{
		let inputTask={
			taskId:new Date().getTime().toString(),
			taskName:inputText.taskName,
			taskTime:inputText.taskTime
		}
		setTask([...task,inputTask])
		setInputText(initial);
	}
}
const deleteTask=(id)=>{
	let choice= window.confirm("Do you want Delete this Task ");
	if (choice) {
		let newTask=[...task];
		newTask.splice(id,1)
		setTask([...newTask]);	
		console.log("Funcion deleted with this ID :",id);

	}
	
}
	return (
		<div className='task_component'>
			<div className='task_header'>
				<span>Tasks</span>
				<div className='dots_menu'>
				<FaBars />
				</div>
			</div>
			{
				task.map((taskList,i)=>{
					return(<div className='task_preview' key={i} index={i}>
						<div id='taskName'>{taskList.taskName}</div>
						<div className='delete_task' onClick={()=>{deleteTask(i)}}>
						<FaTrash />
						</div>
					</div>)
				})
			}
			{!visible &&<div className='task_button' onClick={() => setVisible(!visible)}>
				<strong>+</strong> Add Task
			</div>}
			
			
			{visible && <div className='task_add_box'>
				<input type='text' className='task_name_input' placeholder='What are you working on?' value={inputText.taskName} 
				onChange={e=>{setInputText({taskName:e.target.value,taskTime:inputText.taskTime})}}/>
				<span>Est Pomodoros</span><br/>
				<input type='number' className='number_input' min='0'step='1' placeholder="Est Time"value={inputText.taskTime}
				onChange={e=>{setInputText({taskName:inputText.taskName,taskTime:e.target.value})}}/>
				<div className='btn_div'>
					<button className='cancel_btn' onClick={close_taskaddbox}>Cancel</button>
					<button className='save_btn' onClick={()=>{submit();close_taskaddbox()}}>Save</button>
				</div>
			</div>}
			
		</div>
	)
}

export default Task
