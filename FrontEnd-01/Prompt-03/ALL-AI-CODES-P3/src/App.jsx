import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AIHome from "./components/AIHome";
import GPT from "./components/GPT";
import Gemini from "./components/Gemini";
import Perplexity from "./components/Perplexity";
import Claude from "./components/Claude";
import Copilot from "./components/Copilot";
import Meta from "./components/Meta";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<AIHome />} />
        <Route path='/GPT' element={<GPT />} />
        <Route path='/Gemini' element={<Gemini />} />
        <Route path='/Perplexity' element={<Perplexity />} />
        <Route path='/Claude' element={<Claude />} />
        <Route path='/Copilot' element={<Copilot />} />
        <Route path='/Meta' element={<Meta />} />
      </Routes>
    </>
  )
}

export default App
