import React, { useState, useEffect, useCallback } from 'react';

export default React.memo(function Timer({ penalty, started, startedAt }) {
	const [time, setTime] = useState(0);
	const [clock, setClock] = useState(null);

	const passTime = useCallback(() => {
		setTime(penalty + (Date.now() - startedAt) / 1000);
	}, [penalty, startedAt]);

	useEffect(() => {
		if (started && !clock) {
			setClock(setInterval(passTime, 1000));
		}

		return () => {
			clearInterval(clock);
		};
	}, [clock, passTime, started]);

	return <span>Your score: {Math.floor(time)} seconds</span>;
});
