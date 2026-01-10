import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charsAllowed, setCharsAllowed] = useState(false)
  const [password,setPassword] = useState("")
  const passwordRef = useRef(null)
  
  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charsAllowed) str += "!@#$%^&*()_+-=[]{}|<>?/~"


    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  },[length,numberAllowed,charsAllowed,setPassword])
  
  useEffect(() => {
    passwordGenerator()
  },[length,numberAllowed,charsAllowed,passwordGenerator])

  const copyPasswordToClipboard = useCallback(() => {

      passwordRef.current.select()
      passwordRef.current.setSelectionRange(0, 21)
      window.navigator.clipboard.writeText(password)
    },[password])

 return (
    <>
      <div className='w-full max-w-md mx-auto p-4 rounded-lg 
      my-8 bg-gray-800 text-orange-500 shadow-md'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className = "flex shadow rounded-lg overflow-hidden mb-4">
          <input 
          type="text" 
          value = {password}
          className='outline-none w-full py-1 px-3 bg-white'
          placeholder='Password'
          readOnly
          ref={passwordRef}
         />
        
          <button
            onClick={copyPasswordToClipboard}
            className = 'outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy
          </button>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              min={6}
              max={20}
              value={length}
              className='outline-none w-full py-1 px-3 bg-white'
              onChange={(e) => setLength(e.target.value)}
             />
             <label htmlFor="length">Length: {length}</label>
          </div>
          <div
          className='flex items-center gap-x-1'>
            <input
            type="checkbox"
            id="numberInput"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div
          className='flex items-center gap-x-1'>
            <input
            type="checkbox"
            id="charsInput"
            defaultChecked={charsAllowed}
            onChange={() => {
              setCharsAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="charsInput">Characters</label>
          </div>
        </div>
        
      </div>
     
    </>
  )
}

export default App
