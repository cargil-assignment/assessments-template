import React from 'react';

import { SearchContainer } from './SearchContainer';
import { useCountries } from './useCountries';
import { useURLSearchFilter } from './useURLSearchFilter';
import { CountryList } from './CountryList';
import { useSort } from './useSort';

export function App() {
    const [searchFilter, setURLSearchFilter] = useURLSearchFilter();
    const [sort, toggleSort] = useSort();
    const { countries = [], isPending, error } = useCountries({
        searchFilter,
        sort,
    });

    return (
        <>
            <SearchContainer
                initialValue={searchFilter}
                onChange={setURLSearchFilter}
                countries={countries}
            />
            <CountryList
                countries={countries}
                isPending={isPending}
                error={error}
                onSort={toggleSort}
                sort={sort}
            />
        </>
    );
}
