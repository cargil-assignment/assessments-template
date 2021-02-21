import type { FC, ReactNode } from 'react';
import React from 'react';

interface Column {
    id: string;
    label: ReactNode;
}

interface Props {
    columns: Column[];
    children: ReactNode;
}

export const Table: FC<Props> = ({ children, columns }) => (
    <table className="min-w-full divide-y divide-gray-200 mt-2">
        <thead className="bg-gray-50">
            <tr>
                {columns.map((column) => (
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        key={column.id}
                        data-cy={column.id}
                    >
                        {column.label}
                    </th>
                ))}
            </tr>
        </thead>
        {children}
    </table>
);
