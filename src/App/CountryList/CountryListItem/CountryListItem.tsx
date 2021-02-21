import React, { FC, useState } from 'react';

import { Country } from '../../../api';
import { TableCell } from '../../components/TableCell';
import { Modal } from '../../components/Modal';

interface Props {
    country: Country;
}

export const CountriesListItem: FC<Props> = ({ country }) => {
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const handleSetExpanded = () => {
        setShowDetailsModal((previousValue) => !previousValue);
    };

    return (
        <>
            <tr className="hover:bg-blue-50" onClick={handleSetExpanded}>
                <TableCell>
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                            <img
                                src={country.flag}
                                alt={`${country.name}-flag`}
                                className="h-10 w-10"
                            />
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{country.name}</div>
                        </div>
                    </div>
                </TableCell>
                <TableCell>
                    <div className="text-sm text-gray-900">{country.alpha3Code}</div>
                </TableCell>

                <TableCell>
                    <div className="text-sm text-gray-900">{country.population}</div>
                </TableCell>
            </tr>
            <Modal show={showDetailsModal} setShow={setShowDetailsModal}>
                <div className="flex-col">
                    <div className="flex">
                        <div className="font-medium mr-2" data-cy="country-capital">
                            Capital:
                        </div>
                        {country.capital}
                    </div>
                    <div className="flex">
                        <div className="font-medium mr-2" data-cy="country-language">
                            Language:
                        </div>
                        {country.languages[0].name}
                    </div>
                    <div className="flex">
                        <div className="font-medium mr-2" data-cy="country-currency">
                            Currency:
                        </div>
                        {country.currencies[0].name}
                    </div>
                </div>
            </Modal>
        </>
    );
};
