import { Container } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'

import { routes } from '../app/constants/constants'
import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import UserCardList from '../components/user-card-list'
import { useGetUserListQuery } from '../store/api/users-api'
import { selectAccount } from '../store/selectors'

export default function AdminPage() {
  const { login } = useAppSelector(selectAccount)

  const { pathname } = useLocation()

  const { data: userList, isFetching, isError } = useGetUserListQuery(login)

  console.log(userList)

  if (pathname !== routes.admin) {
    return <Outlet />
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CardList Component={UserCardList} list={userList} isLoading={isFetching} isError={isError} />
    </Container>
  )
}
