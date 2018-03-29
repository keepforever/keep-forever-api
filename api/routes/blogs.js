const express = require('express');
const router = express.Router();

// .get(url, handler ).  just "/" because any request that reaches this file
// will already have a '/blogs' in the url.
// We are, in effect, decorating the instantilized "router" const above.

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /blogs'
  });
});

router.post('/', (req, res, next) => {
  const newBlog = {
    _id: Math.random().toFixed(8) * 1000,
    title: req.body.title,
    date: new Date(),
    body: req.body.body
  }
  res.status(200).json({
    message: 'Handling POST requests to /blogs',
    blog: newBlog
  });
});

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
