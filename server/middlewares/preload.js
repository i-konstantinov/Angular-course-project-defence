
const carAdsService = require('../services/carAds');


function preload() {
    return async function (req, res, next) {
        try {
            const carAd = await carAdsService.getById(req.params.id);
            res.locals.carAd = carAd;
            // console.log(res.locals)
            next();
        } catch (err) {
            res.status(404).json({ message: "Record not found" });
        }
    };
}

module.exports = preload;