import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
export const useStaffSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const signup = async (email, password, name) => {
    setIsLoading(true)
    setError(null)
    const response = await fetch('/api/staffs/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password, name })
    })
    const json = await response.json()
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      localStorage.setItem('staff', JSON.stringify(json))
      alert("Signed up");
      dispatch({type: 'STAFFLOGIN', payload: json})
      setIsLoading(false)
    }
  }
  return { signup, isLoading, error }
}