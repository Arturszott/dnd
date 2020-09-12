import React, { useState, useEffect, useReducer } from 'react';
import './App.css';

import reducer from './reducer';
import Timer from './Timer';
import CardBoard from './CardBoard';
import { prepareSlots } from './actions';

const initialState = { started: false, slots: new Map(), startedAt: null, penalty: 0 };

const startingCardsValues = ['z', 'o', 'o', 'v', 'u'];

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [name, setName] = useState('Artur');

	useEffect(() => {
		if (name) {
			dispatch(prepareSlots({ cards: startingCardsValues }));
		}
	}, [name]);

	useEffect(() => {
		// check win after every slots change
	}, [state]);

	return (
		<div className="App">
			<Timer started={state.started} penalty={state.penalty} startedAt={state.startedAt} />
			<CardBoard slots={state.slots} dispatch={dispatch} started={state.started} />
		</div>
	);
}

export default App;
