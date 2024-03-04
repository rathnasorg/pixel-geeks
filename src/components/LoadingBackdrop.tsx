import { Backdrop, CircularProgress, Typography } from '@mui/material'
import { useAppSelector } from '../app/hooks'
import { selectCover, selectLoading } from '../features/album/albumSlice'
import { purple } from '@mui/material/colors'

const LoadingBackdrop = () => {
  const showLoading = useAppSelector(selectLoading)
  const cover = useAppSelector(selectCover)
  return (<>
    <Backdrop sx={{
      backgroundColor: purple[50], color: purple[400], display: 'flex', flexDirection: 'column', zIndex: (theme) => theme.zIndex.drawer + 1
    }} open={showLoading} >
      <Typography variant="h2" component="h1" gutterBottom>
        {cover.title}
      </Typography>
      <CircularProgress color="inherit" />
    </Backdrop>
  </>)
}

export default LoadingBackdrop