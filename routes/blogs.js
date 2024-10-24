const express = require("express");
const {
  addBlog,
  allBlogs,
  deleteBlog,
  getSingleBlog,
  editAblog,
  deleteAll,
} = require("../controllers/blogs.js");
const multer = require("multer");

const router = express.Router();

multer({
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./medias/"); // uploads - o deməkdir biz o adda bir folder daxilinə faylları əlavə edəcəyik
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});

router.post("/api/v1/blogs/add", upload.single("thumbnail"), addBlog);
router.get("/api/v1/blogs", allBlogs);
router.delete("/api/v1/blogs/delete/:id", deleteBlog);
getSingleBlog;
router.get("/api/v1/blogs/:id", getSingleBlog);
router.put("/api/v1/blogs/put/:id", upload.single("thumbnail"), editAblog);
router.delete("/api/v1/blogs/deleteAll", deleteAll);

module.exports = router;
