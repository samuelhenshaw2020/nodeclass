const { findOne } = require("../models/Comment");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports.CreatePost = async (req, res)=>{

    // validator

    const {title, body } = req.body;
    try {
        const post = await new Post({
            title: title,
            body: body,
            users: req.user._id,
            genre: ["C++", "Golang", "Tech"]
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
        // const posts = await Post.aggregate([
        //     {
        //         $match: {'title': {$regex}}
        //     },
        //     {
        //         $limit: 3
        //     },
        //     {
        //         $project: {"title": 1, genre: 1},
        //     },

        //     {
        //         $sample: {
        //             size: 2
        //         }
        //     }
            
        // ])
        const posts = await Post.find({'title': {$regex: /food/, $options: "i"}}).limit(1)
        res.status(201).json(posts)
    } catch (error) {
        return res.status(500).json({message: "error occured"})
    }
}

module.exports.IncreaseUserLikes = async (req, res)=>{
    // validator
    try {
        await Post.findOneAndUpdate(
            {"_id": "639af09de12d69cac4f7da61"},
            {
               $inc: {
                "likes": -1
               }
            }
        )
        res.status(201).json({message: "increased"})
    } catch (error) {
        return res.status(500).json({message: "error occured"})
    }
}

module.exports.AddGenre = async (req, res)=>{
    // validator
    try {
        await Post.findOneAndUpdate(
            {"_id": "639af09de12d69cac4f7da61"},
            {
                $push: {
                    "genre": req.body.genre
                }
            }
        )
        res.status(201).json({message: "Genre added"})
    } catch (error) {
        return res.status(500).json({message: "error occured"})
    }
}

module.exports.GetAllComments = async (req, res)=>{
    // validator
    try {
        const comments = await Comment.find({}).populate("users").populate("posts")
        res.status(201).json(comments)
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