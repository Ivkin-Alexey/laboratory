import React from 'react'

import { Typography, Box } from '@mui/material'

import type { Route } from '../../models/routes'

interface IHeaderNavigation {
  handleCloseNavMenu: (path: string) => void
  navigateToMainPage: () => void
  list: Route[]
  isAuth: boolean
}

export default function HeaderNavigation(props: IHeaderNavigation) {
  const { handleCloseNavMenu, navigateToMainPage, list, isAuth } = props

  const NavButtons = React.lazy(() => import('./nav-buttons-list'))

  return (
    <>
      <Typography
        variant="h5"
        noWrap
        component="a"
        onClick={navigateToMainPage}
        sx={{
          mr: 2,
          display: { xs: { display: 'flex' }, md: 'none' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        LOGO
      </Typography>

      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {isAuth && <NavButtons list={list} handleCloseNavMenu={handleCloseNavMenu} />}
      </Box>
    </>
  )
}
