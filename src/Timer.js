import React, { useState, useEffect, useCallback } from 'react';

export default React.memo(function Timer({ penalty, started, startedAt }) {
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
	}, [clock, passTime, started]);

	return <span>Your score: {penalty + Math.floor(time)} seconds</span>;
});
