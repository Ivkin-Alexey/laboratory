import type * as React from 'react'
import { useEffect, useState } from 'react'

import { useErrorBoundary } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'

import { routes } from '../app/constants/constants'
import { useAppDispatch, useAppSelector } from '../app/hooks/hooks'
import SignForm from '../components/sign-form/sign-form'
import type { IFormValues } from '../models/inputs'
import { useLazyGetAccountDataQuery, useSignInMutation } from '../store/api/users-api'
import { selectToken } from '../store/selectors'
import { setUserData } from '../store/users-slice'

export default function SignInPage() {
  const [signIn, { isError: isAuthError, isLoading: isAuthLoading, isSuccess: isAuthSuccess }] =
    useSignInMutation()

  const [
    getAccountData,
    {
      data: accountData,
      isError: isAccountError,
      isLoading: isAccountLoading,
      isSuccess: isAccountSuccess,
      error,
    },
  ] = useLazyGetAccountDataQuery()

  const { showBoundary } = useErrorBoundary()

  const [savedLogin, setSavedLogin] = useState<FormDataEntryValue | null>(null)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)

  const handleSubmit = (data: IFormValues) => {
    const { login, password } = data
    setSavedLogin(login)
    signIn({
      login,
      password,
    })
  }

  useEffect(() => {
    if (isAuthSuccess && savedLogin && token) {
      getAccountData(savedLogin?.toString())
    }
  }, [isAuthSuccess, token])

  useEffect(() => {
    if (isAccountSuccess) {
      navigate(routes.main)
    }
  }, [isAccountSuccess])

  useEffect(() => {
    if (isAccountError) {
      console.log(error)
    }
  }, [isAccountError])

  if (isAuthError) {
    showBoundary(error)
  }

  return (
    <SignForm handleSubmit={handleSubmit} isLoading={isAuthLoading} title="Вход" isSignIn={true} />
  )
}
