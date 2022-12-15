const {Router} = require("express");
const { CreatePost, GetAllPost, AddCommentToPost, GetAllComments, AddGenre, IncreaseUserLikes } = require("../controllers/PostController");
const auth = require("../middlewares/auth");

const router =  Router();

router.post("/create",[auth] ,CreatePost)
router.post("/all", [auth], GetAllPost)
router.post("/comment", [auth], AddCommentToPost)
router.get("/comment", [auth], GetAllComments)
router.put("/genre", [auth], AddGenre)
router.get("/like", [auth], IncreaseUserLikes)



module.exports = router;