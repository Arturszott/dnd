export const moveCardAction = ({ from, to }) => {
	return {
		type: 'move',
		payload: { from, to }
	};
};

export const startAction = () => {
	return {
		type: 'start'
	};
};

export const prepareSlots = ({ cards }) => {
	return {
		type: 'prepareSlots',
		payload: { cards }
	};
};
