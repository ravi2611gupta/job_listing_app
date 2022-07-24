import React, {useState} from "react";
import {Box, Grid, FilledInput, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, Button, IconButton, CircularProgress} from '@material-ui/core';
import theme from "../../theme/theme";
import {Close} from "@material-ui/icons"

const skills = ["Javascript", "React", "Node", "Vue", "Firebase", "MongoDB", "SQL"];


const myStyle = makeStyles(() =>({
    skillChip:{
        margin:theme.spacing(0.5),
        padding:theme.spacing(0.75),
        fontSize:"14.5px",
        borderRadius: "5px",
        transition:".3s",
        cursor: "pointer",
        fontWeight:600,
        border: `1px solid ${theme.palette.secondary.main}`,
        // color:"#fff",
        cursor:"pointer",

        '&:hover':{
            backgroundColor: theme.palette.secondary.main,
            color:"#fff",
        }
    },

    included: {
        backgroundColor: theme.palette.secondary.main,
        color:"#fff",
    },
}))

const initState = {
    title:"",
    type:"full time",
    companyName:"",
    companyUrl:"",
    location:"remote",
    link:"",
    description:"",
    skills:[],
}

export default props => {

    const [loading, setLoading] = useState(false);

    const [jobDetails, setJobDetails] = useState(initState);

    const handleChange = e =>{
        e.persist();
        setJobDetails( oldState=>({ ...oldState, [e.target.name]: e.target.value }) )
    }

   

    const  addRemoveSkills = (skill) => 
        jobDetails.skills.includes(skill)
        ? // removing
        setJobDetails( (oldState)=>({ ...oldState, skills: oldState.skills.filter((s)=> s!== skill),}))
        : // adding
        setJobDetails( (oldState)=>({ ...oldState, skills: oldState.skills.concat(skill)}) )



        // uncomment it to see the changes in jobDetails state🎯🎯🎯🎯
        // console.log(jobDetails);

        const hanadleSubmit = async () => {

            // checking blank fields using for loop
            for(const field in jobDetails){
                // console.log(field);
                // console.log(jobDetails[field]);
                if(typeof jobDetails[field]==="string" && !jobDetails[field])
                    // return console.log("Not Validated");
                    return;
            }
            
            if(!jobDetails.skills.length) return;

            // return console.log("validated");
            setLoading(true)
            await props.postJob(jobDetails);
            setLoading(false)
            setJobDetails(initState)
            props.closeJobModal()
        }

         // jab koi cross button par click kre to form reset ho jae
        const closeModal = () => {
            setJobDetails(initState)
            setLoading(false)
            props.closeJobModal();
        }



    const classes = myStyle();

    return(
        <Dialog open={props.newJobModal} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    Post Job
                    <IconButton onClick={closeModal}>
                        <Close/>
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="title" value={jobDetails.title} autoComplete="off" placeholder="Job Title *" fullWidth disableUnderline></FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                        <Select  onChange={handleChange} name="type" value={jobDetails.type} disableUnderline fullWidth variant='filled'>
                            <MenuItem value="full time">Full Time</MenuItem>
                            <MenuItem value="part time">Part Time</MenuItem>
                            <MenuItem value="contract">Contract</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="companyName" value={jobDetails.companyName} autoComplete="off" placeholder="Company Name *" fullWidth disableUnderline></FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="companyUrl" value={jobDetails.companyUrl} autoComplete="off" placeholder="Company URL *" fullWidth disableUnderline></FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                        <Select  onChange={handleChange} name="location" value={jobDetails.location} disableUnderline variant='filled' fullWidth >
                            <MenuItem value="remote">Remote</MenuItem>
                            <MenuItem value="in-office">In-Office</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="link" value={jobDetails.link} autoComplete="off" placeholder="Job Link *" fullWidth disableUnderline></FilledInput>
                    </Grid>

                    <Grid item xs={12}>
                        <FilledInput onChange={handleChange} name="description" value={jobDetails.description} autoComplete="off" placeholder="Job Description *" fullWidth multiline rows={4} disableUnderline></FilledInput>
                    </Grid>

                </Grid>

                <Box mt={2}>
                    <Typography>Skills</Typography>
                    <Box display="flex">
                        {skills.map(skill => <Box onClick={()=>{addRemoveSkills(skill)}} className={`${classes.skillChip} ${jobDetails.skills.includes(skill) && classes.included}`} key={skill}>{skill}</Box>)}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box width="100%" color="red" display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="caption">* Required field!</Typography>
                    <Button variant="contained" onClick={hanadleSubmit} disabled={loading} disableElevation color="primary"> 
                        {loading? <CircularProgress color="secondary" size={22}/>:"Post Job"}
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}