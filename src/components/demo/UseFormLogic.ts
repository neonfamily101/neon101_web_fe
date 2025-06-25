"use client"

import { useState } from "react"

export interface FormState {
  isLoading: boolean
  result: string | null
  error: string | null
}

export function useFormLogic() {
  const [state, setState] = useState<FormState>({
    isLoading: false,
    result: null,
    error: null,
  })

  const setLoading = (loading: boolean) => {
    setState((prev) => ({ ...prev, isLoading: loading }))
  }

  const setResult = (result: string) => {
    setState({ isLoading: false, result, error: null })
  }

  const setError = (error: string) => {
    setState({ isLoading: false, result: null, error })
  }

  const reset = () => {
    setState({ isLoading: false, result: null, error: null })
  }

  return {
    ...state,
    setLoading,
    setResult,
    setError,
    reset,
  }
}
