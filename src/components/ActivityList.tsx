import { useMemo } from "react"
import type { Activity } from "../types"
import { categories } from "../data/categories"

type ActivityListProps = {
    activities: Activity[]
}

export default function ActivityList({activities}: ActivityListProps) {

    const categoryName = useMemo(() => (category: Activity['category']) => categories.map( cat => cat.id === category ? cat.name : ''), [activities])

  return (
    <>
        <h2 className="text-4xl font-bold text-slate-600 text-center">
            Food and Activities
        </h2>

        {activities?.map(activity => (
            <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between shadow-sm hover:shadow-md transition">
                <div className="space-y-2 relative">
                    <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase rounded-lg font-bold shadow-sm ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                        {categoryName(+activity.category)}
                    </p>
                    <p className="text-2xl font-bold pt-3">
                        {activity.name}
                    </p>
                    <p className="font-black text-4xl text-lime-500">
                        {activity.calories} 
                        <span> Calories</span>
                    </p>
                </div>

                <div>

                </div>
            </div>
        ))}
    </>
  )
}
