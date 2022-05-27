const router = require('express').Router();
const { isUser, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const api = require('../services/carAds');
const { mapErrors } = require('../utils/mappers');


router.get('/', async (req, res) => {
    let data;
    if (Object.keys(req.query).length > 0) {
        data = await api.searchAds(req.query);
    } else {
        data = await api.getAll();
    }
    setTimeout(() => {
        res.json(data).end()
    }, 1000);
});


router.post('/', isUser(), async (req, res) => {
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
        authorId: req.user._id,
        comments: []
    }

    try {
        await api.create(newCarAd);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
    
    setTimeout(() => { res.end() }, 1000);
});


router.get('/:id', preload(), async (req, res) => {
    const carAd = await api.getById(req.params.id);
    setTimeout(() => { res.json(carAd).end() }, 1000);
    
});


router.put('/:id', preload(), isOwner(), async (req, res) => {
    const update = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        description: req.body.description,
        price: req.body.price,
        location: req.body.location,
        phone: req.body.phone,
        img: req.body.img,
        isSwappable: req.body.isSwappable
    }
    try {
        await api.updateAd(req.params.id, update);
    } catch(err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }

    setTimeout(() => { res.end() }, 1000);
});


router.delete('/:id', preload(), isOwner(), async (req, res) => {
    try {
        await api.deleteById(req.params.id);
        setTimeout(() => {
            res.status(204);
        }, 1500);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
    setTimeout(() => { res.end() }, 1000);
});


module.exports = router;