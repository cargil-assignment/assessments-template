import type { Dispatch, FC, SetStateAction } from 'react';
import React from 'react';

import { Modal } from '../../components/Modal';
import { Country } from '../../../api';

interface Props {
    showDetails: boolean;
    setShowDetails: Dispatch<SetStateAction<boolean>>;
    country: Country;
}

export const CountryListItemDetails: FC<Props> = ({ country, showDetails, setShowDetails }) => (
    <Modal show={showDetails} setShow={setShowDetails}>
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
);
