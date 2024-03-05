import { Box, Card, CardContent, CardMedia, Fade, Grid, Typography } from '@mui/material'
import React, { TouchEvent, useEffect, useState } from 'react'
import { goToPrevPhoto, goToNextPhoto, selectPhotos, selectSelectedPhoto, selectSettings, selectSlideShow, setSelectedPhoto, setSlideShow } from '../features/album/albumSlice'
import { GeekPhoto, GeekSettings } from '../app/types'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Masonry } from '@mui/lab'
import GeekCardMedia from '../components/GeekCardMedia'
import { useLocation } from 'react-router-dom'
import { MIN_SWIPE_DISTANCE } from '../app/const'

const Gallery = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const photos: GeekPhoto[] = useAppSelector(selectPhotos)
  const settings: GeekSettings = useAppSelector(selectSettings)
  const selectedPhoto = useAppSelector(selectSelectedPhoto)
  const slideShow = useAppSelector(selectSlideShow)
  const [touchStart, setTouchStart] = useState<number>(NaN)
  const [touchEnd, setTouchEnd] = useState<number>(NaN)

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(NaN) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE
    if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right')
    if (isLeftSwipe) dispatch(goToPrevPhoto())
    if (isRightSwipe) dispatch(goToNextPhoto())
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(setSelectedPhoto(undefined))
        dispatch(setSlideShow(false))
      } else if (event.key === 'ArrowRight' && selectedPhoto !== undefined) {
        dispatch(setSelectedPhoto(selectedPhoto !== null && selectedPhoto < photos.length - 1 ? selectedPhoto + 1 : 0))
      } else if (event.key === 'ArrowLeft' && selectedPhoto !== undefined) {
        dispatch(setSelectedPhoto(selectedPhoto !== null && selectedPhoto > 0 ? selectedPhoto - 1 : photos.length - 1))
      } else if (event.key === ' ') {
        dispatch(setSlideShow(!slideShow))
      }
    }
    if (selectedPhoto !== undefined) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => { document.removeEventListener('keydown', handleKeyDown) }
  }, [selectedPhoto, slideShow, dispatch, photos.length])

  useEffect(() => {
    if (slideShow && selectedPhoto !== undefined) {
      const interval = setInterval(() => {
        dispatch(setSelectedPhoto(selectedPhoto !== null && selectedPhoto < photos.length - 1 ? selectedPhoto + 1 : 0))
      }, settings.slideShowInterval)
      return () => clearInterval(interval)
    }
  }, [slideShow, selectedPhoto, photos.length, dispatch, settings.slideShowInterval])

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const slideshowParam = queryParams.get('slideshow')
    if (slideshowParam && (slideshowParam.toLowerCase() === 'true' || slideshowParam.toLowerCase() === 'yes')) {
      dispatch(setSelectedPhoto(0))
      dispatch(setSlideShow(true))
    }
  }, [dispatch, location.search])

  return (settings.isMasonary ? <Box onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
    <Fade in={selectedPhoto !== undefined}>
      <Box onClick={() => { dispatch(setSelectedPhoto(undefined)) }}
        sx={{
          position: 'fixed',
          top: 75,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: (theme) => theme.zIndex.drawer + 2,
          pt: 1
        }}>
        {selectedPhoto !== undefined && <CardMedia component="img" image={photos[selectedPhoto].url} title={photos[selectedPhoto].title} sx={{
          maxHeight: '90vh',
          maxWidth: '90vw',
          objectFit: 'contain',
          filter: `grayscale(${settings.greyScalePercent}%)`
        }} />}
      </Box>
    </Fade>
    <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
      {photos.map((photo: GeekPhoto, index: number) => (
        <Card key={index} onClick={() => {
          dispatch(setSlideShow(false))
          dispatch(setSelectedPhoto(index))
        }}>
          <GeekCardMedia photo={photo} preferThumbnail={true} />
          {(photo.title || photo.description) && !settings.hideTitleAndDescription && <CardContent>
            <Typography variant="h5" component="div">
              {photo.title}
            </Typography>
            {photo.description && (
              <Typography variant="body2" color="text.secondary">
                {photo.description}
              </Typography>
            )}
          </CardContent>}
        </Card>
      ))}
    </Masonry>
  </Box>
    : <Grid container spacing={4}>
      {photos.map((photo: GeekPhoto, index: number) => (
        <Grid item key={index} xs={12} sm={6} md={3}>
          <Card key={index} onClick={() => {
            dispatch(setSlideShow(false))
            dispatch(setSelectedPhoto(index))
          }}>
            <CardMedia component="img" image={photo.url} title={photo.title || 'Photo'} />
            {(photo.title || photo.description) && !settings.hideTitleAndDescription && <CardContent>
              <Typography variant="h5" component="div">
                {photo.title}
              </Typography>
              {photo.description && (
                <Typography variant="body2" color="text.secondary">
                  {photo.description}
                </Typography>
              )}
            </CardContent>}
          </Card>
        </Grid>
      ))}
    </Grid>)
}

export default Gallery
