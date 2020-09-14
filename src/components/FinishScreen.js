import React from 'react';

import './FinishScreen.css';

const getMessage = (score) => {
	if (score > 100) {
		return 'Nice, nice. How about you play again seriously this time?';
	}

	if (score > 50) {
		return 'Certainly not the best';
	}

	if (score > 15) {
		return 'Not bad!';
	}

	if (score > 5) {
		return 'Almost perfect, but there is place for improvement';
	}

	return 'Thank you for making the logo great again!';
};

export default React.memo(function FinishScreen({ name, score }) {
	return (
		<div className="FinishScreen">
			<h1>
				It's over, {name}. Score: {score}. <br />
				{getMessage(score)}
			</h1>
			<p>Game will restart in 10 seconds...</p>
		</div>
	);
});
