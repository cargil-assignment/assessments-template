import type { FC } from 'react';
import React from 'react';

import type { Country } from '../../api';

import { SearchCount } from './SearchCount';
import { Search } from './Search';

interface Props {
    URLSearchFilter: string;
    onChange: (nextValue: string) => void;
    countries: Country[];
}

export const SearchContainer: FC<Props> = ({ URLSearchFilter, onChange, countries }) => {
    return (
        <div className="flex items-center">
            <Search URLSearchFilter={URLSearchFilter} onChange={onChange} />
            <SearchCount countries={countries} />
        </div>
    );
};
