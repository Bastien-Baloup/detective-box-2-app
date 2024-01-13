import { useContext } from 'react'
import { ErrorContext } from '../context/fetchContext'

export const useError = () => {
  const context = useContext(ErrorContext)
  if (!context) {
    throw new Error('useError hook must be used within an ErrorProvider.')
  }
  return context
}