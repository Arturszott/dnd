export default function reducer(state, action) {
	switch (action.type) {
		case 'prepareSlots':
			const startingSlots = new Map();

			action.payload.cards.forEach((value, i) => {
				startingSlots.set(`t${i}`, value);
				startingSlots.set(`b${i}`, null);
			});

			return {
				...state,
				slots: startingSlots
			};
		case 'start':
			return {
				...state,
				startedAt: Date.now(),
				started: true
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
