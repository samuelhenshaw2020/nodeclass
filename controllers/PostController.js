const Comment = require("../models/Comment");
const Post = require("../models/Post");

module.exports.CreatePost = async (req, res)=>{

    // validator

    const {title, body } = req.body;
    try {
        const post = await new Post({
            title: title,
            body: body,
            users: req.user._id
        }).save();
        res.status(201).json({message: "Post Created", post})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "error occured"})
    }
}

// module.exports.GetPostByUser = async (req, res)=>{

//     // validator
//     try {
//         const posts = 
//         res.status(201).json({message: "Post Created", post})
//     } catch (error) {
//         return res.status(500).json({message: "error occured"})
//     }
// }

module.exports.GetAllPost = async (req, res)=>{

    // validator
    try {
        const posts = await Post.find({"users": req.user._id})
        res.status(201).json(posts)
    } catch (error) {
        return res.status(500).json({message: "error occured"})
    }
}

module.exports.AddCommentToPost = async (req, res)=>{

    // validator

    const {body, post_id} = req.body
    try {
        const comment = await new Comment({
            "body": body,
            users: req.user._id,
            posts: post_id
        }).save()
        res.status(201).json({message: "Comment Added"})
    } catch (error) {
        return res.status(500).json({message: "error occured"})
    }
}