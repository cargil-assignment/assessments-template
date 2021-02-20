import { useEffect } from 'react';

import { useLocalSlice, PayloadAction, castDraft } from '../utils/useLocalSlice';

type QueryKey = string;

type PayloadCreator<Data> = () => Promise<Data>;

interface QueryState<Data> {
    data: undefined | Data;
    isPending: boolean;
    error: null | unknown;
    lastUpdated: null | number;
}

const initialState = {
    isPending: true,
    error: null,
    lastUpdated: null,
    data: undefined,
};

/** naive implementation with no caching outside of the Component lifecycle */
export const useQuery = <Data>(
    queryKey: QueryKey,
    payloadCreator: PayloadCreator<Data>,
): QueryState<Data> => {
    const [state, dispatchActions] = useLocalSlice({
        initialState: {} as Record<QueryKey, QueryState<Data>>,
        reducers: {
            request: (state) => {
                if (!state[queryKey]) {
                    state[queryKey] = initialState;
                    return;
                }

                state[queryKey].isPending = true;
                state[queryKey].error = null;
            },
            fulfilled: (state, { payload }: PayloadAction<{ data: Data }>) => {
                state[queryKey].isPending = false;
                state[queryKey].data = castDraft(payload.data);
            },
            rejected: (state, { payload }: PayloadAction<{ error: unknown }>) => {
                state[queryKey].isPending = false;
                state[queryKey].error = payload.error;
            },
        },
    });

    useEffect(() => {
        dispatchActions.request();
        payloadCreator()
            .then((data) => {
                dispatchActions.fulfilled({ data });
            })
            .catch((error) => {
                dispatchActions.rejected({ error });
            });
    }, [queryKey]);

    return state[queryKey] ?? initialState;
};
