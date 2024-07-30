import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/badRequestError.js";
import Property from "../models/Property.js";
import NotFoundError from "../errors/notFoundError.js";
import checkPermissions from "../utils/checkPermissions.js";

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
  const properties = await Property.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ properties, propertiesLength: properties.length, numOfPages: 1 });
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

const showStatsController = (req, res) => {
  res.send("Jobs status");
};

export {
  createPropertyController,
  deletePropertyController,
  getAllPropertiesController,
  updatePropertyController,
  showStatsController,
};
