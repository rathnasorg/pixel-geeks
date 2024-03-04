import { Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router'

export interface BaseRedirectProps {
  to: string
}

const BaseRedirect = (props: BaseRedirectProps) => {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate(props.to)
    }, 100)
  }, [props.to])
  return <Typography component="span">If not redirected, click <Button href="home">here</Button> to go home.</Typography>
}

export default BaseRedirect

