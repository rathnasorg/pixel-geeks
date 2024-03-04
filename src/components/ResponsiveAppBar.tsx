import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { GitHub, Camera } from '@mui/icons-material'
import { useNavigate } from 'react-router'
import { useAppSelector } from '../app/hooks'
import { grey } from '@mui/material/colors'
import { selectTitle } from '../features/album/albumSlice'

export interface MenuItem {
  label: string
  url: string
  desc: string
}

const pages: MenuItem[] = []

function ResponsiveAppBar() {
  const navigate = useNavigate()

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const title = useAppSelector(selectTitle)

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Camera sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: grey[100] }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => navigate('/home')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
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

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{
                color: grey[100],
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page: MenuItem) => (
                <MenuItem key={page.label} onClick={() => {
                  navigate(page.url)
                  handleCloseNavMenu()
                }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', borderBottom: 'solid', borderColor: grey[200] }}>
                  <Typography>{page.label}</Typography>
                  <Typography variant="caption" sx={{ color: grey[400] }}>{page.desc}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Camera sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: grey[100] }} />
          <Typography
            variant="h5"
            noWrap
            component="div"
            onClick={() => navigate('/home')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              cursor: 'pointer',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: grey[100],
              textDecoration: 'none',
            }}
          >
            {title ? title : 'Pixel Geeks'}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page: MenuItem) => (
              <Button
                key={page.label}
                onClick={() => {
                  navigate(page.url)
                  handleCloseNavMenu()
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <Button color="secondary"
            target="_blank"
            href="https://github.com/rathnasorg/pixel-geeks"
            sx={{ my: 2, color: 'white', display: 'block' }}>
            <GitHub />
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar