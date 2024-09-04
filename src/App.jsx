import ExpenseInput from './components/ExpenceInput'
// import './App.css'

function App() {
  return (
    <div>
        <nav className='p-4 bg-[#1B998B] m-5 mb-2 rounded-lg flex justify-between '>
          <h1 className='font-extrabold text-[25px] text-white'>Expence Tracker</h1>
          <ul className='flex justify-between gap-5 text-white font-bold'>
            
          </ul>
        </nav>
        <div className='p-4 bg-[#C1DBE2] ml-5 mr-5 rounded-lg h-full'>
            <ExpenseInput/>
            {/* <ExpenseList/>   */}
        </div>
    </div>
  )
}

export default App
