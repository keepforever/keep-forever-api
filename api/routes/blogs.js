const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const mogoose = require('mongoose');

// .get(url, handler ).  just "/" because any request that reaches this file
// will already have a '/blogs' in the url.
// We are, in effect, decorating the instantilized "router" const above.

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /blogs'
  });
});

router.post('/', (req, res, next) => {
  const blog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    date: new Date(),
    body: req.body.body
  });
  blog
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created blog sucessfully",
        createdBlog: {
          _id: result._id,
          title: result.title,
          date: result.date,
          body: result.body,
          request: {
            type: "GET",
            url: "http://localhost:3000/blogs/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
///// previousl placeholder GET response /////
// res.status(200).json({
//   message: 'Handling POST requests to /blogs',
//   blog: newBlog
// });

//route for individual blog. Using :id variable to refrence specific blog
router.get('/:blogId', (req, res, next) => {
  // extract id from req via params property
  const id = req.params.blogId
  if (id === 'special') {
    res.status(200).json({
      message: 'You discovered the SPECIAL id',
      id: id
    });
  } else {
    res.status(200).json({
      message: 'You passed an ID'
    })
  }
});

router.patch('/:blogId', (req, res, next) => {
  // extract id from req via params property
  res.status(200).json({
    message: 'you sent a PATCH request, UPDATED BLOG'
  });
});

router.patch('/:blogId', (req, res, next) => {
  // extract id from req via params property
  res.status(200).json({
    message: 'you sent a PATCH request, UPDATED BLOG'
  });
});

router.delete('/:blogId', (req, res, next) => {
  // extract id from req via params property
  res.status(200).json({
    message: 'you sent a DELETE request'
  });
});



module.exports = router;
