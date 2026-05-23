const express = require("express");
const router = express.Router();

const courseController = require("../controllers/courses.controller");
const { authentication, authorization} = require("../middleware/auth.middleware");
const ROLES = require("../data/roles.constants.json");
const { canAccessResources, isOwnerOrAdmin } = require("../middleware/ownership.middleware");

// /api/course/...
// get all existing courses, needs authentication
router.get("/", 
    authentication,
    courseController.findAll);

// get all existing courses paginated, needs authentication
router.get("/pagination/", 
    authentication,
    courseController.findAllPagination);

// get by course id, needs authentication
router.get("/:id",
    authentication, 
    courseController.findOneById);

// get all course resources, needs authentication
router.get("/resources/:id", 
    authentication,
    canAccessResources,
    courseController.findResources);

// get all courses by tutor, needs authentication
router.get("/filter/:id", 
    authentication,
    courseController.filterByUserId);

// post a new resource only for admins or owner of course
router.post("/resources/:id", 
    authentication,
    isOwnerOrAdmin,
    courseController.saveResource);

router.post("/filter/subject",
    authentication,
    courseController.filterCoursesSubject);

router.post("/filter/name", 
    authentication,
    courseController.filterCoursesName);

// Owner or admin roles needed    
router.patch("/:courseId/resource/:resourceId", 
    authentication,
    isOwnerOrAdmin,
    courseController.updateResource);

router.delete("/:courseId/resource/:resourceId",
    authentication,
    isOwnerOrAdmin, 
    courseController.deleteResource);

router.post(["/"
    //,"/:id"
    ],
    authentication,
    authorization(ROLES.TUTOR),
    courseController.save);

router.delete("/:id",
    authentication,
    isOwnerOrAdmin,
    courseController.deleteById);

module.exports = router;