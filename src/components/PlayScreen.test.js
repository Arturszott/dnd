import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import PlayScreen from './PlayScreen';

const cards = ['t', 'e', 's', 't'];

beforeEach(() => {
	jest.useFakeTimers();
});

afterEach(() => {
	jest.useRealTimers();
});

test('renders game screen with two slots for every card and empty score', () => {
	const { getAllByTestId, getByText } = render(<PlayScreen startingCardsValues={cards} name={'Artur'} />);

	const slots = getAllByTestId('slot');
	const score = getByText('Your score: 0 seconds');

	expect(slots).toHaveLength(8);
	expect(score).toBeInTheDocument();
});

test('starts the game and timer score when card is dragged', () => {
	const { getAllByText, getByText } = render(<PlayScreen startingCardsValues={cards} name={'Artur'} />);

	const card = getAllByText('t')[0];
	const oldDateNow = Date.now;

	act(() => {
		fireEvent.dragStart(card);

		// flaky, might break if next Date.now() usage will be introduced but checks well current implementation
		Date.now = jest
			.fn()
			.mockReturnValueOnce(Date.now())
			.mockReturnValueOnce(Date.now() + 1000)
			.mockReturnValue(Date.now() + 2000);

		jest.advanceTimersByTime(1000);
	});

	getByText('Your score: 1 seconds');

	Date.now = oldDateNow;
});

test('adds penalty when card is dragged into wrong spot', () => {
	const customCards = ['t', 'o'];
	const { getByText, getAllByTestId } = render(<PlayScreen startingCardsValues={customCards} name={'Artur'} />);
	const firstSlotWithoutCardIndex = 2;

	act(() => {
		const slot = getAllByTestId('slot')[firstSlotWithoutCardIndex];
		const card = getByText('o');

		fireEvent.dragStart(card);

		// delay event to simulate user behaviour and state updates
		setTimeout(() => {
			fireEvent.drop(slot);
			getByText('Your score: 10 seconds');
		}, 200);
	});
});

test('adds no penalty when card is dragged into correct spot', () => {
	const customCards = ['t', 'o'];
	const { getByText, getAllByTestId } = render(<PlayScreen startingCardsValues={customCards} name={'Artur'} />);
	const firstSlotWithoutCardIndex = 2;

	act(() => {
		const slot = getAllByTestId('slot')[firstSlotWithoutCardIndex];
		const card = getByText('t');

		fireEvent.dragStart(card);

		// delay event to simulate user behaviour and state updates
		setTimeout(() => {
			fireEvent.drop(slot);
			getByText('Your score: 0 seconds');
		}, 200);
	});
});

test('finishes game when all cards are matched to their slots', () => {
	const customCards = ['t'];
	const { getByText, getAllByTestId } = render(<PlayScreen startingCardsValues={customCards} name={'Artur'} />);
	const firstSlotWithoutCardIndex = 1;

	act(() => {
		const slot = getAllByTestId('slot')[firstSlotWithoutCardIndex];
		const card = getByText('t');

		fireEvent.dragStart(card);

		// delay event to simulate user behaviour and state updates
		setTimeout(() => {
			fireEvent.drop(slot);
			getByText('Game will restart in 10 seconds...');
		}, 200);
	});
});

test('restarts finished game after 10 seconds', () => {
	const customCards = ['t'];
	const { getByText, getAllByTestId, queryByText } = render(
		<PlayScreen startingCardsValues={customCards} name={'Artur'} />
	);
	const firstSlotWithoutCardIndex = 1;

	act(() => {
		const slot = getAllByTestId('slot')[firstSlotWithoutCardIndex];
		const card = getByText('t');

		fireEvent.dragStart(card);

		// delay event to simulate user behaviour and state updates
		setTimeout(() => {
			fireEvent.drop(slot);
			expect(queryByText('Game will restart in 10 seconds...')).toBeTruthy();

			jest.advanceTimersByTime(10000);

			expect(queryByText('Game will restart in 10 seconds...')).toBeFalsy();
		}, 200);
	});
});
