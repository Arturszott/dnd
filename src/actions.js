import { actionTypes } from './constants';

export const moveCardAction = ({ from, to }) => {
	return {
		type: actionTypes.MOVE,
		payload: { from, to }
	};
};

export const startAction = () => {
	return {
		type: actionTypes.START
	};
};

export const finishAction = () => {
	return {
		type: actionTypes.FINISH
	};
};

export const refreshAction = ({ cards }) => {
	return {
		type: actionTypes.REFRESH,
		payload: { cards }
	};
};
