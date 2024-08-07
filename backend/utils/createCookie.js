const createCookie = ({res, jwtToken}) =>{
    // send cookie to the client (happens automatically)
    const oneDay = 1000 * 60 * 60 * 24; // 1000ms=1s so 1sec * 60 = 1 min & so on
    res.cookie('jwtToken', jwtToken, {
        httpOnly: true,
        expires: new Date(Date.now()+oneDay),
        secure: process.env.NODE_ENV==='production'
    })
}

export default createCookie