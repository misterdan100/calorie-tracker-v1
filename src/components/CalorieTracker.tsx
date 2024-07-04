import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({activities}: CalorieTrackerProps) {

    // Calculators
    const caloriesConsumed = useMemo(() => activities.reduce((total, current) => current.category === 1 ? total + current.calories : total, 0) , [activities])
    
    const caloriesBurned = useMemo(() => activities.reduce((total, current) => current.category === 2 ? total + current.calories : total, 0) , [activities])

    const caloriesBalance = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

  return (
    <>
        <h2 className="text-4xl font-black text-white text-center">Calories Summary:</h2>

        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
            <CalorieDisplay 
                calories={caloriesConsumed}
                text='Consumed'
            />
            <CalorieDisplay 
                calories={caloriesBurned}
                text='Burned'
            />
            <CalorieDisplay 
                calories={caloriesBalance}
                text='Balance'
            />
        </div>



    </>
  )
}
