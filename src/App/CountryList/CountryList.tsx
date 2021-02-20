import React, { FC } from 'react';

import { Country } from '../../api';

import { CountriesListItem } from './CountryListItem';
import { CountriesListEmpty } from './CountryListEmpty';

interface Props {
    countries: Country[];
}

export const CountryList: FC<Props> = ({ countries }) => {
    if (countries.length === 0) {
        return <CountriesListEmpty />;
    }

    return (
        <>
            {countries.map((country) => (
                <CountriesListItem key={country.alpha2Code} country={country} />
            ))}
        </>
    );
};
