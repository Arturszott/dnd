import React, { useState, useCallback } from 'react';

import './EnterNameScreen.css';

export default React.memo(function EnterNameScreen({ setName }) {
	const [value, setValue] = useState('');
	const onChange = useCallback((event) => {
		setValue(event.target.value);
	}, []);
	const onKeyPress = (event) => {
		if (event.charCode === 13) {
			setName(value);
		}
	};

	return (
		<div className="EnterNameScreen">
			<h1>Hello friend, tell me your name...</h1>
			<input
				type="text"
				className="nameInput"
				value={value}
				onChange={onChange}
				placeholder="Your name here"
				onKeyPress={onKeyPress}
			/>
			<button className="submit" onClick={() => setName(value)}>
				Let's go... →
			</button>
		</div>
	);
});
