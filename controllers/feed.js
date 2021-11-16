const Post = require('../models/post');

exports.getPosts = (req,res,next) => {
   Post.find().then(posts => {
       res.status(200).json({
         message:"Post fetched sucessfully",
         posts:posts
       })
   }).catch(error => {
      console.log(error);
   })
}

exports.createPosts = (req,res,next) => {
    let title = req.body.title;
    let content = req.body.content;
    let imageUrl = req.file.path;
    console.log(imageUrl);
    console.log(content);
    let post = new Post({
      title:title,
      content:content,
      imageUrl:imageUrl,
      creator:{
        name:"Jawad"
      }

    })
    post.save().then(result => {
      console.log(result);
      res.status(201).json({
        message:"Post Created Sucessfully",
        post:result
      });
    }).catch(error => {
      console.log(error)
    })
}
exports.singlePost = (req,res,next) => {
  const postId = req.params.postId;
  Post.findById(postId).then(posts => {
    res.status(200).json({
      message:"Post fetched",
      post:posts
    })
  })
  .catch(error => {
    console.log(error);
  })
}
exports.deletePost = (req,res,next) => {
  const postId = req.params.postId;
  Post.findByIdAndRemove(postId).then(result => {
     res.json({
       message:"Deleted Sucessfully"
     })
  }).catch(error => {
    console.log(error);
  })
}

exports.updatePost = (req,res,next) => {
   const postId = req.params.postId;
   let title = req.body.title;
   let content = req.body.content;
   Post.findById(postId).then(post => {
        post.title = title;
        post.content = content;
        return post.save()
   }).then(result => {
     res.status(200).json({
       message:"Post Updated",
       post:result
     })
   })
   .catch(error => {
     console.log(error);
   })
}