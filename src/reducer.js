import { isBottomSlot, shuffle } from './helpers';

export const initialState = {
	started: false,
	finished: false,
	slots: new Map(),
	startedAt: null,
	penalty: 0,
	finalScore: null
};

export default function reducer(state, action) {
	switch (action.type) {
		case 'refresh':
			const startingSlots = new Map();
			const solution = new Map();

			shuffle(action.payload.cards.slice(0)).forEach((value, i) => {
				startingSlots.set(`t${i}`, value);
				startingSlots.set(`b${i}`, null);
			});
			action.payload.cards.forEach((value, i) => {
				solution.set(`b${i}`, value);
			});

			return {
				...initialState,
				solution,
				slots: startingSlots
			};
		case 'start':
			return {
				...state,
				startedAt: Date.now(),
				started: true
			};
		case 'finish':
			return {
				...state,
				finalScore: state.penalty + (Date.now() - state.startedAt) / 10,
				finished: true
			};
		case 'move':
			const { from, to } = action.payload;
			const slotsCopy = new Map(state.slots.entries());

			slotsCopy.set(from, state.slots.get(to));
			slotsCopy.set(to, state.slots.get(from));

			const penalty = isBottomSlot(to) && state.solution.get(to) !== state.slots.get(from) ? 10 : 0;

			return {
				...state,
				penalty: state.penalty + penalty,
				slots: slotsCopy
			};

		default:
			throw new Error('Action type not recognized. Fix it before users will see that!');
	}
}
