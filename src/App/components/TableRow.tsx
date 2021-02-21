import type { FC } from 'react';
import React, { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export const TableRow: FC<Props> = ({ children }) => (
    <td className="px-6 py-4 whitespace-nowrap">{children}</td>
);
