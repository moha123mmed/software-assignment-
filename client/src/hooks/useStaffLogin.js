import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
export const useStaffLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    const response = await fetch('/api/staffs/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      localStorage.setItem('staff', JSON.stringify(json))
      window.location.href ="/slogin"
      dispatch({type: 'STAFFLOGIN', payload: json})
      setIsLoading(false)
    }
  }
  return { login, isLoading, error }
}