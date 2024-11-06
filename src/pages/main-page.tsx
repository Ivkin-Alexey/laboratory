import { Container } from '@mui/material'

import { DEFAULT_SEARCH_TERM } from '../app/constants/constants'
import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import { Search } from '../components/search/search'
import { useFetchEquipmentsBySearchTermQuery } from '../store/equipments-api'
import { selectLogin } from '../store/selectors'
import EquipmentCardList from '../components/equipment-card-list'

export default function MainPage() {
  const login = useAppSelector(selectLogin)
  const arg = { login, searchTerm: DEFAULT_SEARCH_TERM }

  const { isFetching, isError, data: equipmentList } = useFetchEquipmentsBySearchTermQuery(arg)

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Search />
      <CardList Component={EquipmentCardList} list={equipmentList} isLoading={isFetching} isError={isError} />
    </Container>
  )
}
