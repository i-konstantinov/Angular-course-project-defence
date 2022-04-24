const { model, Schema, Types: { ObjectId } } = require('mongoose');

const schema = new Schema({
    brand: { type: String, minlength: [3, "Brand must be at least 3 symbols long"] },
    model: { type: String, required: true },
    year: { type: Number, validate: {
        validator(value) {
            return value > 1949 && value < 2031;
        }, message: "The year must be between 1950 and 2030"
    } },
    description: { type: String, minlength: [10, "Description must be at least 10 symbols"] },
    price: { type: Number, min: [0, "Price must be a positive number"] },
    location: { type: String, required: true },
    phone: { type: String,
        minlength: [10, "Phone number must be at least 10 digits long"],
        validate: {
        validator(value) {
            return value.startsWith('+359') || value.startsWith('0');
        }, message: "Enter a valid phone number"
    } },
    img: { type: String, required: true },
    isSwappable: { type: Boolean, default: false },
    authorId: { type: ObjectId, ref: "User" },
    comments: { type: [String], default: [] }
});

const CarAd = model('CarAd', schema);
module.exports = CarAd;