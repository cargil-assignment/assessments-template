import type { Country } from '../api';

import type { Sort, SortableColumns, SortStates } from './useSort';

export function sortCountriesIfNeeded(
    countries: Country[] | undefined,
    sort?: Sort,
): Country[] | undefined {
    if (sort === undefined || countries === undefined) {
        return countries;
    }

    const { sortColumn, sortOrder } = sort;

    return [...countries].sort(
        getSortComparisonStrategy(
            sortColumn as SortableColumns,
            sortOrder as NonNullable<SortStates>,
        ),
    );
}

function getSortComparisonStrategy(
    sortColumn: SortableColumns,
    sortOrder: NonNullable<SortStates>,
) {
    if (sortOrder === 'ASC') {
        return (countryA: Country, countryB: Country) => {
            const countryAValue = countryA[sortColumn];
            const countryBValue = countryB[sortColumn];

            if (typeof countryAValue === 'string' && typeof countryBValue === 'string') {
                return countryBValue.localeCompare(countryAValue);
            }

            return (countryAValue as number) - (countryBValue as number);
        };
    }

    if (sortOrder === 'DESC') {
        return (countryA: Country, countryB: Country) => {
            const countryAValue = countryA[sortColumn];
            const countryBValue = countryB[sortColumn];

            if (typeof countryAValue === 'string' && typeof countryBValue === 'string') {
                return countryAValue.localeCompare(countryBValue);
            }

            return (countryBValue as number) - (countryAValue as number);
        };
    }

    throw new Error('Unknown sortOrder value');
}
