import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Modal } from '../Modal';

function addPortalNodeToDom() {
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'modal');
    document.body.appendChild(portalRoot);
}

addPortalNodeToDom();

describe('<Modal/>', () => {
    it('shows its children when show is true', () => {
        render(
            <Modal show setShow={() => {}}>
                hey
            </Modal>,
        );

        expect(screen.queryByText('hey')).toBeInTheDocument();
    });

    it('does not show its children when show is false', () => {
        render(
            <Modal show={false} setShow={() => {}}>
                hey
            </Modal>,
        );

        expect(screen.queryByText('hey')).not.toBeInTheDocument();
    });

    it('invokes setShow with false when clicking on the modal', () => {
        const setShowSpy = jest.fn();
        render(
            <Modal show setShow={setShowSpy}>
                hey
            </Modal>,
        );

        screen.queryByText('hey')?.click();

        expect(setShowSpy).toHaveBeenCalledWith(false);
    });

    it('invokes setShow with false when pressing a button', () => {
        const setShowSpy = jest.fn();
        render(
            <Modal show setShow={setShowSpy}>
                hey
            </Modal>,
        );

        fireEvent.keyDown(screen.getByText('hey'), { key: 'Enter', code: 13, charCode: 13 });

        expect(setShowSpy).toHaveBeenCalledWith(false);
    });
});
