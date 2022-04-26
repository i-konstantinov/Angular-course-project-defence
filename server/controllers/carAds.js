const router = require('express').Router();
const preload = require('../middlewares/preload');
const api = require('../services/carAds');
const { mapErrors } = require('../utils/mappers');


router.get('/', async (req, res) => {
    const data = await api.getAll();
    res.json(data).end();
});

router.post('/', async (req, res) => {
    const newCarAd = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        description: req.body.description,
        price: req.body.price,
        location: req.body.location,
        phone: req.body.phone,
        img: req.body.img,
        isSwappable: req.body.isSwappable,
        authorId: req.body.authorId,
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

router.get('/:id', preload(), async (req, res) => {
    const carAd = await api.getById(req.params.id);
    res.json(carAd).end();
});

module.exports = router;