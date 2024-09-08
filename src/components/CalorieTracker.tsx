import CalorieDisplay from "./CalorieDisplay"
import { useActivity } from "../hook/useActivity"


export default function CalorieTracker() {
    const { caloriesConsumed, caloriesBalance, caloriesBurned } = useActivity()

  return (
    <>
        <h2 className="text-4xl font-black text-center text-white">Calories Summary:</h2>

        <div className="flex flex-col items-center gap-5 mt-10 md:flex-row md:justify-between">
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
