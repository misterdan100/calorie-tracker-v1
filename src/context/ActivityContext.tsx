import { createContext, ReactNode, useReducer, Dispatch } from "react"
import { ActivityActions, activityReducer, ActivityState, initialState } from "../reducers/activity-reducer"

type ActivityProviderProps = {
    children: ReactNode
}

type ActivityContextProps = {
    state: ActivityState
    dispatch: Dispatch<ActivityActions>
}

export const ActivityContext = createContext<ActivityContextProps>({} as ActivityContextProps)

const [ state, dispatch ] = useReducer(activityReducer, initialState)

export const ActivityProvider = ({children}: ActivityProviderProps) => {

    return (
        <ActivityContext.Provider value={{
            dispatch,
            state,
        }}>
            {children}
        </ActivityContext.Provider>
    )
}