import React, { useState } from 'react';

import EnterNameScreen from './EnterNameScreen';
import PlayScreen from './PlayScreen';

import './App.css';

const startingCardsValues = ['z', 'o', 'o', 'v', 'u'];

function App() {
	const [name, setName] = useState('');

	return (
		<div className="App">
			{name ? (
				<PlayScreen startingCardsValues={startingCardsValues} name={name} />
			) : (
				<EnterNameScreen setName={setName} />
			)}
		</div>
	);
}

export default App;
