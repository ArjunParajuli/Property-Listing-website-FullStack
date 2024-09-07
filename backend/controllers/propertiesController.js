import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/badRequestError.js";
import Property from "../models/Property.js";
import NotFoundError from "../errors/notFoundError.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import cloudinary from 'cloudinary';
import {promises as fs} from 'fs';


const createPropertyController = async (req, res) => {
  const { owner, propertyLocation } = req.body;
  if (!owner || !propertyLocation)
    throw new BadRequestError("Enter both Owner and Property Location!");
  req.body.createdBy = req.user.userId;


  if(req.file){
    // console.log(req.file)
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    // console.log(response)

    req.body.avatar = response.secure_url;
    req.body.avatarPublicId = response.public_id

    // remove locally stored file now
    await fs.unlink(req.file.path)
  }

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
  // let queryObj = { createdBy: req.user.userId }; 
  let queryObj;
  // console.log(req.query)

  // if status is pending/meeting/declined then add it in the query 
  if(status && status !== 'all'){
    queryObj.status = status
  }
  // same for propertyType
  if(propertyType && propertyType !== 'all'){
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


// pagination logic
const page = Number(req.query.page) || 1
const limit = Number(req.query.limit) || 10
const skip = (page-1)*10;

result.skip(skip).limit(limit)

  // we're building the query object first and chaining modifications before executing it. 
  // await keyword will execute the query immediately, so we're using it after all modifications are chained
  const properties = await result;

  const totalProperties = await Property.countDocuments(queryObj);
  const numOfPages = Math.ceil(totalProperties/limit)

  res.status(StatusCodes.OK).json({ properties, totalProperties, numOfPages });
};

const updatePropertyController = async (req, res) => {
  const { id: propertyId } = req.params;
  const property = await Property.findOne({ _id: propertyId });
  if (!property) throw new NotFoundError("Property not found!");

  // check permissions(authorization)
  checkPermissions(req.user, property.createdBy);

  const { owner, price, propertyLocation, propertyType, status } = req.body;
  property.owner = owner;
  property.price = price;
  property.propertyLocation = propertyLocation;
  property.propertyType = propertyType;
  property.status = status;

if(req.file){

  // delete previous image from cloudinary
  if(property.avatarPublicId){
    await cloudinary.v2.uploader.destroy(property.avatarPublicId)
  }

  // upload new image to cloudinary
  const response = await cloudinary.v2.uploader.upload(req.file.path);

  // update avatar url and avatarPublicId 
  property.avatar = response.secure_url;
  property.avatarPublicId = response.public_id;

  // remove the locally stored image now
  await fs.unlink(req.file.path);
}

  const updatedProperty = await Property.findOneAndUpdate(
    { _id: propertyId },
    property,
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
