import React from 'react';

import { SearchContainer } from './SearchContainer';
import { useCountries } from './useCountries';
import { useURLSearchFilter } from './useURLSearchFilter';
import { CountryList } from './CountryList';
import { useSort } from './useSort';

export function App() {
    const [URLSearchFilter, setURLSearchFilter] = useURLSearchFilter();
    const [sort, toggleSort] = useSort();
    const { countries = [], isPending, error } = useCountries({
        searchFilter: URLSearchFilter,
        sort,
    });

    return (
        <div className="container flex justify-center">
            <div className="w-full lg:w-4/6 shadow-lg rounded my-6">
                <div className="flex flex-col mx-auto">
                    <SearchContainer
                        URLSearchFilter={URLSearchFilter}
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
                </div>
            </div>
        </div>
    );
}
