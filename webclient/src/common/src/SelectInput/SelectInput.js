import React, { PropTypes } from 'react';
import Select from 'react-select';
import styles from './SelectInput.scss';

const SelectInput = ({ searchable, multi, options, value, clearable, onChange }) => {
	return (
		<Select
			searchable={searchable}
			multi={multi}
			options={options}
			value={value}
			onChange={data => onChange(multi ? data : data.value)}
			clearable={clearable}
		/>
	);
};

export default SelectInput;
