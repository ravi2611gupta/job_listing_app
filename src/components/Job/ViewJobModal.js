import React from "react";
import {Box, Grid, FilledInput, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, Button, IconButton, CircularProgress} from "@material-ui/core";
import {Close, Close as CloseIcon, GridOn} from '@material-ui/icons'
import { format } from "date-fns";
import theme from "../../theme/theme";



const useStyles = makeStyles((theme) => ({
    info:{
        '& > *':{
            margin: '4px'
        },
    },

    skillChip:{
        margin:theme.spacing(0.5),
        padding:theme.spacing(0.75),
        fontSize:"14.5px",
        borderRadius: "5px",
        transition:".3s",
        cursor: "pointer",
        fontWeight:600,
        backgroundColor: theme.palette.secondary.main,
        color:"#fff",
    },
}));

export default (props) => {

const classes = useStyles();

return(
    <Dialog open={!!Object.keys(props.job).length} fullWidth>
        <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                {props.job.title} @ {props.job.companyName}
                <IconButton>
                    <Close onClick={props.closeModal}/>
                </IconButton>
            </Box>
        </DialogTitle>
        <DialogContent>
            <Box>
                <Box className={classes.info} display="flex">
                    <Typography variant="caption">Posted On:&nbsp;</Typography>
                    <Typography variant="body2">{props.job.postedOn && format(props.job.postedOn, 'dd/MMM/yyyy HH:MM')}</Typography>
                </Box>
                <Box className={classes.info} display="flex">
                    <Typography variant="caption">Job Type:&nbsp;</Typography>
                    <Typography variant="body2">{props.job.type}</Typography>
                </Box>
                <Box className={classes.info} display="flex">
                    <Typography variant="caption">Job Location:&nbsp;</Typography>
                    <Typography variant="body2">{props.job.location}</Typography>
                </Box>
                <Box className={classes.info} display="flex">
                    <Typography variant="caption">Job Description:&nbsp;</Typography>
                    <Typography variant="body2">{props.job.description}</Typography>
                </Box>
                <Box className={classes.info} display="flex">
                    <Typography variant="caption">Company Name:&nbsp;</Typography>
                    <Typography variant="body2">{props.job.companyName}</Typography>
                </Box>
                <Box className={classes.info} display="flex">
                    <Typography variant="caption">Company Website:&nbsp;</Typography>
                    <Typography variant="body2">{props.job.companyUrl}</Typography>
                </Box>
                <Box ml={.5}>
                    <Typography variant="caption">Skills:&nbsp;</Typography>
                    <Grid container alignItems="center">
                        {
                            props.job.skills && props.job.skills.map((skill)=>{
                                return(
                                    <Grid item key={skill} className={classes.skillChip}>
                                        {skill}
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Box>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" component="a" href={props.job.link} target='_blank'>Apply</Button>
        </DialogActions>
    </Dialog>
)
}