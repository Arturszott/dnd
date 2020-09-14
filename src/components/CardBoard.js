import React, { useState, useMemo } from 'react';
import './App.css';

import Card from './Card';
import { moveCardAction, startAction } from '../actions';
import { isTopSlot, isBottomSlot } from '../helpers';

function renderSlotsFromEntries(entries, otherProps) {
	return entries.map(([key, value]) => <Card key={key} slotKey={key} value={value} {...otherProps} />);
}

export default React.memo(function CardBoard({ dispatch, slots, started }) {
	const [draggedCard, setDraggedCard] = useState(null);
	const onCardDragged = (value) => {
		setDraggedCard(value);

		if (!started) {
			dispatch(startAction());
		}
	};

	const makeMove = (slotKey) => {
		dispatch(moveCardAction({ from: draggedCard, to: slotKey }));
	};

	const { topSlotEntries, bottomSlotEntries } = useMemo(() => {
		const allSlotsEntries = [...slots.entries()];

		return {
			topSlotEntries: allSlotsEntries.filter(([key, value]) => isTopSlot(key)),
			bottomSlotEntries: allSlotsEntries.filter(([key, value]) => isBottomSlot(key))
		};
	}, [slots]);

	const otherProps = {
		makeMove,
		onCardDragged
	};

	const topSlots = renderSlotsFromEntries(topSlotEntries, otherProps);
	const bottomSlots = renderSlotsFromEntries(bottomSlotEntries, otherProps);

	return (
		<div className="cardBoard">
			<div className="row">{topSlots}</div>
			<div className="row">{bottomSlots}</div>
		</div>
	);
});
