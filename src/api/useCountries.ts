import { useQuery } from '../api-utils/useQuery';

import { Country } from './typings';
import { fetchAll, fetchByCode, fetchByName, shouldFetchByCode } from './countriesApiService';

interface UseCountriesOptions {
    searchFilter: string;
}
export const useCountries = ({ searchFilter }: UseCountriesOptions) => {
    const queryState = useQuery<Country[]>(searchFilter, async () => {
        if (!searchFilter) {
            return fetchAll();
        }

        if (shouldFetchByCode(searchFilter)) {
            return fetchByCode(searchFilter);
        }

        return fetchByName(searchFilter);
    });

    return {
        ...queryState,
        countries: queryState.data,
    };
};
