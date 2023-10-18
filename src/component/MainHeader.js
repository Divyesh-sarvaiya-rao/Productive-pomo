import React from 'react'
import { FaUser } from "react-icons/fa";
import { FaWhmcs } from "react-icons/fa";
// import favicon from '../favicon.png/';
function MainHeader() {
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
				<button><FaWhmcs />Setting</button>
				<button><FaUser />Login</button>
			</div>
		</div>
		</>
	)
}
export default MainHeader