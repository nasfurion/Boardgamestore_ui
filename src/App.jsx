import Nav from './ui/Nav'
import { Outlet } from 'react-router-dom'
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
    <div>
      <h1 className='text-center'>Boardgame Store</h1>
      < Nav isLoggedIn = {isLoggedIn}/>
    </div>
    <Outlet context={{isLoggedIn, setIsLoggedIn}}/>
    </>
  )
}

export default App
