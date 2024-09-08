import { createContext, ReactNode, useReducer, Dispatch, useMemo } from "react";
import {
  ActivityActions,
  activityReducer,
  ActivityState,
  initialState,
} from "../reducers/activity-reducer";
import { categories } from "../data/categories";
import { Activity } from "../types";

type ActivityProviderProps = {
  children: ReactNode;
};

type ActivityContextProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityActions>;
  caloriesConsumed: number
  caloriesBurned: number
  caloriesBalance: number
  categoryName: (category: Activity["category"]) => string[]
  isEmptyActivities: boolean
};

export const ActivityContext = createContext<ActivityContextProps>(
  {} as ActivityContextProps
);


export const ActivityProvider = ({ children }: ActivityProviderProps) => {
    const [state, dispatch] = useReducer(activityReducer, initialState);

    // Calculators
    const caloriesConsumed = useMemo(() => state.activities.reduce((total, current) => current.category === 1 ? total + current.calories : total, 0) , [state.activities])

    const caloriesBurned = useMemo(() => state.activities.reduce((total, current) => current.category === 2 ? total + current.calories : total, 0) , [state.activities])

    const caloriesBalance = useMemo(() => caloriesConsumed - caloriesBurned, [state.activities])

    const categoryName = useMemo(() => (category: Activity['category']) => categories.map( cat => cat.id === category ? cat.name : ''), [state.activities])

    const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])

  return (
    <ActivityContext.Provider
      value={{
        dispatch,
        state,
        caloriesConsumed,
        caloriesBurned,
        caloriesBalance,
        categoryName,
        isEmptyActivities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
