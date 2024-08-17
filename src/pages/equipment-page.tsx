import { useContext } from 'react'

import { Box, CircularProgress, Container, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

import { useAppSelector } from '../app/hooks/hooks'
import { toLowerCaseFirstChart } from '../app/utils/utils'
import FavoriteButtons from '../components/equipment-card/favorite-buttons'
import OperateStatus from '../components/equipment-card/operate-status'
import { ThemeContext } from '../components/root'
import { useFetchEquipmentByIDQuery } from '../store/equipments-api'
import { selectAccount } from '../store/selectors'

export default function EquipmentPage() {
  const location = useLocation()

  const equipmentID = location.pathname.slice(1)

  const { login } = useAppSelector(selectAccount)

  const { color } = useContext(ThemeContext)

  const { isFetching, isError, data } = useFetchEquipmentByIDQuery(equipmentID)

  if (isFetching) {
    return <CircularProgress size="60px" />
  }

  if (isError) {
    return <h3>Произошла ошибка</h3>
  }

  if (data) {
    let { id, brand, name, model, imgUrl, description, isFavorite, isOperate, userName, userID } = data

    if (userID === login) { userName = "Вы используете" }

    return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '40px',
          backgroundColor: color,
        }}
      >
        <Box sx={{position: "relative"}}>
          <OperateStatus isOperate={isOperate} userName={userName} />
          <img
            height="400"
            src={imgUrl}
            alt="Изображение карточки"
            style={{ margin: 'auto', display: 'block', marginBottom: '10px' }}
          />
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body1" color="text.secondary" marginBottom="10px">
            Марка: {brand}
          </Typography>
          <Typography variant="body1" color="text.secondary" marginBottom="10px">
            Модель: {model}
          </Typography>
          <Typography variant="body1" color="text.secondary" marginBottom="10px">
            Заводской №: {id}
          </Typography>
          <Typography variant="body1" color="text.secondary" marginBottom="10px">
            Описание: {toLowerCaseFirstChart(description)}
          </Typography>
          <FavoriteButtons equipmentID={id} isFavorite={isFavorite} isCardMode={false} />
        </Box>
      </Container>
    )
  }
}
