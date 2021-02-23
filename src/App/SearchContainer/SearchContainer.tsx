import type { FC } from 'react';
import React from 'react';

import type { Country } from '../../api';

import { SearchCount } from './SearchCount';
import { Search } from './Search';

interface Props {
    initialValue: string;
    onChange: (nextValue: string) => void;
    countries: Country[];
}

export const SearchContainer: FC<Props> = ({ initialValue, onChange, countries }) => {
    return (
        <div className="flex items-center">
            <Search initialValue={initialValue} onChange={onChange} />
            <SearchCount countries={countries} />
        </div>
    );
};
