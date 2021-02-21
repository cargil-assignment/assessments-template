import React from 'react';

import { useCountries } from '../api';

import { Search } from './Search';
import { useURLSearchFilter } from './useURLSearchFilter';
import { CountryList } from './CountryList';

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
