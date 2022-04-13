const { Schema, model, Types: {ObjectId} } = require('mongoose');


const userSchema = new Schema({
    email: { type: String, required: [true, "Email is required"] },
    hashedPassword: { type: String, required: true },
    phone: { type: String,
        minlength: [10, "Phone number must be at least 10 digits long"],
        validate: {
        validator(value) {
            return value.startsWith('+359') || value.startsWith('0');
        }, message: "Enter a valid phone number"
    } },
    carAds: { type: [ObjectId], default: [], ref: 'CarAd' }
});

// userSchema.index({ email: 1 }, {
//     collation: {
//         locale: 'en',
//         strength: 1
//     }
// });

const User = model("User", userSchema);

module.exports = User;