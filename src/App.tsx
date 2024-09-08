import { useEffect, useMemo } from "react"
import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"
import { useActivity } from "./hook/useActivity"

function App() {

  const { state, dispatch } = useActivity()  

  useEffect(() => {
      localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = () => useMemo(() => state.activities.length, [state.activities])


  return (
    <>
      <header className="py-3 bg-lime-600">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <h1 className="font-bold text-center text-white uppercase">Calorie Tracker</h1>
          <button
            className="px-4 py-2 text-sm font-bold text-white uppercase transition bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-900 disabled:opacity-10"
            disabled={!canRestartApp()}
            onClick={() => dispatch({type: 'restart-app'})}
          >
            Restart App
          </button>
          
        </div>
      </header>

      <section className="px-5 py-20 bg-lime-500">
        <div className="max-w-4xl mx-auto">
          <Form />
        </div>
      </section>

      <section className="py-10 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker />
        </div>
      </section>

      <section className="max-w-4xl p-10 mx-auto">
        <ActivityList />
      </section>
    </>
  )
}

export default App
