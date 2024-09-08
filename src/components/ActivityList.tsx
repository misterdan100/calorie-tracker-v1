import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useActivity } from "../hook/useActivity"

export default function ActivityList() {
    const { state, dispatch, categoryName, isEmptyActivities} = useActivity()

  return (
    <>
      <h2 className="text-4xl font-bold text-center text-slate-600">
        Food and Activities
      </h2>

      {isEmptyActivities ? (
        <p className="my-5 text-center">There are not activities yet...</p>
      ) : (
        state.activities?.map((activity) => (
          <div
            key={activity.id}
            className="flex justify-between px-5 py-10 mt-5 transition bg-white shadow-sm hover:shadow-md"
          >
            <div className="relative space-y-2">
              <p
                className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase rounded-lg font-bold shadow-sm ${
                  activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
                }`}
              >
                {categoryName(+activity.category)}
              </p>
              <p className="pt-3 text-2xl font-bold">{activity.name}</p>
              <p className="text-4xl font-black text-lime-500">
                {activity.calories}
                <span> Calories</span>
              </p>
            </div>

            <div className="flex items-center gap-5">
              <button
                onClick={() => {
                  dispatch({
                    type: "set-activityId",
                    payload: { id: activity.id },
                  });
                }}
              >
                <PencilSquareIcon className="w-8 h-8 text-gray-500 transition hover:scale-105 hover:text-gray-700" />
              </button>
              <button
                onClick={() => {
                  dispatch({
                    type: "delete-activity",
                    payload: { id: activity.id },
                  });
                }}
              >
                <XCircleIcon className="w-8 h-8 text-gray-500 transition hover:scale-105 hover:text-red-700" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}
