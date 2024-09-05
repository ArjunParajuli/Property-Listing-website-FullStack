import express from 'express';
import { createPropertyController, deletePropertyController, getAllPropertiesController, showStatsController, updatePropertyController } from '../controllers/propertiesController.js';
import authenticateUser from '../middlewares/authenticateUser.js';
const router = express.Router();

router.route("/").post(authenticateUser, createPropertyController)
router.route("/").get(authenticateUser, getAllPropertiesController);
// placing the stats route before delete route bcoz it might misunderstand "stats" as the id (NOTE: When a request is made, Express goes through each route in sequence until it finds a match. so order of routes is important)
router.route("/stats").get(authenticateUser, showStatsController)
router.route("/:id").delete(authenticateUser, deletePropertyController).patch(authenticateUser, updatePropertyController)

export default router;