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
const initialState = { started: false, slots: new Map(), lastAction: null };

function reducer(state, action) {
	switch (action.type) {
		case 'start':
			const startingSlots = new Map();

			action.payload.cards.forEach((value, i) => {
				startingSlots.set(`t${i}`, value);
				startingSlots.set(`b${i}`, null);
			});

			return {
				...state,
				slots: startingSlots
			};
		case 'move':
			const { from, to } = action.payload;
			const slotsCopy = new Map(state.slots.entries());

			slotsCopy.set(from, state.slots.get(to));
			slotsCopy.set(to, state.slots.get(from));

			return {
				...state,
				slots: slotsCopy
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
					{[...state.slots.entries()]
						.filter(([key, value]) => key.startsWith('t'))
						.map(([key, value], i) => (
							<div
								data-key={key}
								draggable={Boolean(value)}
								className={value ? 'card' : 'slot'}
								key={key}
								onDragOver={(event) => {
									event.preventDefault();
								}}
								onDragEnter={(event) => {
									event.preventDefault();
								}}
								onDragLeave={(event) => {
									event.preventDefault();
								}}
								onDragStart={() => {
									setDraggedCard(key);
								}}
								onDragEnd={() => {
									setDraggedCard(null);
								}}
								onDrop={(event) => {
									// console.log(event.target);
									dispatch(moveCardAction({ from: draggedCard, to: key }));
								}}
							>
								{value}
							</div>
						))}
				</div>
				<div className="row">
					{[...state.slots.entries()]
						.filter(([key, value]) => key.startsWith('b'))
						.map(([key, value]) => (
							<div
								data-key={key}
								draggable={Boolean(value)}
								className={value ? 'card' : 'slot'}
								key={key}
								onDragOver={(event) => {
									event.preventDefault();
								}}
								onDragEnter={(event) => {
									event.preventDefault();
								}}
								onDragLeave={(event) => {
									event.preventDefault();
								}}
								onDragStart={() => {
									setDraggedCard(key);
								}}
								onDragEnd={() => {
									setDraggedCard(null);
								}}
								onDrop={(event) => {
									// console.log(event.target);
									dispatch(moveCardAction({ from: draggedCard, to: key }));
								}}
							>
								{value}
							</div>
						))}
				</div>
			</div>
			<div></div>
		</div>
	);
}

export default App;
