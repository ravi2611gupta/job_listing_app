import React, { useState } from 'react'
import {Box, Grid, Select, MenuItem, Button, makeStyles, CircularProgress} from '@material-ui/core';

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

export default (props) => {

    const [loading, setLoading] = useState(false)
    const [jobSearch, setJobSearch] = useState({
        type: 'Full Time',
        location:'Remote',
    })

    const handleChange = e =>{
        e.persist();
        setJobSearch((oldState)=>({ ...oldState, [e.target.name]: e.target.value }) )
    }

    // console.log(jobSearch);

    const search = async () => {
        setLoading(true)
        await props.fetchJobsCustom(jobSearch);
        setLoading(false)
    }

    const classes = styles()

  return (
    <Box p={2} mt={-5} mb={2} className={classes.wrapper}>
        <Select onChange={handleChange} name="type" disableUnderline variant='filled' defaultValue="full time">
            <MenuItem value="full time">Full Time</MenuItem>
            <MenuItem value="part time">Part Time</MenuItem>
            <MenuItem value="contract">Contract</MenuItem>
        </Select>
       
        <Select onChange={handleChange} name="location" disableUnderline variant='filled' defaultValue="remote">
            <MenuItem value="remote">Remote</MenuItem>
            <MenuItem value="in-office">In-Office</MenuItem>
        </Select>

        <Button variant="contained" disabled={loading} color="primary" onClick={search} disableElevation>{loading? <CircularProgress color="secondary" size={22}/>:"Search"}</Button>
    </Box>
  )
}
