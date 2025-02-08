import { useEffect, useState } from 'react'

import { Container } from '@mui/material'

import { DEFAULT_SEARCH_TERM } from '../app/constants/constants'
import { useAppSelector } from '../app/hooks/hooks'
import Carousel from '../components/carousel/carousel'
import { EquipmentCard } from '../components/equipment-card/equipment-card'
import InfinityCardList from '../components/infinity-scroll.tsx/infinity-card-list'
import { Search } from '../components/search/search'
import type { IEquipmentListResult, ISearchArg } from '../models/equipments'
import { useLazyFetchEquipmentsBySearchTermQuery } from '../store/api/equipment/equipments-api'
import { useLazyCheckTokenQuery } from '../store/api/users-api'
import { selectFavoriteEquipmentsFromLS, selectIsAuth, selectLogin } from '../store/selectors'

export default function MainPage() {


  // const isAuth = useAppSelector(selectIsAuth)
  // const [checkToken, { data, isSuccess }] = useLazyCheckTokenQuery()

  // useEffect(() => {
  //   if (isAuth) {
  //     checkToken()
  //   }
  // }, [])



  useEffect(() => {
    const navigationEntries = performance.getEntriesByType("navigation");
  
    if (navigationEntries.length > 0) {
      const navigationType = navigationEntries[0].type;
  
      if (navigationType === "reload") {
        console.log("Страница была перезагружена");
      } else if (navigationType === "navigate") {
        console.log("Страница загружена впервые");
      }
    }
  }, []);

  return (
    <>
      {/* <Carousel /> */}
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Search />
        <InfinityCardList
          Component={EquipmentCard}
        />
      </Container>
    </>
  )
}
