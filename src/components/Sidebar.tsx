import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/components/sidebar.scss'

const Sidebar = () => {
	return (
		<div className="side-bar">
			<nav className="side-bar--links">
				<NavLink activeClassName="active" exact className="nav-link" to="/">
					<h6 className="route-name">Dashboard</h6>
				</NavLink>
				<NavLink
					activeClassName="active"
					exact
					className="nav-link"
					to="/countries"
				>
					<h6 className="route-name">Countries</h6>
				</NavLink>
			</nav>
		</div>
	)
}

export default Sidebar
