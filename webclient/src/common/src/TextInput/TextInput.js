import React, { Component, PropTypes } from 'react';
import styles from './TextInput.scss';

const TextField = ({ placeholder, value, onChange }) => (
	<input
		className={`${styles.textField}`}
		type="text"
		value={value}
		placeholder={placeholder}
		onChange={(evt) => onChange(evt.target.value)}
	/>
);

 export default TextField