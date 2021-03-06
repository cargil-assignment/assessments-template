import React, { FC, useState } from 'react';

import type { Country } from '../../../api';
import { TableCell } from '../../components';

import { CountryListItemDetails } from './CountryListItemDetails';

interface Props {
    country: Country;
}

export const CountriesListItem: FC<Props> = ({ country }) => {
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const handleShowDetailsModal = () => {
        setShowDetailsModal((previousValue) => !previousValue);
    };

    return (
        <>
            <tr
                className="hover:bg-blue-50 cursor-pointer"
                onClick={handleShowDetailsModal}
                data-cy="country-list-item"
            >
                <TableCell>
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                            <img
                                src={country.flag}
                                alt={`${country.name}-flag`}
                                className="h-10 w-10"
                                loading="lazy"
                            />
                        </div>
                        <div className="ml-4">
                            <div
                                className="text-sm font-medium text-gray-900"
                                data-cy="country-name"
                            >
                                {country.name}
                            </div>
                        </div>
                    </div>
                </TableCell>
                <TableCell>
                    <div className="text-sm text-gray-900" data-cy="country-code">
                        {country.alpha3Code}
                    </div>
                </TableCell>

                <TableCell>
                    <div className="text-sm text-gray-900" data-cy="country-population">
                        {country.population}
                    </div>
                </TableCell>
            </tr>
            {showDetailsModal && (
                <CountryListItemDetails
                    country={country}
                    setShowDetails={setShowDetailsModal}
                    showDetails={showDetailsModal}
                />
            )}
        </>
    );
};
