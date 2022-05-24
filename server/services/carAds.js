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


async function searchAds(query) {
    console.log(query)
    let result = await CarAd.find({});

    result = stringSearch({
        brand: query.brand,
        model: query.model,
        location: query.location
    }, result);

    result = numberRangeSearch({
        minYear: query.minYear,
        maxYear: query.maxYear,
        minPrice: query.minPrice,
        maxPrice: query.maxPrice,
    }, result);

    if (query.isSwappable == 'true') {
        result = result.filter(ad => ad.isSwappable == true);
    }

    // console.log(result);
    return result;
}


module.exports = {
    create,
    getAll,
    getById,
    updateAd,
    deleteById,
    commentAd,
    searchAds
}

function stringSearch(query, records) {
    Object.entries(query).forEach(param => {
        let [prop, value] = param;
        records = records.filter(ad => ad[prop].toLowerCase().includes(value.toLowerCase()));
    });
    return records;
}

function numberRangeSearch(query, records) {
    Object.entries(query).forEach(param => {
        let [searchProp, value] = param;

        if (searchProp.startsWith('min') && value != '') {
            const prop = searchProp.substring(3).toLowerCase();
            const number = Number(value);
            records = records.filter(ad => ad[prop] >= number);
        }

        if (searchProp.startsWith('max') && value != '') {
            const prop = searchProp.substring(3).toLowerCase();
            const number = Number(value);
            records = records.filter(ad => ad[prop] <= number);
        }
    });
    return records;
}