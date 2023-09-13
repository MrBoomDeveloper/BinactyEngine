import type { AppDispatch, AppState } from "@context/store";
import { Theme, setTheme } from "@context/theme";
import { useCallback, useEffect, useReducer, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

type DispatchMethod = () => AppDispatch;
export const useAppDispatch: DispatchMethod = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

interface FetchHookState {
    resultMessage: string,
    errorMessage: string,
    isDone: boolean,
    isError: boolean
}

export function useAsyncMemo<T>(callback: () => Promise<T>, initialValue: T, dependencies?: any[]): T {
    const [state, setState] = useState(initialValue);

    useEffect(() => {
        callback().then(response => setState(response));
    }, dependencies || []);

    return state;
}

export function useTheme(): [theme: Theme, setTheme: (theme: Theme) => void] {
    const currentTheme = useAppSelector(state => state.theme);
    const dispatch = useAppDispatch();

    const setCurrentTheme = useCallback((theme: Theme) => {
        dispatch(setTheme(theme));
    }, []);

    return [currentTheme, setCurrentTheme];
}

export function useFetch(initialUrl?: string): [fetched: FetchHookState, fetch: (url: string) => void] {
    const [fetched, updateState] = useReducer((state: FetchHookState, action: FetchHookState) => {
        return action;
    }, {isDone: false, isError: false, resultMessage: "", errorMessage: ""});

    useEffect(() => {
        if(initialUrl != null) start(initialUrl);
    }, [initialUrl]);

    async function start(url: string) {
        try {
            const response = await fetch(url);
            const text = await response.text();
            updateState({resultMessage: text, errorMessage: "", isDone: true, isError: false});
        } catch(e) {
            console.error(e);
            const message: string = (e instanceof Error)
                ? e.message
                : e + "";

            updateState({resultMessage: "", errorMessage: message, isDone: true, isError: true});
        }
    }

    return [
        fetched,
        start
    ]
}