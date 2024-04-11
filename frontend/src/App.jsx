import React from 'react'
import { Routes, Route , Link } from 'react-router-dom'
import Day1 from './Day1'
import Day2 from './Day2'
import Day3 from './Day3'
import Day4 from './Day4'
import Day5 from './Day5'
import Day6 from './Day6'
import Day7 from './Day7'
import Day8 from './Day8'
import Day9 from './Day9'
import Day10 from './Day10'


const App = () => {
  return (
    <>
    {/* <nav>
        <Link  to="/Day1" style={{margin:'100px' , textDecoration:'none'}} > Day1 </Link>
        <Link  to="/Day2" style={{margin:'100px' , textDecoration:'none'}} > Day2 </Link>
        <Link  to="/Day3" style={{margin:'100px' , textDecoration:'none'}} > Day3 </Link>
        <Link  to="/Day4" style={{margin:'100px' , textDecoration:'none'}} > Day4 </Link>
        <Link  to="/Day5" style={{margin:'100px' , textDecoration:'none'}} > Day5 </Link>
        <Link  to="/Day6" style={{margin:'100px' , textDecoration:'none'}} > Day6 </Link>
        <Link  to="/Day7" style={{marginTop:'100px' , textDecoration:'none'}} > Day7 </Link>
    </nav> */}

       <Routes>
       <Route path="/Day1" element={<Day1/>} />
       <Route path="/Day2" element={<Day2/>} />
       <Route path="/Day3" element={<Day3/>} />
       <Route path="/Day4" element={<Day4/>} />
       <Route path="/Day5" element={<Day5/>} />
       <Route path="/Day6" element={<Day6/>} />
       <Route path="/Day7" element={<Day7/>} />
       <Route path="/Day8" element={<Day8/>} />
       <Route path="/Day9" element={<Day9/>} />
       <Route path="/Day10" element={<Day10/>} />
       </Routes>        
    </>
  )
}

export default App