const router = require('express').Router();
const { isUser, isGuest } = require('../middlewares/guards');
const { register, login, getAddsByAuthorId, logout } = require('../services/users');
const { mapErrors } = require('../utils/mappers');



router.post('/register', isGuest(), async (req, res) => {
    try {
        // if (req.body.password.trim() != req.body.rePass.trim()) {
        //     throw new Error('Passwords don\'t match');
        // } // валидацията е в клиента
        // // нормализация: trim & toLowerCase
        const result = await register(
            req.body.email.trim().toLowerCase(),
            req.body.password.trim(),
            req.body.phone.trim()
            );
        res.status(201).json(result);
        console.log('User REGISTERED');
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
    res.end();
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const result = await login(req.body.email.trim().toLowerCase(), req.body.password.trim());
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
    res.end();
});

router.get('/logout', async (req, res) => {
    console.log('in logout controller')
    console.log(req);
    // logout();
    console.log('User logged-OUT');
    res.end();
});

router.get('/profile',  async (req, res) => {
    try {
        console.log('in user servive GET profile')
        console.log(req.url)
        const result = await getAddsByAuthorId(req.params.id)
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
    res.end();
});

module.exports = router;