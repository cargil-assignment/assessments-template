import type { FC, ReactNode } from 'react';
import React from 'react';

interface Props {
    children: ReactNode;
}

export const TableBody: FC<Props> = ({ children }) => (
    <tbody className="bg-white divide-y divide-gray-200 m-3">{children}</tbody>
);
