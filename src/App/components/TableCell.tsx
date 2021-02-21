import type { FC } from 'react';
import React, { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export const TableCell: FC<Props> = ({ children }) => (
    <td className="px-6 py-4 whitespace-nowrap">{children}</td>
);
