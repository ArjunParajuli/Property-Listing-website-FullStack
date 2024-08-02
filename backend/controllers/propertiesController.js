import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/badRequestError.js";
import Property from "../models/Property.js";
import NotFoundError from "../errors/notFoundError.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";

const createPropertyController = async (req, res) => {
  const { owner, propertyLocation } = req.body;
  console.log(req.body);
  if (!owner || !propertyLocation)
    throw new BadRequestError("Enter both Owner and Property Location!");
  req.body.createdBy = req.user.userId;
  const property = await Property.create(req.body);
  res.status(StatusCodes.CREATED).json(property);
};

const deletePropertyController = async (req, res) => {
  const { id: propertyId } = req.params;
  const property = await Property.findById(propertyId);

  // check permissions
  checkPermissions(req.user, property.createdBy);

    await Property.findByIdAndDelete(propertyId) // delete from db

    res.status(StatusCodes.OK).json({msg: "Property removed"})
};

const getAllPropertiesController = async (req, res) => {
  const { status, propertyType, search, sort } = req.query;
  let queryObj = { createdBy: req.user.userId }; 
  
  // if status is pending/meeting/declined then add it in the query 
  if(status !== 'all'){
    queryObj.status = status
  }
  // same for propertyType
  if(propertyType !== 'all'){
    queryObj.propertyType = propertyType
  }

  // search location entered by user, use regex for case sensitivity
  // case-insensitive search filter for a property named propertyLocation.
  if(search){
    queryObj.propertyLocation = { $regex: search, $options: 'i' }
  }

  let result = Property.find(queryObj);

  // sort functionality
  if (sort === 'latest') {
    result = result.sort('-createdAt'); // Sorts the results by the createdAt field in descending order.
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('propertyLocation'); // Sorts the results by the position field in ascending order 
  }
  if (sort === 'z-a') {
    result = result.sort('-propertyLocation');
  }

  // we're building the query object first and chaining modifications before executing it. 
  // await keyword will execute the query immediately, so we're using it after all modifications are chained
  const properties = await result;
  res.status(StatusCodes.OK).json({ properties, propertiesLength: properties.length, numOfPages: 1 });
};

const updatePropertyController = async (req, res) => {
  const { id: propertyId } = req.params;
  const property = await Property.findOne({ _id: propertyId });
  if (!property) throw new NotFoundError("Property not found!");

  // check permissions
  checkPermissions(req.user, property.createdBy);

  const updatedProperty = await Property.findOneAndUpdate(
    { _id: propertyId },
    req.body,
    {
      runValidators: true,
    }
  );
  res.json(updatedProperty);
};

const showStatsController = async(req, res) => {
  let stats = await Property.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } }, 
    { $group: { _id: '$status', count: { $sum: 1 }, totalPrice: { $sum: '$price' } } },
  ]);

 // average price of all properties
 let avgPrice = stats.reduce((acc, curr)=>{
  acc += curr.totalPrice
  return acc;
 }, 0);

  // convert this arr to object for easiness in frontend
  stats = stats.reduce((acc, curr)=>{
    const {_id: title, count, totalPrice} = curr;
    acc[title] = {count, totalPrice};
    return acc
  }, {})

  const count = await Property.countDocuments();
 
  // if no jobs found send 0 for all
  const defaultStats = {
    pending: stats.pending || 0,
    meeting: stats.meeting || 0,
    declined: stats.declined || 0,
    propertiesCount: count || 0,
    averagePrice: avgPrice || 0,
  };


  res.status(StatusCodes.OK).json({defaultStats})
};

export {
  createPropertyController,
  deletePropertyController,
  getAllPropertiesController,
  updatePropertyController,
  showStatsController,
};
