import type { FC } from 'react';
import React from 'react';

import type { SortStates } from '../useSort';

interface Props {
    sortOrder: SortStates;
}

export const SortIcon: FC<Props> = ({ sortOrder }) => {
    if (sortOrder === 'DESC') {
        return (
            <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                fill="grey"
                stroke="grey"
                viewBox="0 0 24 24"
                data-cy="desc-sort-icon"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                />
            </svg>
        );
    }

    if (sortOrder === 'ASC') {
        return (
            <svg
                width={20}
                xmlns="http://www.w3.org/2000/svg"
                fill="grey"
                stroke="grey"
                viewBox="0 0 24 24"
                data-cy="asc-sort-icon"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                />
            </svg>
        );
    }

    return null;
};
