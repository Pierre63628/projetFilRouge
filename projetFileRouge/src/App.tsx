import { BrowserRouter, Route, Routes} from "react-router-dom"
import Layout from "./Layout"

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
