const pageNotFound = (req, res) =>{
    res.status(404).send("<h1>Page Not Found!</h1>")
}

export default pageNotFound