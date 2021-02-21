import { renderHook } from '@testing-library/react-hooks';

import { useQuery } from '../useQuery';

const renderUseQuery = <Data>(options: {
    payloadCreator: () => Promise<Data>;
    queryKey: string;
}) => {
    return renderHook((opts) => useQuery(opts.queryKey, opts.payloadCreator), {
        initialProps: options,
    });
};

describe('useQuery', () => {
    it('returns a pending state when it runs for the first time with a given queryKey', () => {
        const { result } = renderUseQuery({
            queryKey: 'Sw',
            payloadCreator: () => {
                return Promise.resolve([{ name: 'Switzerland' }]);
            },
        });

        expect(result.current).toEqual({ isPending: true, error: null, data: undefined });
    });

    it('returns a fulfilled state when the payloadCreator resolves', async () => {
        const { result, waitForNextUpdate } = renderUseQuery({
            queryKey: 'Sw',
            payloadCreator: () => {
                return Promise.resolve([{ name: 'Switzerland' }]);
            },
        });

        await waitForNextUpdate();

        expect(result.current).toEqual({
            isPending: false,
            error: null,
            data: [{ name: 'Switzerland' }],
        });
    });

    it('returns a rejected state when the payloadCreator rejects', async () => {
        const { result, waitForNextUpdate } = renderUseQuery({
            queryKey: 'Sw',
            payloadCreator: () => {
                return Promise.reject(new Error('error'));
            },
        });

        await waitForNextUpdate();

        expect(result.current).toEqual({
            isPending: false,
            error: expect.any(Error),
            data: undefined,
        });
    });

    it('does not invoke the payloadCreator again, after it has resolved for a given queryKey', async () => {
        const payloadCreatorSpy = jest.fn();
        const { result, waitForNextUpdate, rerender } = renderUseQuery({
            queryKey: 'Sw',
            payloadCreator: () => {
                payloadCreatorSpy();
                return Promise.resolve([{ name: 'Switzerland' }]);
            },
        });

        await waitForNextUpdate();

        rerender({
            queryKey: 'Swa',
            payloadCreator: () => {
                payloadCreatorSpy();
                return Promise.resolve([{ name: 'Switzerland' }]);
            },
        });

        await waitForNextUpdate();

        rerender({
            queryKey: 'Sw',
            payloadCreator: () => {
                payloadCreatorSpy();
                return Promise.resolve([{ name: 'Switzerland' }]);
            },
        });

        expect(payloadCreatorSpy).toHaveBeenCalledTimes(2);
    });
});
