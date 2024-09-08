import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Activity } from '../types/index.ts'
import { categories } from '../data/categories.ts'

import { useActivity } from '../hook/useActivity.ts'


const initialState: Activity = {
    id: uuidv4(),
    category: 1, 
    name: '',
    calories: 0
  }

const Form = () => {

    const { state, dispatch} = useActivity()
    const [ activity, setActivity ] = useState<Activity>(initialState)

    useEffect(() => {
        if(state.activeId) {
            const selectActivity: Activity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectActivity)
        }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField: boolean = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity, 
            [e.target.id]: isNumberField ? +e.target.value : e.target.value.trimStart()
        })

    }
    
    const isValidActivity = () => {
        const { name, calories} = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({type: 'save-activity', payload: {newActivity: activity}})

        // reset state
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }



  return (
    <form 
        className={`space-y-5 bg-white shadow p-10 rounded-lg border-2 transition ${state.activeId ? 'border-orange-400' : 'border-transparent'}`} 
        onSubmit={handleSubmit}
    >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className='font-bold'>Category:</label>
            <select 
                className="w-full p-2 bg-white border rounded-lg border-slate-300"
                id="category"
                value={activity.category}
                onChange={handleChange}
            >
                {categories.map(category => (
                    <option 
                        key={category.id}
                        value={category.id}
                    >{category.name}</option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className='font-bold'>Activity:</label>
            <input 
                id='name'
                type="text" 
                className='p-2 border rounded-lg border-slate-300'
                placeholder='Ej. Food, Orange Juice, Salad, Exersice...'
                value={activity.name}
                onChange={handleChange}
            />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className='font-bold'>Calories:</label>
            <input 
                id='calories'
                type="number" 
                className='p-2 border rounded-lg border-slate-300'
                placeholder='Ej. 250 or 500'
                value={+activity.calories}
                onChange={handleChange}
            />
        </div>

        <input 
            type="submit" 
            className={`w-full p-2 font-bold uppercase text-white cursor-pointer rounded-lg disabled:opacity-10 transition-all ${state.activeId ? 'bg-orange-400 hover:bg-orange-500' : 'bg-gray-800 hover:bg-gray-900'}`}
            value={activity.category === 1 ? 'Save Food' : 'Save Exersice'}
            disabled={!isValidActivity()}
        />
    </form>
  )
}

export default Form