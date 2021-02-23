import React, { FC } from 'react';

import type { Country } from '../../api';
import { Table, TableBody } from '../components';
import { Sort, SortableColumns } from '../useSort';

import { CountryListContent } from './CountryListContent';

interface Props {
    countries: Country[];
    isPending: boolean;
    error: unknown;
    sort?: Sort;
    onSort: (sortColumn: SortableColumns) => void;
}

export const CountryList: FC<Props> = ({ countries, isPending, error, onSort, sort }) => {
    const columns = [
        {
            label: 'Name',
            id: 'name',
            onClick: () => onSort('name'),
        },
        {
            label: 'Country code',
            id: 'alpha3Code',
            onClick: () => onSort('alpha3Code'),
        },
        {
            label: 'Population',
            id: 'population',
            onClick: () => onSort('population'),
        },
    ];

    return (
        <Table columns={columns} sort={sort}>
            <TableBody>
                <CountryListContent countries={countries} isPending={isPending} error={error} />
            </TableBody>
        </Table>
    );
};
