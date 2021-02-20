import axios from 'axios';

import { useQuery } from '../api-utils/useQuery';

import { Country } from './typings';

const COUNTRIES_ENDPOINT_URL = 'https://restcountries.eu/rest/v2/all';
const FIELDS = 'name;alpha2Code;capital;population;flag;languages;currencies';

export const useCountries = () => {
    const queryState = useQuery<Country[]>('defaultQueryKey', async () => {
        const { data } = await axios.get<Country[]>(`${COUNTRIES_ENDPOINT_URL}?fields=${FIELDS}`);

        return data;
    });

    return {
        ...queryState,
        countries: queryState.data,
    };
};
