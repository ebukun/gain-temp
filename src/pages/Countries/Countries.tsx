import Table from 'components/Table'
import { useAppData } from 'context/app-context'

export const tableColumns = [
	{ name: 'Name', index: 'name', id: 1 },
	{ name: 'Population', index: 'population', id: 2 },
	{ name: 'Timezones', index: 'timezones', id: 3 },
	{ name: 'Continents', index: 'continents', id: 4 },
	{ name: 'Longitude', index: 'lon', id: 5 },
	{ name: 'Latitude', index: 'lat', id: 6 },
]
const Countries = () => {
	const { countries, status } = useAppData()

	return (
		<div>
			<Table columns={tableColumns} data={countries} loading={status} />
		</div>
	)
}

export default Countries
