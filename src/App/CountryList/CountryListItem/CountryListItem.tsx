import React, { FC } from 'react';

import { Country } from '../../../api';

interface Props {
    country: Country;
}

export const CountriesListItem: FC<Props> = ({ country }) => {
    return (
        <div data-cy="country-list-item">
            <img src={country.flag} alt={`${country.name}-flag`} width={20} />
            {country.name} - {country.alpha3Code} - {country.population}
        </div>
    );
};
