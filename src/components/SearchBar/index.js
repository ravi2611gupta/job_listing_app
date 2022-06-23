import React from 'react'
import {Box, Grid, Select, MenuItem, Button, makeStyles} from '@material-ui/core';

const styles = makeStyles({
    wrapper:{
        // border: '1px solid red'
        backgroundColor: "#fff",
        display:"flex",
        boxShadow:"0px 1px 5px rgba(0, 0, 0, 0.1)",
        borderRadius:"5px",
        "& > *" :{
            flex: 1,
            height:"45px",
            margin:"8px",
        },
    },
})

export default function index() {

    const classes = styles()

  return (
    <Box p={2} mt={-5} mb={2} className={classes.wrapper}>
        <Select disableUnderline variant='filled' defaultValue="full time">
            <MenuItem value="full time">Full Time</MenuItem>
            <MenuItem value="fart time">Part Time</MenuItem>
            <MenuItem value="contract">Contract</MenuItem>
        </Select>
       
        <Select disableUnderline variant='filled' defaultValue="remote">
            <MenuItem value="remote">Remote</MenuItem>
            <MenuItem value="in-office">In-Office</MenuItem>
        </Select>

        <Button variant="contained" color="primary" disableElevation>Post a job</Button>
    </Box>
  )
}
