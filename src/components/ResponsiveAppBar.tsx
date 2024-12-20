import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { GitHub, Camera, PlayArrow, Pause, ArrowLeft, ArrowRight, Share } from '@mui/icons-material'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { grey } from '@mui/material/colors'
import { goToNextPhoto, goToPrevPhoto, selectPhotos, selectSelectedPhoto, selectSlideShow, selectTitle, setSlideShow } from '../features/album/albumSlice'
import { ButtonGroup } from '@mui/material'

export interface MenuItem {
  label: string
  url: string
  desc: string
}

function ResponsiveAppBar() {
  const navigate = useNavigate()

  const title = useAppSelector(selectTitle)
  const selectedPhoto = useAppSelector(selectSelectedPhoto)
  const slideShow = useAppSelector(selectSlideShow)
  const photos = useAppSelector(selectPhotos)
  const dispatch = useAppDispatch()

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {selectedPhoto !== undefined ? <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="button" noWrap sx={{ mr: 2 }}>{selectedPhoto + 1}/{photos?.length}</Typography>
            <ButtonGroup variant="text" size="small" color="secondary" aria-label="contained primary button group">
              <Button color="secondary" onClick={() => dispatch(goToPrevPhoto())}>
                <ArrowLeft />
              </Button>
              <Button color="secondary" onClick={() => dispatch(setSlideShow(!slideShow))}>
                {slideShow ? <Pause /> : <PlayArrow />}
              </Button>
              <Button color="secondary" onClick={() => dispatch(goToNextPhoto())}>
                <ArrowRight />
              </Button>
            </ButtonGroup>
          </Box> : <>
            <Camera sx={{ display: { xs: 'flex' }, mr: 1, color: grey[100] }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => navigate('/home')}
              sx={{
                mr: 2,
                display: { xs: 'flex' },
                flexGrow: { xs: 1 },
                fontFamily: 'monospace',
                fontWeight: 900,
                letterSpacing: '.3rem',
                color: grey[100],
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              {title ? title : 'Pixel Geeks'}
            </Typography>
          </>}
          <ButtonGroup variant="text" size="small" color="secondary" aria-label="contained primary button group">
            <Button color="secondary" size="large"
              target="_blank"
              href="https://github.com/rathnasorg/pixel-geeks"
              sx={{ my: 2, color: 'white', display: 'block' }}>
              <Share />
            </Button>
            <Button color="secondary" size="large"
              target="_blank"
              href="https://github.com/rathnasorg/pixel-geeks"
              sx={{ my: 2, color: 'white', display: 'block' }}>
              <GitHub />
            </Button>
          </ButtonGroup>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar