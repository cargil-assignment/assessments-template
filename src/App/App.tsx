import React from 'react';

import { useCountries } from '../api';

import { CountryList } from './CountryList';
import { Search } from './Search';
import { useURLSearchFilter } from './useURLSearchFilter';

export function App() {
    const [searchFilter, setURLSearchFilter] = useURLSearchFilter();
    const { countries = [], isPending, error } = useCountries({ searchFilter });

    return (
        <>
            <Search initialValue={searchFilter} onChange={setURLSearchFilter} />
            <CountryList countries={countries} isPending={isPending} error={error} />
        </>
    );
}
