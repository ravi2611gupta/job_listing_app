import React, {useEffect, useState} from "react";
import { Box, Button, CircularProgress, Grid, ThemeProvider } from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header/";
import SearchBar from "./components/SearchBar/";
import JobCard from "./components/Job/JobCard";
import NewJobModal from "./components/Job/NewJobModal";
import ViewJobModal from "./components/Job/ViewJobModal";
import { myFirestore, app } from "./firebase/config";
// import jobData from "./dummyData";
import {Close, Close as CloseIcon} from '@material-ui/icons'

export default (props) => {

  const [newJobModal,setNewJobModal] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customSearch, setCustomSearch] = useState(false);
  const [viewJobs, setViewJobs] = useState({});

  const fetchJobs = async () => {
    setLoading(true);
    setCustomSearch(false);
    const req = await myFirestore.collection('jobs').orderBy('postedOn', 'desc').get();
    // console.log(req);
    // const tempJob = req.docs.forEach( job=>console.log(job.data()) )
    const tempJobs = req.docs.map( (job)=> ( {...job.data(), id:job.id, postedOn:job.data().postedOn.toDate()} )); //⬅️⬅️⬅️ using database id as id and solving postedOn (overriding the value)
    // console.log(tempJobs);
    setJobs(tempJobs);
    setLoading(false);
  }




  const fetchJobsCustom = async(jobSearch) => {
    setLoading(true);
    setCustomSearch(true)
    const req = await myFirestore.collection('jobs').orderBy('postedOn', 'desc').where('type', '==', jobSearch.type).where('location', '==', jobSearch.location).get();
    // console.log(req);
    // const tempJob = req.docs.forEach( job=>console.log(job.data()) )
    const tempJobs = req.docs.map( (job)=> ( {...job.data(), id:job.id, postedOn:job.data().postedOn.toDate()} )); //⬅️⬅️⬅️ using database id as id and solving postedOn (overriding the value)
    // console.log(tempJobs);
    setJobs(tempJobs);
    setLoading(false);
  }



  useEffect(()=>{
    fetchJobs();
  }, [])



  // adding data in firebase.
  const postJob = async jobDetails =>{
    await myFirestore.collection('jobs').add({...jobDetails, postedOn: app.firestore.FieldValue.serverTimestamp()})
    fetchJobs();
  }

  return <ThemeProvider theme={theme}>
    <Header openJobModal={()=>setNewJobModal(true)} />

    {/* New Job Modal */}
    <NewJobModal closeJobModal={()=>setNewJobModal(false)} newJobModal={newJobModal} postJob={postJob} />
    
    {/* View Job Modal */}
    <ViewJobModal job={viewJobs} closeModal={()=>{setViewJobs({})}} />


    <Box mb={3}>
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <SearchBar fetchJobsCustom={fetchJobsCustom} />
          
          {
            loading? (<Box display="flex" justifyContent="center"><CircularProgress/></Box>) : (
              <>
                {customSearch && 
                (<Box display="flex" justifyContent="flex-end" my={2}>
                <Button onClick={fetchJobs}>
                  <Close size={20} /> Custom Search
                </Button>
              </Box>)}
              {jobs.map((job) => (<JobCard open={()=>{setViewJobs(job)}} key={job.id} {...job} />))}
                
              </>
              )}

          {/* {jobData.map(job => <JobCard key={job.id} {...job} />)} */}

          
        </Grid>
      </Grid>
    </Box>
  </ThemeProvider>
};
