const router = require('express').Router();
const api = require('../services/carAds');
const { mapErrors } = require('../utils/mappers');
const { isUser, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');


router.get('/', async (req, res) => {
    const data = await api.getAll();
    res.json(data).end();
});

router.post('/', isUser(), async (req, res) => {
    const newCarAd = {
        title: req.body.title,
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        description: req.body.description,
        price: req.body.price,
        location: req.body.location,
        phone: req.body.phone,
        img: req.body.img,
        isSwappable: req.body.isSwappable,
        _authorId: req.user._id,
        comments: []
    }

    try {
        const result = await api.create(newCarAd);
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
    res.end();
});

router.get('/:id', preload(), (req, res) => {
    const carAd = res.locals.carAd;
    res.json(carAd).end();
});

module.exports = router;