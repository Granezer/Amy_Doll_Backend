const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id: {
        type: String
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        // required: true
    },
    image: {
        type: String
    }
}, {
    toJSON: { virtuals: true }
});

productSchema.pre('save', function (next) {
    if (!this._id) {
        this._id = new mongoose.Types.ObjectId().toString();
    }
    return next();
});

productSchema.virtual('imageURL').get(function () {
    if (this.image && this.image.length > 0) {
        return `data:image/png;base64,${this.image.toString('base64')}`;
    }
    return null;
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
