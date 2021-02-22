import { useEffect, useState } from 'react';

export const useDebounce = (value: string, callback: () => void, debounceDuration: number) => {
    const [timer, setTimer] = useState<NodeJS.Timer | undefined>();

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }

        setTimer(
            setTimeout(() => {
                callback();
            }, debounceDuration),
        );
    }, [value]);
};
