const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');


tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next(); // THIS IS DIFFERENT
});

// usersRouter.get('/', (req, res) => {
//   res.send({
//     users: []
//   });
// });



// UPDATE
tagsRouter.get('/', async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags
  });
});


tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  // read the tagname from the params
    const { tagName } = req.params 
    const taggedPosts = await getPostsByTagName(tagName);

    const myActivePosts = taggedPosts.filter(post => {
      return post.active || (req.user && post.author.id === req.user.id);
    });
  try {
    res.send({
      posts: myActivePosts
   })
    // use our method to get posts by tag name from the db
    // send out an object to the client { posts: // the posts }
  } catch ({ name, message }) {
    next({ name, message })
    // forward the name and message to the error handler
  }
});
module.exports = tagsRouter;