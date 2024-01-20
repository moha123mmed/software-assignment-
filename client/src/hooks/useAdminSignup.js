import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
export const useAdminSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const signup = async (aname, email, password ) => {
    setIsLoading(true)
    setError(null)
    const response = await fetch('/api/admins/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ aname, email, password })
    })
    const json = await response.json()
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      localStorage.setItem('admin', JSON.stringify(json))
      alert("Signed up");
      dispatch({type: 'ADMINLOGIN', payload: json})
      setIsLoading(false)
    }
  }
  return { signup, isLoading, error }
}