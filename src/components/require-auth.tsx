import { Suspense } from 'react'

import { Navigate } from 'react-router-dom'

import Fallback from './Fallback'
import { useAppSelector } from '../app/hooks/hooks'
import { selectAccount } from '../store/selectors'

interface IRequireAuth {
  redirectTo: string
  children: JSX.Element
}

export default function RequireAuth(props: IRequireAuth) {
  const { isAuth } = useAppSelector(selectAccount)

  if (!isAuth) {
    return <Navigate to={props.redirectTo} />
  }

  return <Suspense fallback={Fallback()}>{props.children}</Suspense>
}