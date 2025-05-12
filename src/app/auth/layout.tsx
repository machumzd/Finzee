import { Stack } from '@mui/material'
import React from 'react'

const LoginLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <Stack sx={{
        height:"100dvh",
        justifyContent:"center",
        alignItems:"center"
    }}>
        {children}
    </Stack>
  )
}

export default LoginLayout