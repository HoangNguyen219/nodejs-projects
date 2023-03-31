const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        require: [true, 'Please provide rating'],
        min: 1,
        max: 5
    },
    title: {
        type: String,
        trim: true,
        require: [true, 'Please provide review title'],
        maxlength: 100
    },
    comment: {
        type: String,
        require: [true, 'Please provide review text'],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        require: true
    },
},
    { timestamps: true }
)
ReviewSchema.index({ product: 1, user: 1 }, { unique: true })
module.exports = mongoose.model('Review', ReviewSchema)