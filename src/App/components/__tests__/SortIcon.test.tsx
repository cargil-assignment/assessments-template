import React from 'react';
import { render, screen } from '@testing-library/react';

import { SortIcon } from '../SortIcon';

describe('<SortIcon/>', () => {
    it('shows nothing when sortOrder is unknown', () => {
        // @ts-expect-error unknown sortOrder
        const { container } = render(<SortIcon sortOrder="TYPO" />);

        expect(container.firstChild).toBeNull();
    });

    it('shows a desc-sort-icon when sortOrder is DESC', () => {
        render(<SortIcon sortOrder="DESC" />);

        expect(screen.queryByTestId('desc-sort-icon')).toBeInTheDocument();
    });

    it('shows an ASC-sort-icon when sortOrder is ASC', () => {
        render(<SortIcon sortOrder="ASC" />);

        expect(screen.queryByTestId('asc-sort-icon')).toBeInTheDocument();
    });
});
