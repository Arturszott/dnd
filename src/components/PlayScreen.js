import React, { useReducer, useEffect } from 'react';

import CardBoard from './CardBoard';
import Timer from './Timer';

import reducer, { initialState } from '../reducer';
import { refreshAction, finishAction } from '../actions';

import './PlayScreen.css';

export default React.memo(function PlayScreen({ startingCardsValues, name }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch(refreshAction({ cards: startingCardsValues }));
	}, [startingCardsValues]);

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
		<div className="PlayScreen">
			<div className="top-bar">
				<h1>Good luck, {name}!</h1>{' '}
				<Timer
					started={state.started}
					finished={state.finished}
					penalty={state.penalty}
					startedAt={state.startedAt}
				/>
			</div>
			<CardBoard slots={state.slots} dispatch={dispatch} started={state.started} />
		</div>
	);
});
