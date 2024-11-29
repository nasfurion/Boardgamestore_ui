import Nav from './ui/Nav'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
    <div>
      <h1 className='text-center'>Boardgame Store</h1>
      < Nav/>
    </div>
    <Outlet/>
    </>
  )
}

export default App
