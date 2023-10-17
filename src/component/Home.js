import { useState, useEffect, useRef } from 'react'
import Timer from './Timer.js'
import Task from './Task.js'

function Home(props) {
  let pomodoroTime = 20 * 60;
  let shortbreacktime = 5 * 60;
  let longbreacktime = 15 * 60;
  const mainTime = {
    pomodoro: pomodoroTime,
    shortBreak: shortbreacktime,
    longBreak: longbreacktime
  }
  const bgcolorType = {
    color: 'rgb(186, 73, 73)',
    type: 'mainClock'
  }
  const [bgcolor, setColor] = useState(bgcolorType)

  const backgroundChange = (color, type) => {
    setColor(color = { color: color, type: type });
  }
  useEffect(() => {
    document.body.style.backgroundColor = bgcolor.color;
  })

  const [timer, setTimer] = useState(mainTime);
  const [start, setStart] = useState(false);
  const firstStart = useRef(true);
  const tick = useRef();

  useEffect(() => {
    if (firstStart.current) {
      console.log("first render, don't run useEffect for timer");
      firstStart.current = !firstStart.current;
      return;
    }

    console.log("subsequent renders");
    console.log(start);
    if (start) {
      let time = { pomodoro: timer.pomodoro, shortBreak: timer.shortBreak, longBreak: timer.longBreak }
      if (bgcolor.type === 'mainClock') {
        if (timer.pomodoro === 0) {
          console.log('timer component clock out');
          clearInterval(tick.current);
          setStart(false);
        } else {
          time = { pomodoro: timer.pomodoro - 1, shortBreak: timer.shortBreak, longBreak: timer.longBreak }
        }
      }
      else if (bgcolor.type === 'shortClock') {
        if (timer.shortBreak === 0) {
          console.log('timer component clock out');
          clearInterval(tick.current);
          setStart(false);
          backgroundChange("rgb(186, 73, 73)", "mainClock");
          pomodorotime();
        } else {
          time = { pomodoro: timer.pomodoro, shortBreak: timer.shortBreak - 1, longBreak: timer.longBreak }
        }
      }
      else if (bgcolor.type === 'longClock') {
        if (timer.pomodoro === 0) {
          console.log('timer component clock out');
          clearInterval(tick.current);
          setStart(false);
          backgroundChange("rgb(186, 73, 73)", "mainClock");
          pomodorotime();
        } else {
          time = { pomodoro: timer.pomodoro - 1, shortBreak: timer.shortBreak, longBreak: timer.longBreak - 1 }
        }
      }
      tick.current = setInterval(() => {
        setTimer(() => time);

      }, 1000);

    } else {
      console.log("clear interval");
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [start]);

  const toggleStart = () => {
    setStart(!start);
  };

  const dispSecondsAsMins = (seconds) => {
    console.log("seconds :" + seconds);
    const mins = Math.floor(seconds / 60);
    const seconds_ = seconds % 60;
    return mins.toString() + ":" + (seconds_ === 0 ? "00" : seconds_.toString());
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
  return (
    <>
      <div className='home_component' style={{ backgroundColor: bgcolor.color }}>

        <div className='first_row'>

          <div className='row second_row'>

            <div className=' button_col'>

              <button id='pomodoro' onClick={() => { backgroundChange("rgb(186, 73, 73)", "mainClock"); pomodorotime() }}
              >Pomodoro</button>
              <button id='shortBreack' onClick={() => { backgroundChange("rgb(56,133,138)", "shortClock"); shortBreack() }}>Short Break</button>
              <button id='longBreack' onClick={() => { backgroundChange("rgb(57,112,151)", "longClock"); longBreack() }}>Long Break</button>
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
          <div className='taskName text-center'>Time to focus!</div>
          <Task />

        </div>
      </div>
    </>
  );
}

export default Home