import { Box, Container } from '@mui/material'
import { useAppDispatch } from './app/hooks'
import { hideLoadingAsync } from './features/album/albumSlice'
import LoadingBackdrop from './components/LoadingBackdrop'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router'
import Gallery from './pages/gallery'
import Home from './pages/home'
import BaseRedirect from './components/BaseRedirect'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(hideLoadingAsync())
  }, [dispatch])

  return (<Box>
    <LoadingBackdrop />
    <ResponsiveAppBar />
    <Container maxWidth="md" sx={{ minHeight: '100%', my: 2 }}>
      <Routes>
        <Route path="/" element={<BaseRedirect to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/album">
          <Route index element={<Gallery />} />
          <Route path=":id" element={<Gallery />} />
        </Route>
      </Routes>
    </Container>
  </Box>)
}

export default App
