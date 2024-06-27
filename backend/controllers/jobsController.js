const createJobController = (req, res) =>{
    res.send("Create Jobs response")
} 

const deleteJobController = (req, res) =>{
    res.send("Jobs response")
} 

const getAllJobsController = (req, res) =>{
    res.send("All Jobs ")
} 

const updateJobController = (req, res) =>{
    res.send("Jobs response")
} 

const showStatsController = (req, res) =>{
    res.send("Jobs status")
} 

export {createJobController, deleteJobController, updateJobController, getAllJobsController, showStatsController}
