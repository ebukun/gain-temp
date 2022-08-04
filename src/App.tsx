import Navbar from 'components/Navbar'
import ScrollToTop from 'components/ScrollToTop'
import Sidebar from 'components/Sidebar'
import ErrorHandler from 'ErrorHandler'
import Countries from 'pages/Countries/Countries'
import Dashboard from 'pages/Dashboard/Dashboard'
import React, { useEffect, useRef, useState } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
	useLocation,
} from 'react-router-dom'

const App = () => {
	return (
		<Router>
			<ErrorHandler>
				<Root />
			</ErrorHandler>
		</Router>
	)
}

const Root = () => {
	let location = useLocation()
	const [showSidebar, setShowSidebar] = useState<boolean>(false)
	const sidebarRef = useRef<HTMLDivElement>(null)

	window.addEventListener('mousedown', hideSidebar)

	function hideSidebar(event: MouseEvent) {
		const target = event.target as HTMLElement
		if (sidebarRef.current && sidebarRef.current.contains(target)) {
			return ''
		}
		setShowSidebar(false)
	}

	useEffect(() => {
		if (showSidebar) {
			setShowSidebar(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname])

	useEffect(() => {
		return () => {
			window.removeEventListener('mousedown', hideSidebar)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	function toggleSidebar(): void {
		setShowSidebar(!showSidebar)
	}
	return (
		<div className="app">
			<div className="app-container">
				<div
					className={`left-col ${showSidebar ? 'show-left' : 'hide-left'}`}
					ref={sidebarRef}
				>
					<Sidebar />
				</div>

				<div className="right-col">
					<Navbar toggleSidebar={toggleSidebar} />
					<div className="route-container">
						<ScrollToTop />
						<Switch>
							<Route exact path="/" component={Dashboard} />
							<Route exact path="/countries" component={Countries} />
							<Redirect to="/" />
						</Switch>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
