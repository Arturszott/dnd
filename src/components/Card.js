import React from 'react';

import './Card.css';

const preventDefault = (event) => {
	event.preventDefault();
};

export default React.memo(function Card({ value, slotKey, makeMove, onCardDragged }) {
	return (
		<div
			data-key={slotKey}
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
			{value}
		</div>
	);
});
