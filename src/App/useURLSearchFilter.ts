import { useReducer } from 'react';

import { queryParamService } from '../utils/queryParamService';

type HandleSearchValue = (nextSearchFilterValue: string) => void;

export const useURLSearchFilter = (): [string, HandleSearchValue] => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const { queryParams, setQueryParams } = queryParamService<{ searchFilter: string }>();

    const handleUpdateURLSearchValue: HandleSearchValue = (nextSearchFilterValue) => {
        setQueryParams({
            searchFilter: nextSearchFilterValue,
        });
        forceUpdate();
    };

    return [queryParams.searchFilter, handleUpdateURLSearchValue];
};
