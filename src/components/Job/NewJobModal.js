import React, {useState} from "react";
import {Box, Grid, FilledInput, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, Button, IconButton} from '@material-ui/core';
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
}))

export default props => {

    // const [isOpen,setOpen] = useState(false);

    const classes = myStyle();

    return(
        <Dialog open={false} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    Post Job
                    <IconButton>
                        <Close/>
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FilledInput placeholder="Job Title *" fullWidth disableUnderline></FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                        <Select disableUnderline fullWidth variant='filled' defaultValue="full time">
                            <MenuItem value="full time">Full Time</MenuItem>
                            <MenuItem value="fart time">Part Time</MenuItem>
                            <MenuItem value="contract">Contract</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput placeholder="Company Name *" fullWidth disableUnderline></FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput placeholder="Company URL *" fullWidth disableUnderline></FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                        <Select disableUnderline variant='filled' fullWidth defaultValue="remote">
                            <MenuItem value="remote">Remote</MenuItem>
                            <MenuItem value="in-office">In-Office</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput placeholder="Job Link *" fullWidth disableUnderline></FilledInput>
                    </Grid>

                    <Grid item xs={12}>
                        <FilledInput placeholder="Job Description *" fullWidth multiline rows={4} disableUnderline></FilledInput>
                    </Grid>

                </Grid>

                <Box mt={2}>
                    <Typography>Skills</Typography>
                    <Box display="flex">
                        {skills.map(skill => <Box  className={classes.skillChip} Key={skill}>{skill}</Box>)}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box width="100%" color="red" display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="caption">* Required field!</Typography>
                    <Button variant="contained" disableElevation color="primary">Post Job</Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}