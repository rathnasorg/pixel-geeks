import React from 'react'
import { Box, Typography } from '@mui/material'

export interface AppPageProps {
  title?: string
  subtitle?: string | number | boolean
  alignItems: 'baseline' | 'center' | 'end' | 'flex-end' | 'flex-start' | 'inherit' | 'initial' | 'normal' |
  'revert' | 'revert-layer' | 'self-end' | 'self-start' | 'start' | 'stretch' | 'unset'
  children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
}

const AppPage = (props: AppPageProps) => <Box sx={{ display: 'flex', flexDirection: 'column', py: 2, alignItems: props.alignItems }}>
  <Typography variant="h5" sx={{ marginBottom: 2 }}>{props.title}</Typography>
  {props.subtitle && <Typography variant="body2" sx={{ marginBottom: 2 }}>{props.subtitle}</Typography>}
  {typeof props.children === 'function' ? (props.children as () => JSX.Element)() : props.children}
</Box >

export default AppPage