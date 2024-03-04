import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { selectPhotos, selectSettings } from '../features/album/albumSlice'
import { GeekPhoto, GeekSettings } from '../app/types'
import { useAppSelector } from '../app/hooks'
import { Masonry } from '@mui/lab'
import GeekCardMedia from '../components/GeekCardMedia'

const Gallery = () => {
  const photos: GeekPhoto[] = useAppSelector(selectPhotos)
  const settings: GeekSettings = useAppSelector(selectSettings)
  return (settings.isMasonary ? <Box>
    <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
      {photos.map((photo: GeekPhoto, index: number) => (
        <Card key={index}>
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
          <Card>
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