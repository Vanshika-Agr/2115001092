import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Product from './components/Product'


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/product' element={<Product/>}/>
    </Routes>
    </BrowserRouter>
      {/* <div className='bg-blue-500'>hfecgvbks</div> */}
    </>
  )
}

export default App
