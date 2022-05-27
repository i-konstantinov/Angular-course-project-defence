const router = require('express').Router();
const { isUser, isGuest } = require('../middlewares/guards');
const { register, login, getAddsByAuthorId, logout, getUserByEmail } = require('../services/users');
const { mapErrors } = require('../utils/mappers');



router.post('/register', async (req, res) => {
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
        console.log('User REGISTERED and user data passed to client');
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

router.get('/logout', isUser(), async (req, res) => { 
    const token = req.user.token;
    logout(token);
    res.end();
});

router.get('/myads', isUser(), async (req, res) => {
    try {
        const result = await getAddsByAuthorId(req.user._id)
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
    res.end();
});

router.get('/info', isUser(), async (req, res) => {
    try {
        const user = await getUserByEmail(req.user.email);
        res.json(user);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
    res.end();
});


module.exports = router;