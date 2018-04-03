const mongoose = require('mongoose')

// Schema tells mongoose what a saved "Blog" should look like

const songSchema = mongoose.Schema({
    _id:   mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    artist:  {type: String, required: true },
    dateCreated:  {type: Date, default: Date.now }
});

// Schema is like layout, what a blog should look like.
// model function takes two arguments: (1) 'Blog' is the name of the model
// as you would like to use it internally. (2) Schema (here, productSchema)
// which specifies the properties that the model being defined should have.
// based on Schema defined above
module.exports = mongoose.model('Song', songSchema)
// 'Product', name of model as you want to use it internally
