import axios from 'axios'
import Select from 'components/Select'
import StatsCard from 'components/StatsCard'
import { useAppData } from 'context/app-context'
import React, { useEffect, useMemo, useState } from 'react'
import '../../styles/pages/dashboard.scss'

const API_KEY = process.env.REACT_APP_API_KEY

type WeatherT = {
	temp_min: string
	temp_max: string
	humidity: string
	speed: string
	deg: string
	pressure: string
}

type CountryT = {
	name: string
	value: string
}

type CountryValue = CountryT['value']

const Dashboard = () => {
	const { countries, status: appLoading } = useAppData()

	const [status, setStatus] = useState('loading')
	const [weatherStats, setWeatherStats] = useState<WeatherT>({} as WeatherT)
	const [country, setCountry] = useState<CountryValue>('35,139')

	useEffect(() => {
		getWeatherData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [country])

	const getWeatherData = async (): Promise<void> => {
		setStatus('loading')
		let lat: string = country.split(',')[0]
		let lon: string = country.split(',')[1]
		let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`

		try {
			const response = await axios.get(url)
			const { main, wind } = response.data

			const responseData = { ...main, ...wind }

			setWeatherStats(responseData)
			setStatus('success')
		} catch (error) {
			setStatus('fail')
		}
	}

	function getCountryList(): CountryT[] {
		let countryList: CountryT[] = [{ name: 'Select Countries', value: '' }]
		countries.forEach(item => {
			countryList.push({ name: item.name, value: item.latlng })
		})
		return countryList
	}

	function handleCountrySelect(event: React.ChangeEvent<HTMLSelectElement>) {
		const target = event.target as HTMLSelectElement
		setCountry(target.value)
	}

	const countryPositon = useMemo(
		() => getCountryList(),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[countries],
	)

	return (
		<div className="dashboard">
			<StatsCard
				summary={[
					{
						name: 'Temperature (Min / Max)',
						value: `${weatherStats.temp_min} / ${weatherStats.temp_max}`,
					},
					{ name: 'Humidity', value: weatherStats.humidity },
					{ name: 'Pressure', value: weatherStats.pressure },
					{
						name: 'Wind (Speed / Direction)',
						value: `${weatherStats.speed} / ${weatherStats.deg}`,
					},
				]}
				showLoader={status === 'loading'}
			/>
			<div className="dashboard__flex">
				<div className="dashboard__flex-note">
					<h4>Welcome back</h4>
					<p className="mt-1">
						Here's what has been happening in the last days
					</p>
				</div>

				<div>
					<Select
						name={'countries'}
						value={country}
						onChange={e => handleCountrySelect(e)}
						options={countryPositon}
						disabled={appLoading === 'loading'}
					/>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
