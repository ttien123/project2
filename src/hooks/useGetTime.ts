import { useEffect, useState } from 'react';

const useGetTime = (hours: number, minutes: number, seconds: number) => {
    const [timeRemaining, setTimeRemaining] = useState({ hours, minutes, seconds });
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => {
                const { hours, minutes, seconds } = prevTime;

                if (hours === 0 && minutes === 0 && seconds === 0) {
                    clearInterval(timer);
                    return { hours, minutes, seconds };
                }

                const newSeconds = seconds === 0 ? 59 : seconds - 1;
                const newMinutes = newSeconds === 59 ? minutes - 1 : minutes;
                const newHours = newMinutes === -1 ? hours - 1 : hours;

                return { hours: newHours, minutes: newMinutes >= 0 ? newMinutes : 59, seconds: newSeconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [hours, minutes, seconds]);

    return { totalSeconds, timeRemaining };
};

export default useGetTime;
