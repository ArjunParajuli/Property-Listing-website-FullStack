import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/badRequestError.js";
import Property from "../models/Property.js";

const createPropertyController = async(req, res) =>{
   const {owner, propertyLocation} = req.body;
   console.log(req.body)
   if(!owner || !propertyLocation) throw new BadRequestError("Enter both Owner and Property Location!")
    req.body.createdBy = req.user.userId
   const property = await Property.create(req.body)
   res.status(StatusCodes.CREATED).json(property)
} 

const deletePropertyController = (req, res) =>{
    res.send("Jobs response")
} 

const getAllPropertiesController = (req, res) =>{
    res.send("All Jobs ")
} 

const updatePropertyController = (req, res) =>{
    res.send("Jobs response")
} 

const showStatsController = (req, res) =>{
    res.send("Jobs status")
} 

export {createPropertyController, deletePropertyController, getAllPropertiesController, updatePropertyController, showStatsController}
