import type { FC } from 'react';
import React from 'react';

import type { Country } from '../../api';
import { TableCell } from '../components';

import { CountriesListItem } from './CountryListItem';

interface Props {
    countries: Country[];
    isPending: boolean;
    error: unknown;
}

const GENERIC_UNKNOWN_ERROR_MESSAGE = 'An error has occurred when loading the countries. Sorry!';

export const CountryListContent: FC<Props> = ({ countries, isPending, error }) => {
    if (isPending) {
        return (
            <tr>
                <TableCell>
                    <div className="mt-3">Loading, please wait.</div>
                </TableCell>
            </tr>
        );
    }

    if (error) {
        const showAPIErrorMessage = typeof error === 'string';
        const errorMessage = showAPIErrorMessage
            ? (error as string)
            : GENERIC_UNKNOWN_ERROR_MESSAGE;

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
