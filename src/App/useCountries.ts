import { useQuery } from '../utils';
import type { Country } from '../api';
import { fetchAll, fetchByCode, fetchByName, shouldFetchByCode } from '../api';

import { sortCountriesIfNeeded } from './sortService';
import type { Sort } from './useSort';

interface UseCountriesOptions {
    searchFilter: string;
    sort?: Sort;
}
export const useCountries = ({ searchFilter, sort }: UseCountriesOptions) => {
    const { data, isPending, error } = useQuery<Country[]>(searchFilter, async () => {
        if (!searchFilter) {
            return fetchAll();
        }

        if (shouldFetchByCode(searchFilter)) {
            return fetchByCode(searchFilter);
        }

        return fetchByName(searchFilter);
    });

    return {
        countries: sortCountriesIfNeeded(data, sort),
        isPending,
        error,
    };
};
