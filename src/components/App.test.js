import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders input field when name is not set', () => {
	const { getByPlaceholderText } = render(<App />);

	const inputElement = getByPlaceholderText(/name here/i);

	expect(inputElement).toBeInTheDocument();
});

test('renders game screen when name is provided', () => {
	const { getByPlaceholderText, getByText } = render(<App />);

	const inputElement = getByPlaceholderText(/name here/i);

	fireEvent.change(inputElement, { target: { value: 'Artur' } });

	const button = getByText(/Let's go/i);

	fireEvent.click(button);

	const welcomeMessage = getByText('Good luck, Artur!');

	expect(welcomeMessage).toBeInTheDocument();
});
