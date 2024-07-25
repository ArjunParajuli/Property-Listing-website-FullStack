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

const deletePropertyController = async(req, res) =>{

    
} 

const getAllPropertiesController = async(req, res) =>{
    const properties = await Property.find({createdBy: req.user.userId})
    console.log(properties)
    res.status(StatusCodes.OK).json({properties, propertiesLength: properties.length, numOfPages: 1})
} 

const updatePropertyController = (req, res) =>{
    res.send("Jobs response")
} 

const showStatsController = (req, res) =>{
    res.send("Jobs status")
} 

export {createPropertyController, deletePropertyController, getAllPropertiesController, updatePropertyController, showStatsController}
