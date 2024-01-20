import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
export const useCustomerSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const signup = async (name, email, password) => {
    setIsLoading(true)
    setError(null)
    const response = await fetch('/api/customers/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, email, password })
    })
    const json = await response.json()
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      localStorage.setItem('customer', JSON.stringify(json))
      alert("Signed up");
      dispatch({type: 'CUSTOMERLOGIN', payload: json})
      setIsLoading(false)
    }
  }
  return { signup, isLoading, error }
}