import React from 'react';

const preventDefault = (event) => {
	event.preventDefault();
};

export default React.memo(function Card({ value, slotKey, makeMove, onCardDragged }) {
	return (
		<div
			data-key={slotKey}
			draggable={Boolean(value)}
			className={value ? 'card' : 'slot'}
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
