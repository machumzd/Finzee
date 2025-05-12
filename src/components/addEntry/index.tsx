import { Stack, TextField } from '@mui/material'
import React from 'react'

const AddEntry = () => {
  return (
    <Stack>
        <h3>Add Entry</h3>
        <TextField 
        label="Title"
        variant="filled"
        />
        <TextField 
        label="Amount"
        variant="filled"
        />
        <TextField 
        label="Type"
        variant="filled"
        />
         <TextField 
        label="Category"
        variant="filled"
        />
        <TextField 
        label="Note (optional)"
        variant="filled"
        />
    </Stack>
  )
}

export default AddEntry