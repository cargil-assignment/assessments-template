import axios from 'axios';

import { fetchAll, fetchByCode, fetchByName, shouldFetchByCode } from '../countriesApiService';

jest.mock('axios');

const getMock = axios.get as jest.Mock;

describe('countriesApiService', () => {
    describe('fetchAll', () => {
        it('fetches and returns the full list of countries', async () => {
            const data = [{ name: 'Switzerland' }, { name: 'italy' }];
            getMock.mockResolvedValueOnce({ data });

            const actual = await fetchAll();

            expect(actual).toEqual(data);
        });

        it('calls the "all" endpoint', async () => {
            const data = [{ name: 'Switzerland' }, { name: 'italy' }];
            getMock.mockResolvedValueOnce({ data });

            await fetchAll();

            expect(getMock).toHaveBeenCalledWith(
                expect.stringContaining('https://restcountries.eu/rest/v2/all'),
            );
        });

        it('throws an error with the API error message', async () => {
            getMock.mockRejectedValueOnce({ response: { data: { message: 'Not Found' } } });

            expect(() => fetchAll()).rejects.toBe('Not Found');
        });

        it('throws an error when the error is unknown', async () => {
            const error = new Error('hi');
            getMock.mockRejectedValueOnce(error);

            expect(() => fetchAll()).rejects.toBe(error);
        });
    });

    describe('fetchByName', () => {
        it('fetches by the given country name', async () => {
            const data = [{ name: 'Switzerland' }, { name: 'Swaziland' }];
            getMock.mockResolvedValueOnce({ data });

            const actual = await fetchByName('Sw');

            expect(actual).toEqual(data);
        });

        it('calls the "name" endpoint', async () => {
            const data = [{ name: 'Switzerland' }, { name: 'Swaziland' }];
            getMock.mockResolvedValueOnce({ data });

            await fetchByName('Sw');

            expect(getMock).toHaveBeenCalledWith(
                expect.stringContaining('https://restcountries.eu/rest/v2/name/Sw'),
            );
        });

        it('throws an error with the API error message', async () => {
            getMock.mockRejectedValueOnce({ response: { data: { message: 'Not Found' } } });

            expect(() => fetchByName('Sw')).rejects.toBe('Not Found');
        });
    });

    describe('fetchByCode', () => {
        it('fetches by the given "country code" and returns the result in an array', async () => {
            const data = { name: 'Switzerland', alpha3Code: 'CHE' };
            getMock.mockResolvedValueOnce({ data });

            const actual = await fetchByCode('Sw');

            expect(actual).toEqual([data]);
        });

        it('calls "country code" endpoint', async () => {
            const data = { name: 'Switzerland', alpha3Code: 'CHE' };
            getMock.mockResolvedValueOnce({ data });

            await fetchByCode('Sw');

            expect(getMock).toHaveBeenCalledWith(
                expect.stringContaining('https://restcountries.eu/rest/v2/alpha/Sw'),
            );
        });

        it('throws an error with the API error message', async () => {
            getMock.mockRejectedValueOnce({ response: { data: { message: 'Not Found' } } });

            expect(() => fetchByCode('Sw')).rejects.toBe('Not Found');
        });
    });

    describe('shouldFetchByCode', () => {
        it('returns true when the searchFilter has a length of 2', () => {
            expect(shouldFetchByCode('AT')).toBe(true);
        });

        it('returns true when the searchFilter has a length of 3', () => {
            expect(shouldFetchByCode('AUT')).toBe(true);
        });

        it('returns false for any length other than 2 or 3', () => {
            expect(shouldFetchByCode('')).toBe(false);
            expect(shouldFetchByCode('A')).toBe(false);
            expect(shouldFetchByCode('France')).toBe(false);
            expect(shouldFetchByCode('Italy')).toBe(false);
        });
    });
});
