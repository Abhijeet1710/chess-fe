import React, { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { userAtom, userNameAtom } from '../store'
import { Button } from '../components/Button'
import { BACKEND_URL } from '../utils/constants'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState()
  const setUser = useSetRecoilState(userAtom)

  async function logInUser() {
    const response = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: "123ABC"
      })
    });
    if (response.ok) {
      const data = await response.json();
      setUser(data)
      navigate("/game/random")
    }
  }

  return (
    <div className="text-white">
      <label>UserName</label>
      <input className='text-black' placeholder='Joine with a userName' onChange={(event) => setUserName(event.target.value)}/>

      <Button onClick={() => {
        logInUser()
      }}>Log In</Button>
    </div>
  )
}
