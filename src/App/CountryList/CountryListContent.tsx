import type { FC } from 'react';
import React from 'react';

import { Country } from '../../api';
import { TableCell } from '../components/TableCell';

import { CountriesListItem } from './CountryListItem';

interface Props {
    countries: Country[];
    isPending: boolean;
    error: unknown;
}

export const CountryListContent: FC<Props> = ({ countries, isPending, error }) => {
    if (isPending) {
        return (
            <tr>
                <TableCell>
                    <div className="">Loading, please wait.</div>
                </TableCell>
            </tr>
        );
    }

    if (error) {
        const errorMessage =
            typeof error === 'string'
                ? error
                : 'An error has occurred when loading the countries. Sorry!';

        return (
            <tr>
                <TableCell>
                    <div className="mt-3" data-cy="countries-fetch-error">
                        {errorMessage}
                    </div>
                </TableCell>
            </tr>
        );
    }

    return (
        <>
            {countries.map((country) => (
                <CountriesListItem key={country.alpha3Code} country={country} />
            ))}
        </>
    );
};
