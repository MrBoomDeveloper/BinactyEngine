import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useEffect, useReducer } from "react";
import type { AppState, AppDispatch } from "@context/store";

type DispatchMethod = () => AppDispatch;
export const useAppDispatch: DispatchMethod = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

interface FetchHookState {
    resultMessage: string,
    errorMessage: string,
    isDone: boolean,
    isError: boolean
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