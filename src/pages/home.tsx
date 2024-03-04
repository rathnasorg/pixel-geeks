import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { selectCover, selectPhotos } from '../features/album/albumSlice'
import { GeekPhoto } from '../app/types'
import { useAppSelector } from '../app/hooks'
import { useNavigate } from 'react-router'
import AppPage from '../components/AppPage'
import GeekCardMedia from '../components/GeekCardMedia'

const Home = () => {
  const cover: GeekPhoto = useAppSelector(selectCover)
  const photos: GeekPhoto[] = useAppSelector(selectPhotos)
  const navigate = useNavigate()

  return (<AppPage alignItems="center">
    <Card sx={{ maxWidth: 500, cursor: photos?.length === 0 ? 'auto' : 'pointer' }} onClick={() => {
      navigate('/album')
    }}>
      <GeekCardMedia photo={cover} />
      {cover.description && <CardContent>
        <Typography variant="body2" color="text.secondary">
          {cover.description}
        </Typography>
      </CardContent>
      }
    </Card>
  </AppPage>
  )
}

export default Home