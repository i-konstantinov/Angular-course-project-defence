const CarAd = require('../models/CarAd');


async function create(car) {
    const result = new CarAd(car)
    await result.save();
    return result;
}

async function getAll() {
    return CarAd.find({});
}

async function getById(id) {
    return CarAd.findById(id);
}


async function updateAd(id, data) {
    const existing = await CarAd.findById(id);
    
    existing.brand = data.brand;
    existing.model = data.model;
    existing.year = data.year;
    existing.description = data.description;
    existing.price = data.price;
    existing.location = data.location;
    existing.phone = data.phone;
    existing.img = data.img;
    existing.isSwappable = data.isSwappable;
    await existing.save();
    return existing;
}

async function commentAd(id, text) {
    const existing = await CarAd.findById(id);
    existing.comments.push(text);
    await existing.save();
    return existing;
}

async function deleteById(id) {
    await CarAd.findByIdAndDelete(id);
} 


module.exports = {
    create,
    getAll,
    getById,
    updateAd,
    deleteById,
    commentAd
}