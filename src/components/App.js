import React, { useState, useEffect, useReducer } from 'react';
import './App.css';

import reducer, { initialState } from '../reducer';
import { refreshAction, finishAction } from '../actions';

import Timer from './Timer';
import CardBoard from './CardBoard';

const startingCardsValues = ['z', 'o', 'o', 'v', 'u'];

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [name, setName] = useState('Artur');

	useEffect(() => {
		if (name) {
			dispatch(refreshAction({ cards: startingCardsValues }));
		}
	}, [name]);

	useEffect(() => {
		if (state.started) {
			const isSolved = [...state.solution.entries()].every(([key, value]) => {
				return state.slots.get(key) === value;
			});

			if (isSolved) {
				dispatch(finishAction());
			}
		}
	}, [state.slots, state.solution, state.started]);

	return (
		<div className="App">
			<Timer
				started={state.started}
				finished={state.finished}
				penalty={state.penalty}
				startedAt={state.startedAt}
			/>
			<CardBoard slots={state.slots} dispatch={dispatch} started={state.started} />
		</div>
	);
}

export default App;
