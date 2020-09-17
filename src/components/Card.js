import React from 'react';

import './Card.css';

import Z from './svgs/Z';
import O from './svgs/O';
import V from './svgs/V';
import U from './svgs/U';

const preventDefault = (event) => {
	event.preventDefault();
};

const letterToComponent = {
	z: Z,
	o: O,
	v: V,
	u: U
};

export default React.memo(function Card({ value, slotKey, makeMove, onCardDragged }) {
	const Component = letterToComponent[value];

	return (
		<div
			data-key={slotKey}
			data-value={value}
			data-testid={'slot'}
			draggable={Boolean(value)}
			className={'slot ' + (value ? 'has-card' : '')}
			onDragOver={preventDefault}
			onDragEnter={preventDefault}
			onDragLeave={preventDefault}
			onDragStart={() => {
				onCardDragged(slotKey);
			}}
			onDragEnd={() => {
				onCardDragged(null);
			}}
			onDrop={() => {
				makeMove(slotKey);
			}}
		>
			{Component ? <Component /> : value}
		</div>
	);
});
