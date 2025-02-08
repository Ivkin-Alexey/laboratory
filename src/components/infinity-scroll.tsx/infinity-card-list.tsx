import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react'

import { Stack, Typography } from '@mui/material'

import { useAppSelector } from '../../app/hooks/hooks'
import type { IEquipmentListResult, ISearchArg, TEquipmentCard } from '../../models/equipments'
import type { IUserCard } from '../../models/users'
import { useFetchEquipmentsBySearchTermQuery } from '../../store/api/equipment/equipments-api'
import { selectFavoriteEquipmentsFromLS, selectLogin } from '../../store/selectors'
import Circular from '../circular'
import { useThrottle } from '../../app/hooks/useThrottle'
import { DEFAULT_SEARCH_TERM } from '../../app/constants/constants'

interface IProps {
  // fetch: (arg: ISearchArg) => Promise<IEquipmentListResult>
  // fetchArgs: ISearchArg
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
  // fetchArgs,
}: IProps) {
  const [page, setPage] = useState(1)
  const isMounted = useRef(false);
  const login = useAppSelector(selectLogin)
  const arg = { login, searchTerm: DEFAULT_SEARCH_TERM, pageSize: 10 }

  const {
    isFetching,
    isError,
    isLoading,
    data: equipmentData,
  } = useFetchEquipmentsBySearchTermQuery({ ...arg, page })

  const LIST_MAX_SIZE = 40
  const THRESHOLD = 200
  const equipmentIds = useAppSelector(selectFavoriteEquipmentsFromLS)
  const [list, setList] = useState<TEquipmentCard[]>([])
  const listRef = useRef<HTMLDivElement>(null)
  const prevScrollHeight = useRef<number>(0)
  const isPrepending = useRef(false)

  const newItems = equipmentData?.results
    ? equipmentData.results.map(el => {
        return {
          ...el,
          isFavorite: equipmentIds.includes(el.id),
        }
      })
    : []

  const handleScroll = useThrottle(() => {
    handleScrollPosition()
  }, 200);

  function handleScrollPosition() {
    if(isFetching || isLoading || !equipmentData) return

    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    const isBelowMiddle = scrollTop > scrollHeight / 2
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < THRESHOLD
    const isNearTop = scrollTop < THRESHOLD

    const {page, pageSize, totalCount, results} = equipmentData
    if(isNearBottom && (page * pageSize < totalCount)) {
      setPage(prev => prev + 1)
    } else if (isNearTop && (page > 0)) {
      // setPage(prev => prev - 1)
    }
  }

  useEffect(() => {
    if(page === 1) return
    handleScrollPosition()
  }, [equipmentData])

  useEffect(() => {
    console.log("Длина списка", list.length)
    isMounted.current = true;
    window.addEventListener('scroll', handleScroll);
    return () => {
      isMounted.current = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, [list]);

  useEffect(() => {
    console.log("page", page)
  }, [page])
  
    useEffect(() => {
      if (!equipmentData) return
      const currentList = listRef.current
  
      // 1. Сохраняем ключевые параметры скролла ДО обновления DOM
      if (currentList) {
        prevScrollHeight.current = currentList.scrollHeight
        // isPrepending.current = newItems.length + list.length > LIST_MAX_SIZE
      }
  
      const overage = newItems.length + list.length - LIST_MAX_SIZE
      setList(prev => 
        overage > 0 
          ? [...prev.slice(overage), ...newItems] 
          : [...prev, ...newItems]
      )
    }, [equipmentData])
  
    useLayoutEffect(() => {
      const listElement = listRef.current
      if (!listElement || !isPrepending.current) return
  
      const diff = listElement.scrollHeight - prevScrollHeight.current
      if (diff !== 0) {
        window.scrollTo({
          top: window.scrollY + diff,
          behavior: 'auto'
        })
      }
  
      isPrepending.current = false
    }, [list])

  // useEffect(() => {
  //   if (!equipmentData) return
  
  //   const scrollTop = document.documentElement.scrollTop
  //   const scrollHeight = document.documentElement.scrollHeight
  
  //   const overage = newList.length + list.length - LIST_MAX_SIZE
  //   if (overage > 0) {
  //     setList(prev => [...prev.slice(overage), ...newList])
  //   } else {
  //     setList(prev => [...prev, ...newList])
  //   }

  //   requestAnimationFrame(() => {
  //     const newScrollHeight = document.documentElement.scrollHeight
  //     document.documentElement.scrollTop = scrollTop + (newScrollHeight - scrollHeight)
  //   })
  // }, [equipmentData])

    useEffect(() => {
      console.log(equipmentData)
      }, [equipmentData])

  if (isLoading || isFetching) {
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
      ref={listRef}
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
