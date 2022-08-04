import React from 'react'
import '../styles/components/navbar.scss'

type Props = {
	toggleSidebar: () => void
}

const Navbar = ({ toggleSidebar }: Props) => {
	return (
		<div className="navbar">
			<div className="nav">
				<div role="button" className="nav-toggle" onClick={toggleSidebar}>
					<div className="bar"></div>
					<div className="bar"></div>
					<div className="bar"></div>
				</div>
				<h3>Gain Temp</h3>
			</div>
			<div className="user-profile">
				<div className="border">
					<img src={'Images/huma.png'} alt="profile" />
				</div>
			</div>
		</div>
	)
}

export default Navbar
