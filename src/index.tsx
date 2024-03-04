import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import './index.css'
import { PersistSelectedStates } from './supports/Persistence'
import { ThemeProvider, createTheme } from '@mui/material'

const container = document.getElementById('root')!
const root = createRoot(container)
const theme = createTheme({
  palette: {
    primary: {
      main: '#9D5DD7',
      light: '#B777F7',
      dark: '#6A2AA4',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#FFD600',
      light: '#FFFF8D',
      dark: '#FFC400',
      contrastText: '#000000'
    }
  }, typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
  },
})
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL} >
        <ThemeProvider theme={theme}>
          <PersistSelectedStates>
            <App />
          </PersistSelectedStates>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
