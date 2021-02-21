import React, { FC } from 'react';

import { Country } from '../../api';
import { Table } from '../components/Table';
import { TableBody } from '../components/TableBody';

import { CountryListContent } from './CountryListContent';

interface Props {
    countries: Country[];
    isPending: boolean;
    error: unknown;
}

const columns = [
    {
        label: 'Name',
        id: 'name',
    },
    {
        label: 'Country code',
        id: 'code',
    },
    {
        label: 'Population',
        id: 'population',
    },
];

export const CountryList: FC<Props> = ({ countries, isPending, error }) => {
    return (
        <Table columns={columns}>
            <TableBody>
                <CountryListContent countries={countries} isPending={isPending} error={error} />
            </TableBody>
        </Table>
    );
};
