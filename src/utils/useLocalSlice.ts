/**
 * useLocalSlice is a wrapper around useReducer.
 * It reduces boilerplate while providing strong TS type safety.
 * From: https://github.com/phryneas/use-local-slice
 * Inlining for now, may be removed if not reused.
 */

import { useReducer, useMemo } from 'react';
import type { Draft } from 'immer';
import produce from 'immer';

export { castDraft } from 'immer';

export interface PayloadAction<P> {
    type: string;
    payload: P;
}

export type PayloadActionDispatch<P = void> = void extends P ? () => void : (payload: P) => void;

export type ReducerWithoutPayload<S> = (state: S) => S;

export type PayloadActionReducer<S, P = void> = (
    state: Draft<S>,
    action: PayloadAction<P>,
) => void | S | Draft<S>;

export interface ReducerMap<State> {
    [actionType: string]: PayloadActionReducer<State, any>;
}

export type DispatcherMap<Reducers extends ReducerMap<any>> = {
    [T in keyof Reducers]: Reducers[T] extends ReducerWithoutPayload<any>
        ? PayloadActionDispatch<void>
        : Reducers[T] extends PayloadActionReducer<any, infer P>
        ? PayloadActionDispatch<P>
        : never;
};

export interface UseLocalSliceOptions<State, Reducers extends ReducerMap<State>> {
    initialState: State;
    reducers: Reducers;
}

export function useLocalSlice<State, Reducers extends ReducerMap<State>>({
    initialState,
    reducers,
}: UseLocalSliceOptions<State, Reducers>): [State, DispatcherMap<Reducers>] {
    const reducer = (baseState: State, action: PayloadAction<any>) =>
        produce(baseState, (draftState) => reducers[action.type](draftState, action)) as State;

    const [state, dispatch] = useReducer(reducer, initialState);

    const actionTypes = Object.keys(reducers);
    const serializedActionTypes = JSON.stringify(actionTypes);

    const dispatchAction = useMemo(() => {
        const map: {
            [actionType: string]: PayloadActionDispatch<{ [key: string]: PayloadActionDispatch }>;
        } = {};

        actionTypes.forEach((type) => {
            map[type] = (payload: any) => dispatch({ type, payload });
        });

        return map as DispatcherMap<Reducers>;
    }, [dispatch, serializedActionTypes]);

    return [state, dispatchAction];
}
