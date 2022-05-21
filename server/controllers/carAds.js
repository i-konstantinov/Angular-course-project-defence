const router = require('express').Router();
const { isUser, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const api = require('../services/carAds');
const { updateUserAds } = require('../services/users');
const { mapErrors } = require('../utils/mappers');


router.get('/', async (req, res) => {
    const data = await api.getAll();
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
        const result = await api.create(newCarAd);
        await updateUserAds(result.authorId, result._id);
        setTimeout(() => {
            res.status(201).json(result);
        }, 2000);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
    res.end();
});

router.get('/:id', preload(), async (req, res) => {
    const carAd = await api.getById(req.params.id);
    setTimeout(() => { res.json(carAd).end(); }, 1000);
    
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
        const result = await api.updateAd(req.params.id, update);
        setTimeOut(() => {
            res.json(result);
        }, 2000 );
    } catch(err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
    res.end();
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
    res.end();
});

module.exports = router;