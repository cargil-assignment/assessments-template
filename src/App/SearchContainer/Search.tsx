import type { FC } from 'react';
import React, { useState } from 'react';

import { useDebounce } from '../../utils/useDebounce';

import { SearchIcon } from './SearchIcon';

interface Props {
    initialValue: string;
    onChange: (nextValue: string) => void;
}

const DEBOUNCE_DURATION = 500;

export const Search: FC<Props> = ({ initialValue = '', onChange }) => {
    const [value, setValue] = useState(initialValue);
    useDebounce(value, () => onChange(value), DEBOUNCE_DURATION);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
    };

    return (
        <div className="flex-1 pr-4">
            <div className="relative md:w-1/2">
                <input
                    id="search"
                    type="search"
                    className="w-96 pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-gray-600 focus:shadow-outline text-gray-600 font-medium "
                    placeholder="Search by country or country code"
                    aria-label="search"
                    value={value}
                    onChange={handleOnChange}
                    data-cy="search-input"
                />
                <div className="absolute top-0 left-0 inline-flex items-center p-2">
                    <SearchIcon />
                </div>
            </div>
        </div>
    );
};
