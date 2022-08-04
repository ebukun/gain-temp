import React from 'react'
import '../styles/components/select.scss'

type Props = {
	name: string
	value: string
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
	options: Array<{ name: string; value: number | string }>
	disabled?: boolean
	width?: string
}

const Select = ({ name, value, disabled, onChange, options, width }: Props) => {
	return (
		<div className="select-wrapper">
			<select
				name={name}
				className="select__input"
				value={value}
				disabled={disabled}
				onChange={onChange}
				style={{ width: width || '' }}
			>
				{options.length > 0 &&
					options.map((opt, i) => (
						<option key={i} value={opt.value}>
							{opt.name}
						</option>
					))}
			</select>
		</div>
	)
}

export default Select
