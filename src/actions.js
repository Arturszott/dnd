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

export const finishAction = () => {
	return {
		type: 'finish'
	};
};

export const refreshAction = ({ cards }) => {
	return {
		type: 'refresh',
		payload: { cards }
	};
};
