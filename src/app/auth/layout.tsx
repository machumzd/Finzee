import { Stack } from '@mui/material'
import React from 'react'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <Stack sx={{
        height:"100vh",
        justifyContent:"center",
        alignItems:"center",
        padding:2,
        width:"100%"
    }}>
        {children}
    </Stack>
  )
}

export default AuthLayout