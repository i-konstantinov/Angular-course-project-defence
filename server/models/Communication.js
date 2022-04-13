const { Schema, model, Types: {ObjectId} } = require('mongoose');

const commSchema = new Schema({
    _carAdId: { type: ObjectId, ref: "CarAd" },
    _senderId: { type: ObjectId, ref: "User" },
    posts: { type: [String], default: [] }
});

const Communication = model('Communication', commSchema);
module.exports = Communication;