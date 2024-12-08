import { Container } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'

import { DEFAULT_SEARCH_TERM, routes } from '../app/constants/constants'
import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import { Search } from '../components/search/search'
import UserCardList from '../components/user-card-list'
import type { IUserCard } from '../models/users'
import { useFetchEquipmentsBySearchTermQuery } from '../store/api/equipment/equipments-api'
import { selectAccount } from '../store/selectors'

export default function AdminPage() {
  const { login } = useAppSelector(selectAccount)

  const isFetching = false
  const isError = false

  const { pathname } = useLocation()

  const userList: IUserCard[] = [
    {
      login: '26594',
      password: '123456',
      firstName: 'Иван',
      position: 'научный сотрудник',
      department: 'НЦ Переработки ресурсов',
      isVerified: false,
      lastName: '',
      patronymic: '',
      studentsEducationYear: '',
      postGraduateEducationYear: '',
      category: '',
    },
    {
      login: '26595',
      password: '123456',
      firstName: 'Иван',
      position: 'научный сотрудник',
      department: 'НЦ Переработки ресурсов',
      isVerified: false,
      lastName: '',
      patronymic: '',
      studentsEducationYear: '',
      postGraduateEducationYear: '',
      category: '',
    },
    {
      login: '26596',
      password: '123456',
      firstName: 'Иван',
      position: 'научный сотрудник',
      department: 'НЦ Переработки ресурсов',
      isVerified: false,
      lastName: '',
      patronymic: '',
      studentsEducationYear: '',
      postGraduateEducationYear: '',
      category: '',
    },
    {
      login: '26597',
      password: '123456',
      firstName: 'Иван',
      position: 'научный сотрудник',
      department: 'НЦ Переработки ресурсов',
      isVerified: false,
      lastName: '',
      patronymic: '',
      studentsEducationYear: '',
      postGraduateEducationYear: '',
      category: '',
    },
    {
      login: '26598',
      password: '123456',
      firstName: 'Иван',
      position: 'научный сотрудник',
      department: 'НЦ Переработки ресурсов',
      isVerified: false,
      lastName: '',
      patronymic: '',
      studentsEducationYear: '',
      postGraduateEducationYear: '',
      category: '',
    },
    {
      login: '26599',
      password: '123456',
      firstName: 'Иван',
      position: 'научный сотрудник',
      department: 'НЦ Переработки ресурсов',
      isVerified: false,
      lastName: '',
      patronymic: '',
      studentsEducationYear: '',
      postGraduateEducationYear: '',
      category: '',
    },
  ]

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
      {/* <Search /> */}
      <CardList Component={UserCardList} list={userList} isLoading={isFetching} isError={isError} />
    </Container>
  )
}
