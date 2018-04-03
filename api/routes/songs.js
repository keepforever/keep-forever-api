const express = require('express');
const router = express.Router();
const Song = require('../models/song');
const mongoose = require('mongoose');

// .get(url, handler ).  just "/" because any request that reaches this file
// will already have a '/songs' in the url.
// We are, in effect, decorating the instantilized "router" const above.

router.get('/', (req, res, next) => {
  Song.find()
    .select("title artist dateCreated _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        songs: docs.map(doc => {
          return {
            title: doc.title,
            dateCreated: doc.dateCreated,
            artist: doc.artist,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:4000/songs/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
// POST single song title and artist
router.post('/', (req, res, next) => {
  const song = new Song({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    date: new Date(),
    artist: req.body.artist
  });
  song
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Added Song sucessfully",
        createdSong: {
          _id: result._id,
          title: result.title,
          dateCreated: result.dateCreated,
          artist: result.artist,
          request: {
            type: "GET",
            url: "http://localhost:4000/songs/" + result._id
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

//route for individual song. Using :id variable to refrence specific song
router.get('/:songId', (req, res, next) => {
  const id = req.params.songId;
  Song.findById(id)
    .select("title artist _id dateCreated")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          song: doc,
          request: {
            type: "GET",
            url: "http://localhost:4000/songs"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch('/:songId', (req, res, next) => {
  // extract id from req via params property
  res.status(200).json({
    message: 'Congrats, you sent a PATCH request to upadate a song!'
  });
});


router.delete('/:songId', (req, res, next) => {
  // extract id from req via params property
  res.status(200).json({
    message: 'Congrats, you sent a DELETE request!'
  });
});



module.exports = router;
