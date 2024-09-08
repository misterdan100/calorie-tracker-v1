import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

export function useActivity() {
    const context = useContext(ActivityContext)
    if(!context) {
        throw new Error('The hook must be called from an ActivityProvider.')
    }
    return context
}