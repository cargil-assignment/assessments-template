import React, { useState } from 'react';
import { act, render, screen } from '@testing-library/react';

import { useDebounce } from '../useDebounce';

jest.useFakeTimers('modern');

describe('useDebounce', () => {
    it('invokes the callback when the time since the last time the value has changed is at least equal to the debounceDuration', () => {
        const callbackSpy = jest.fn();
        function Component() {
            const [value, setValue] = useState('');
            useDebounce(value, callbackSpy, 1000);
            return (
                <button
                    type="button"
                    data-cy="btn"
                    onClick={() => setValue((prevValue) => `${prevValue}l`)}
                >
                    {value}
                </button>
            );
        }

        render(<Component />);

        screen.queryByTestId('btn')?.click();

        act(() => {
            jest.runAllTimers();
        });

        expect(callbackSpy).toHaveBeenCalledTimes(1);
    });
});
