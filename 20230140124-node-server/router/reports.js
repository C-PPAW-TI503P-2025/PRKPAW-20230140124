const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportController");
const { checkAdmin, addUserData } = require("../middleware/permissionMiddleware");

router.use(checkAdmin);

router.get("/daily", reportController.getDailyReport);
router.get("/by-date", [addUserData, checkAdmin], reportController.getDailyReportByDate);

module.exports = router;
