const mongoose =  require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    comments: [String],
    commentCount: Number
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book