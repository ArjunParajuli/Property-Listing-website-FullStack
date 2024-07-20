import express from 'express';
import { createPropertyController, deletePropertyController, getAllPropertiesController, showStatsController, updatePropertyController } from '../controllers/propertiesController.js';
const router = express.Router();

router.route("/").post(createPropertyController).get(getAllPropertiesController);
// placing the stats route before delete route bcoz it might misunderstand "stats" as the id (NOTE: When a request is made, Express goes through each route in sequence until it finds a match. so order of routes is important)
router.route("/stats").get(showStatsController)
router.route("/:id").delete(deletePropertyController).patch(updatePropertyController)

export default router;