import React from "react";

function Timer(props) {
let timer;
if (props.bgcolor==='mainClock') {
	timer=props.timer.pomodoro;
	console.log('Current MainClock working');
}
else if(props.bgcolor==='shortClock'){
	timer=props.timer.shortBreak;
	console.log('Current ShortClock working');
}
else{
	timer=props.timer.longBreak;
	console.log('Current LongClock working');
}
// console.log('timer component ::',timer);
	return (
    <>
			<h1 className='text-center stopwatch-time'>{props.dispSecondsAsMins(timer)}</h1>
    </>
	)
}

export default Timer