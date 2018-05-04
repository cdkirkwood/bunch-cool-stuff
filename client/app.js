import React from 'react'

import { Navbar, SideBar } from './components'
import Routes from './routes'


const App = () => {
  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <SideBar />
        <Routes />
      </div>
    </div>
  )
}

export default App
