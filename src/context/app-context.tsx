import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

export type CountryProps = {
	name: string
	latlng: string
	lat: string
	lon: string
	population: string
	timezones: string
	continents: string
}

interface ContextState {
	countries: CountryProps[] | []
	status: string
}

const AppContext = createContext({} as ContextState)

type Props = {
	children: React.ReactNode
}

const AppProvider = ({ children }: Props) => {
	const [countries, setCountries] = useState<CountryProps[]>([])
	const [status, setStatus] = useState<string>('loading')

	useEffect(() => {
		getCountries()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getCountries = async (): Promise<void> => {
		interface ResponseType {
			name: { common: string }
			latlng: string
			population: string
			timezones: string
			continents: string
		}
		setStatus('loading')
		try {
			const response = await axios.get(`https://restcountries.com/v3.1/all`)
			let responseData = response.data
			let countries: CountryProps[] = []

			responseData.forEach((item: ResponseType) => {
				countries.push({
					name: item.name.common,
					latlng: item.latlng.toString(),
					lat: item.latlng[0],
					lon: item.latlng[1],
					population: item.population,
					timezones: item.timezones[0],
					continents: item.continents[0],
				})
			})

			setCountries(countries)
			setStatus('success')
		} catch (error) {
			setStatus('fail')
		}
	}

	return (
		<AppContext.Provider value={{ countries, status }}>
			{children}
		</AppContext.Provider>
	)
}

const useAppData = (): ContextState => {
	const appData = useContext(AppContext)
	if (appData === undefined) {
		throw new Error('useAppData must be used within a AppProvider')
	}
	return appData
}

export { useAppData, AppProvider }
