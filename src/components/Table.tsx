import '../styles/components/table.scss'

type TableT = {
	name: string
	index: string
	id: number
}

type Props = {
	columns: TableT[]
	data: Array<{ [key: string]: string }>
	loading: string
}

const Table = ({ columns, data, loading }: Props) => {
	const showLoading = loading && loading === 'loading'
	return (
		<div className="data-table">
			<table>
				<tbody>
					<tr className="table-header">
						{columns &&
							columns.map(column => <th key={column.id}>{column.name}</th>)}
					</tr>
					{data &&
						data.map(item => (
							<tr className="table-data-row" key={Math.random() * 1000}>
								{columns &&
									columns.map(column => (
										<td key={column.id}>{item[column.index]}</td>
									))}
							</tr>
						))}
				</tbody>
			</table>
			{data.length === 0 && showLoading ? (
				<div className="center-flex">
					<span className="loading-circle loading-circle-large"></span>
				</div>
			) : null}
			{data && data.length === 0 && !showLoading && (
				<div className="text-center">
					<p>No Data </p>
				</div>
			)}
		</div>
	)
}

export default Table
