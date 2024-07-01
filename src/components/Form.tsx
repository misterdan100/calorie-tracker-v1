import { categories } from '../data/categories.ts'

const Form = () => {
  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg">
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className='font-bold'>Category:</label>
            <select 
                className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                id="category"
            >
                {categories.map(category => (
                    <option 
                        key={category.id}
                        value={category.name}
                    >{category.name}</option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="activity" className='font-bold'>Activity:</label>
            <input 
                id='activity'
                type="text" 
                className='border border-slate-300 p-2 rounded-lg'
                placeholder='Ej. Food, Orange Juice, Salad, Exersice...'
            />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className='font-bold'>Calories:</label>
            <input 
                id='calories'
                type="number" 
                className='border border-slate-300 p-2 rounded-lg'
                placeholder='Ej. 250 or 500'
            />
        </div>

        <input 
            type="submit" 
            className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer'
            value='Save Food / Save Exersice'
        />
    </form>
  )
}

export default Form