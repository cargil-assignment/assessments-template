import type { FC, ReactNode } from 'react';
import React from 'react';

import { Sort } from '../useSort';

import { SortIcon } from './SortIcon';

interface Column {
    id: string;
    label: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => void;
}

interface Props {
    columns: Column[];
    children: ReactNode;
    sort?: Sort;
}

export const Table: FC<Props> = ({ children, columns, sort }) => {
    return (
        <table className="min-w-full divide-y divide-gray-200 mt-2">
            <thead className="bg-gray-50 cursor-pointer">
                <tr>
                    {columns.map((column) => (
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            key={column.id}
                            data-cy={column.id}
                            onClick={column.onClick}
                        >
                            <div className="flex">
                                <span className="mr-2">{column.label}</span>
                                <SortIcon
                                    active={sort?.sortColumn === column.id}
                                    sortOrder={sort?.sortOrder}
                                />
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
            {children}
        </table>
    );
};
