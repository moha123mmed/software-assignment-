import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
export const useCustomerLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const login = async (email, password,rewardPoints) => {
    setIsLoading(true)
    setError(null)
    const response = await fetch('/api/customers/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password , rewardPoints })
    })
    const json = await response.json()
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      localStorage.setItem('customer', JSON.stringify(json))
      window.location.href ="/clogin"
      dispatch({type: 'CUSTOMERLOGIN', payload: json})
      setIsLoading(false)
    }
  }
  return { login, isLoading, error }
}