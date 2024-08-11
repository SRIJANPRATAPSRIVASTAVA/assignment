import { useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  // testing
  useEffect(() => {
    async function getdata() {
      const res = await axios.get("/api/banner");
      console.log(res.data);
    }
    getdata()
  },)

  return (
    <>
      <div>
        <h1>Hello</h1>
      </div>
    </>
  )
}

export default App
