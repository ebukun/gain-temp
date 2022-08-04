import React from 'react'
import '../styles/components/statscard.scss'

type Props = {
	showLoader: boolean
	summary: Array<{ name: string; value: number | string }>
}

const StatsCard = ({ showLoader, summary }: Props) => {
	return (
		<div className="stats">
			{summary.map((item, i) => (
				<div className="stats-card" key={i}>
					<div className="stats-card-name">{item.name}</div>
					{showLoader ? (
						<span className="loading-circle loading-circle-small mt-1-5 "></span>
					) : (
						<div className="stats-card-count">{item.value || 0}</div>
					)}
				</div>
			))}
		</div>
	)
}

export default StatsCard
