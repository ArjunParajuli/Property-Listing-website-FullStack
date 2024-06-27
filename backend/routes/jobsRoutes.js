import express from 'express';
import { createJobController, deleteJobController, getAllJobsController, showStatsController, updateJobController } from '../controllers/jobsController.js';
const router = express.Router();

router.route("/").post(createJobController).get(getAllJobsController);
// placing the stats route before delete route bcoz it might misunderstand "stats" as the id (NOTE: When a request is made, Express goes through each route in sequence until it finds a match. so order of routes is important)
router.route("/stats").get(showStatsController)
router.route("/:id").delete(deleteJobController).patch(updateJobController)

export default router;