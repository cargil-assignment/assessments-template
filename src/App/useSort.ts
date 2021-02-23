import { useReducer } from 'react';

import { queryParamService } from '../utils';

type HandleSortPopulation = (sortColumn: SortableColumns) => void;

export type SortStates = undefined | 'ASC' | 'DESC';
export type SortableColumns = 'name' | 'alpha3Code' | 'population';
export interface Sort {
    sortColumn: SortableColumns;
    sortOrder: SortStates;
}

export const useSort = (): [Sort | undefined, HandleSortPopulation] => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const { queryParams, setQueryParams } = queryParamService<{
        sort: string;
    }>();

    const handleSortPopulation: HandleSortPopulation = (sortColumn: SortableColumns) => {
        setQueryParams({
            sort:
                queryParams.sort === `${sortColumn}+ASC`
                    ? `${sortColumn}+DESC`
                    : `${sortColumn}+ASC`,
        });
        forceUpdate();
    };

    if (queryParams.sort === undefined) {
        return [undefined, handleSortPopulation];
    }

    const [sortColumn, sortOrder] = queryParams.sort.split('+');

    return [
        { sortColumn: sortColumn as SortableColumns, sortOrder: sortOrder as SortStates },
        handleSortPopulation,
    ];
};
