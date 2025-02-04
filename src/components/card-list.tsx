import type React from 'react'

import { Stack, Typography } from '@mui/material'

import Circular from './circular'
import type { IEquipmentItem, TEquipmentCard } from '../models/equipments'
import type { IUserCard } from '../models/users'

interface ICardList {
  isLoading: boolean
  isError: boolean
  Component?: React.ElementType
  list?: TEquipmentCard[] | IUserCard[]
}

export default function CardList(props: ICardList) {
  const { isError, isLoading, list, Component } = props

  if (isLoading || !Component) {
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

  if (!list) {
    return null
  }

  return (
    <Stack
      direction="row"
      spacing={4}
      useFlexGap
      flexWrap="wrap"
      justifyContent="center"
      marginBottom="40px"
    >
      {list.map((el, i) => {
        return <Component key={i} {...el} />
      })}
    </Stack>
  )
}
