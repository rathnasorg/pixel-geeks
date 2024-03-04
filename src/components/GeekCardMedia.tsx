import { CardMedia } from '@mui/material'
import React from 'react'
import { GeekPhoto } from '../app/types'
import { useAppSelector } from '../app/hooks'
import { selectSettings } from '../features/album/albumSlice'

export interface GeekCardMediaProps {
  photo: GeekPhoto
  preferThumbnail?: boolean
}

const GeekCardMedia = (props: GeekCardMediaProps) => {
  const settings = useAppSelector(selectSettings)
  return (<CardMedia component="img" image={props.preferThumbnail && props.photo.thumbnailUrl ? props.photo.thumbnailUrl : props.photo.url} title={props.photo.title || 'Photo'}
    sx={{
      objectFit: 'cover', maxHeight: 400, transform: 'scale(1.02)', filter: `grayscale(${settings.greyScalePercent}%)`,
      '&:hover': {
        transform: 'scale(1)', filter: 'grayscale(0)'
      }
    }} />)
}

export default GeekCardMedia