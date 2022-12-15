const {Router} = require("express");
const { CreatePost, GetAllPost, AddCommentToPost } = require("../controllers/PostController");
const auth = require("../middlewares/auth");

const router =  Router();

router.post("/create",[auth] ,CreatePost)
router.get("/all", [auth], GetAllPost)
router.post("/comment", [auth], AddCommentToPost)

module.exports = router;