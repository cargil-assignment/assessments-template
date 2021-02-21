import { useReducer } from 'react';

import { queryParamService } from '../utils/queryParamService';

type HandleSearchValue = (nextSearchFilterValue: string) => void;

export const useURLSearchFilter = (): [string, HandleSearchValue] => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const { queryParams, setQueryParams } = queryParamService<{ filter: string }>();

    const handleUpdateURLSearchValue = (nextSearchFilterValue: string) => {
        setQueryParams({
            filter: nextSearchFilterValue,
        });
        forceUpdate();
    };

    return [queryParams.filter, handleUpdateURLSearchValue];
};
