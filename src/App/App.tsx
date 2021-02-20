import React from 'react';

import { useCountries } from '../api';

import { CountryList } from './CountryList';

export function App() {
    const { countries = [], isPending, error } = useCountries();

    if (isPending) {
        return <div>Loading, please wait.</div>;
    }

    if (error) {
        return (
            <div data-cy="countries-fetch-error">
                An error has occurred when loading the countries. Sorry!
            </div>
        );
    }

    return <CountryList countries={countries} />;
}
