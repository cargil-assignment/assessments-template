import axios, { AxiosError } from 'axios';

import { Country } from './typings';

const ALPHA_2_CODE_LENGTH = 2;
const ALPHA_3_CODE_LENGTH = 3;
const ALL_BASE_URL = 'https://restcountries.eu/rest/v2/all';
const BY_NAME_BASE_URL = 'https://restcountries.eu/rest/v2/name';
const BY_CODE_BASE_URL = 'https://restcountries.eu/rest/v2/alpha';

type BaseUrl = typeof ALL_BASE_URL | typeof BY_NAME_BASE_URL | typeof BY_CODE_BASE_URL;

const FIELDS = 'name;alpha3Code;capital;population;flag;languages;currencies';

export async function fetchAll(): Promise<Country[]> {
    const response = await axios.get<Country[]>(getUrl(ALL_BASE_URL)).catch(throwErrorMessage);

    return response.data;
}

export async function fetchByName(searchFilter: string): Promise<Country[]> {
    const response = await axios
        .get<Country[]>(getUrl(BY_NAME_BASE_URL, searchFilter))
        .catch(throwErrorMessage);

    return response.data;
}

export async function fetchByCode(searchFilter: string): Promise<Country[]> {
    const response = await axios
        .get<Country>(getUrl(BY_CODE_BASE_URL, searchFilter))
        .catch(throwErrorMessage);

    return [response.data];
}

function getUrl(baseUrl: BaseUrl, queryKey?: string): string {
    if (!queryKey) {
        return `${baseUrl}?fields=${FIELDS}`;
    }

    return `${baseUrl}/${queryKey}?fields=${FIELDS}`;
}

export function shouldFetchByCode(searchFilter: string): boolean {
    if (searchFilter.length === ALPHA_2_CODE_LENGTH) {
        return true;
    }

    if (searchFilter.length === ALPHA_3_CODE_LENGTH) {
        return true;
    }

    return false;
}

function throwErrorMessage(error: AxiosError): never {
    if (error.response?.data?.message) {
        throw error?.response?.data?.message;
    }

    throw error;
}
