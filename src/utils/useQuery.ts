import { useEffect, useReducer } from 'react';

type QueryKey = string;
type PayloadCreator<Data> = () => Promise<Data>;
type State<Data> = Record<QueryKey, QueryState<Data>>;

interface QueryState<Data> {
    data: undefined | Data;
    isPending: boolean;
    error: null | unknown;
}

const initialState = {
    data: undefined,
    isPending: true,
    error: null,
};

type Action<Data> =
    | { type: 'request'; queryKey: string }
    | { type: 'fulfilled'; queryKey: string; payload: { data: Data } }
    | { type: 'rejected'; queryKey: string; payload: { error: unknown } };

/** naive implementation with no caching outside of the Component lifecycle, nor requests deduplication */
export const useQuery = <Data>(
    queryKey: QueryKey,
    payloadCreator: PayloadCreator<Data>,
): QueryState<Data> => {
    const [state, dispatch] = useReducer(reducer, {} as State<Data>);

    useEffect(() => {
        const isQueryAlreadyCached = Boolean(state[queryKey]);
        if (isQueryAlreadyCached) {
            return;
        }
        dispatch({ type: 'request', queryKey });
        payloadCreator()
            .then((data) => {
                dispatch({ type: 'fulfilled', queryKey, payload: { data } });
            })
            .catch((error) => {
                dispatch({ type: 'rejected', queryKey, payload: { error } });
            });
    }, [queryKey]);

    return (state as State<Data>)[queryKey] ?? initialState;
};

function reducer<Data>(state: State<Data>, action: Action<Data>): State<Data> {
    switch (action.type) {
        case 'request':
            return {
                ...state,
                [action.queryKey]: {
                    ...initialState,
                    data: state[action.queryKey]?.data ?? undefined,
                },
            };
        case 'fulfilled':
            return {
                ...state,
                [action.queryKey]: {
                    ...state[action.queryKey],
                    isPending: false,
                    data: action.payload.data,
                },
            };
        case 'rejected':
            return {
                ...state,
                [action.queryKey]: {
                    ...state[action.queryKey],
                    isPending: false,
                    error: action.payload.error,
                },
            };
    }
}
