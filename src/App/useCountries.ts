import { useQuery } from '../api-utils/useQuery';
import { Country } from '../api/typings';
import { fetchAll, fetchByCode, fetchByName, shouldFetchByCode } from '../api/countriesApiService';

import { sortCountriesIfNeeded } from './sortService';
import { Sort } from './useSort';

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
