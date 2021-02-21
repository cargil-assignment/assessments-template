import { sortCountriesIfNeeded } from '../sortService';
import { Country } from '../../api';
import { Sort } from '../useSort';

describe('sortService', () => {
    describe('sortCountriesIfNeeded', () => {
        it('does not sort when the sort is undefined', () => {
            const countries = [
                { name: 'Switzerland', population: 10 },
                { name: 'Italy', population: 100 },
            ] as Country[];

            expect(sortCountriesIfNeeded(countries, undefined)).toEqual([
                { name: 'Switzerland', population: 10 },
                { name: 'Italy', population: 100 },
            ]);
        });

        it('sorts the given countries by ascending population when sort is population+ASC', () => {
            const countries = [
                { name: 'Italy', population: 100 },
                { name: 'Switzerland', population: 10 },
            ] as Country[];
            const sort: Sort = { sortColumn: 'population', sortOrder: 'ASC' };

            expect(sortCountriesIfNeeded(countries, sort)).toEqual([
                { name: 'Switzerland', population: 10 },
                { name: 'Italy', population: 100 },
            ]);
        });

        it('sorts the given countries by descending population when sort is population+DESC', () => {
            const countries = [
                { name: 'Italy', population: 100 },
                { name: 'Switzerland', population: 10 },
            ] as Country[];
            const sort: Sort = { sortColumn: 'population', sortOrder: 'DESC' };

            expect(sortCountriesIfNeeded(countries, sort)).toEqual([
                { name: 'Italy', population: 100 },
                { name: 'Switzerland', population: 10 },
            ]);
        });

        it('sorts the given countries alphabetically when sort is name+DESC', () => {
            const countries = [
                { name: 'Switzerland', population: 10 },
                { name: 'Italy', population: 100 },
            ] as Country[];
            const sort: Sort = { sortColumn: 'name', sortOrder: 'DESC' };

            expect(sortCountriesIfNeeded(countries, sort)).toEqual([
                { name: 'Italy', population: 100 },
                { name: 'Switzerland', population: 10 },
            ]);
        });

        it('sorts the given countries in reverse alphabetic order when sort is name+ASC', () => {
            const countries = [
                { name: 'Switzerland', population: 10 },
                { name: 'Italy', population: 100 },
            ] as Country[];
            const sort: Sort = { sortColumn: 'name', sortOrder: 'ASC' };

            expect(sortCountriesIfNeeded(countries, sort)).toEqual([
                { name: 'Switzerland', population: 10 },
                { name: 'Italy', population: 100 },
            ]);
        });
    });
});
