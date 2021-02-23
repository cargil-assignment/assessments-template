import { render, screen } from '@testing-library/react';
import React from 'react';

import { Search } from '../Search';

describe('<Search/>', () => {
    it('synchronizes its internal input state to the URLSearchFilter when they get out of sync', () => {
        const { rerender } = render(<Search URLSearchFilter="initialValue" onChange={() => {}} />);
        rerender(<Search URLSearchFilter="nextValue" onChange={() => {}} />);

        expect(screen.getByTestId('search-input')).toHaveValue('nextValue');
    });
});
