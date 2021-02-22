import React, { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Props {
    children: ReactNode;
    show: boolean;
    setShow: (nextValue: boolean) => void;
}

export const Modal: FC<Props> = ({ children, show, setShow }) => {
    const modalNode = document.getElementById('modal');
    if (!show || !modalNode) {
        return null;
    }

    return createPortal(
        <div
            onClick={() => setShow(false)}
            onKeyDown={() => setShow(false)}
            className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50 h-screen w-screen bg-gray-800 bg-opacity-5"
        >
            <div className="relative z-50 w-screen max-w-3xl max-h-screen m-0">
                <div className="py-5 px-6 bg-white border-r">{children}</div>
            </div>
        </div>,
        modalNode,
    );
};
