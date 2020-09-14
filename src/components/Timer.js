import React, { useState, useEffect, useCallback } from 'react';

import './Timer.css';

export default React.memo(function Timer({ penalty, started, finished, startedAt }) {
	const [time, setTime] = useState(0);
	const [clock, setClock] = useState(null);

	const passTime = useCallback(() => {
		setTime((Date.now() - startedAt) / 1000);
	}, [startedAt]);

	useEffect(() => {
		if (started && !clock) {
			setClock(setInterval(passTime, 1000));
		}

		return () => {
			clearInterval(clock);
		};
	}, [clock, passTime, started, finished]);

	useEffect(() => {
		setTime(0);
	}, [finished]);

	return (
		<span className="Timer">
			<span className="icon" role="img" aria-label="clock">
				⏰
			</span>{' '}
			Your score: {penalty + Math.floor(time)} seconds
		</span>
	);
});
