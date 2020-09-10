import React, { useState, useEffect, useReducer } from 'react';
import './App.css';

const moveCardAction = ({ from, to }) => {
	return {
		type: 'move',
		payload: { from, to }
	};
};

const startAction = ({ cards }) => {
	return {
		type: 'start',
		payload: { cards }
	};
};
const initialState = { started: false, topSlots: [], bottomSlots: [] };

function reducer(state, action) {
	switch (action.type) {
		case 'start':
			return {
				...state,
				topSlots: action.payload.cards.slice(0),
				bottomSlots: action.payload.cards.map(() => '')
			};
		case 'move':
			return {
				...state,
				topSlots: state.topSlots.map((previousValue, i) => (i === action.payload.from ? '' : previousValue)),
				bottomSlots: state.bottomSlots.map((previousValue, i) =>
					i === action.payload.to ? state.topSlots[action.payload.from] : previousValue
				)
			};
		default:
			throw new Error('Action type not recognized. Fix it before users will see that!');
	}
}

const startingCardsValues = ['z', 'o', 'o', 'v', 'u'];

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [name, setName] = useState('Artur');
	const [draggedCard, setDraggedCard] = useState(null);

	useEffect(() => {
		if (name) {
			dispatch(startAction({ cards: startingCardsValues }));
		}
	}, [name]);

	useEffect(() => {
		// check win after every slots change
	}, [state]);

	return (
		<div className="App">
			<div className="cardBoard">
				<div className="row">
					{state.topSlots.map((slot, i) => (
						<div
							draggable={Boolean(slot)}
							className={slot ? 'card' : 'slot'}
							key={i}
							onDragStart={() => {
								setDraggedCard(i);
							}}
							onDragEnter={(event) => {
								event.preventDefault();
							}}
							onDragEnd={() => {
								setDraggedCard(null);
							}}
						>
							{slot}
						</div>
					))}
				</div>
				<div className="row">
					{state.bottomSlots.map((slot, i) => (
						<div
							draggable={Boolean(slot)}
							className={slot ? 'card' : 'slot'}
							key={i}
							onDragOver={(event) => {
								event.preventDefault();
							}}
							onDragEnter={(event) => {
								console.log('enter');
								event.preventDefault();
							}}
							onDragLeave={(event) => {
								console.log('leave');
								event.preventDefault();
							}}
							onDrop={(event) => {
								// console.log(event.target);
								dispatch(moveCardAction({ from: draggedCard, to: i }));
								console.log('drop?', i);
							}}
						>
							{slot}
						</div>
					))}
				</div>
			</div>
			<div></div>
		</div>
	);
}

export default App;
