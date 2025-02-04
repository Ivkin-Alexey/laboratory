import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react'

import { Stack, Typography } from '@mui/material'

import { useAppSelector } from '../../app/hooks/hooks'
import type { IEquipmentListResult, ISearchArg, TEquipmentCard } from '../../models/equipments'
import type { IUserCard } from '../../models/users'
import { useFetchEquipmentsBySearchTermQuery } from '../../store/api/equipment/equipments-api'
import { selectFavoriteEquipmentsFromLS } from '../../store/selectors'
import Circular from '../circular'

interface IProps {
  // fetch: (arg: ISearchArg) => Promise<IEquipmentListResult>
  fetchArgs: ISearchArg
  // isLoading: boolean
  // isError: boolean
  Component: React.ElementType
  // list?: TEquipmentCard[]
}

export default function InfinityCardList({
  // list,
  // fetch,
  // isLoading,
  Component,
  // isError,
  fetchArgs,
}: IProps) {
  const [page, setPage] = useState(1)
  const scrollPosition = useRef(0)

  const {
    isFetching,
    isError,
    isLoading,
    data: equipmentData,
  } = useFetchEquipmentsBySearchTermQuery({ ...fetchArgs, page })

  const equipmentIds = useAppSelector(selectFavoriteEquipmentsFromLS)

  const list = equipmentData?.results
    ? equipmentData.results.map(el => {
        return {
          ...el,
          isFavorite: equipmentIds.includes(el.id),
        }
      })
    : []

  const handleScroll = useCallback(() => {
    console.log(
      'window.innerHeight',
      window.innerHeight,
      'document.documentElement.scrollTop',
      document.documentElement.scrollTop,
      'document.documentElement.offsetHeight',
      document.documentElement.offsetHeight,
    )
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      console.log("scroll")
      console.log(equipmentData?.results, fetchArgs.pageSize, page)
      if (equipmentData?.results.length === fetchArgs.pageSize * page) {

        setPage(prev => prev + 1)
      }

    }
  }, [equipmentData?.results])

  // useLayoutEffect(() => {
  //   if (scrollPosition.current) {
  //     document.documentElement.scrollTop = scrollPosition.current
  //   }
  // }, [list])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    console.log(page)
  }, [page])


  if (isLoading) {
    return <Circular />
  }

  if (isError) {
    return (
      <Typography gutterBottom variant="body1" component="div" marginTop="40px">
        Произошла ошибка
      </Typography>
    )
  }

  if (list && list?.length === 0) {
    return (
      <Typography gutterBottom variant="body1" component="div" marginTop="40px">
        Список пуст
      </Typography>
    )
  }

  return (
    <Stack
      direction="row"
      sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
      spacing={4}
      useFlexGap={true}
      marginBottom="40px"
    >
      {list?.map((el, i) => <Component key={el.id + i} {...el} isCardMode={true} />)}
    </Stack>
  )
}
