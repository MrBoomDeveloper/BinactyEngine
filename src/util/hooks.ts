import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import type { AppState, AppDispatch } from "@context/store";

type DispatchMethod = () => AppDispatch;
export const useAppDispatch: DispatchMethod = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export function useMap(): [(name: any) => any, (name: any, value: any) => void] {
    const [values, setValues] = useState(new Map());

    const a = new Map()

    return [
        (name: any) => {
            return values.get(name);
        },

        (name: any, value: any) => {
            const newMap = new Map(values);
            newMap.set(name, value);
            setValues(newMap);
        }
    ]
}