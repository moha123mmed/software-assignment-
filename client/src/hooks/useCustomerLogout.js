import { useAuthContext } from './useAuthContext'
export const useCustomerLogout = () => {
  const { dispatch } = useAuthContext()
  const customerlogout = () => {
    localStorage.removeItem('customer')
    {<a href="/">  </a> }
    dispatch({ type: 'CUSTOMERLOGOUT' })
  }
  return { customerlogout }
}