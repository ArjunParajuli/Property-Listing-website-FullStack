import UnAuthenticatedError from "../errors/unAuthenticatedError.js";

const checkPermissions = (reqUser, propertyCreatedBy) =>{
    // alow admin 
    // if(reqUser.role === 'admin') return;

    // userId and createdBy are same, so allow update
    if(reqUser.userId === propertyCreatedBy.toString()) return;

    throw new UnAuthenticatedError("Not Authorized to access!")

}

export default checkPermissions