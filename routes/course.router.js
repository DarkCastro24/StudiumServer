const express = require("express");
const router = express.Router();

const courseController = require("../controllers/courses.controller");

// /api/course/...
router.get("/", 
    courseController.findAll);

router.get("/pagination/", 
    courseController.findAllPagination);

router.get("/:id", 
    courseController.findOneById);

router.get("/resources/:id", 
    courseController.findResources);

router.get("/filter/:id", 
    courseController.filterByUserId);

router.post("/resources/:id", 
    courseController.saveResource);

router.post("/filter/subject", 
    courseController.filterCoursesSubject);

router.post("/filter/name", 
    courseController.filterCoursesName);
    
router.patch("/:courseId/resource/:resourceId", 
    courseController.updateResource);

router.delete("/:courseId/resource/:resourceId", 
    courseController.deleteResource);

router.post(["/","/:id"], 
    courseController.save);

router.delete("/:id",
    courseController.deleteById);

module.exports = router;