const { Router } = require('express');
const router = Router();
const { getTipos} = require('../controllers/tipo')

router.get('/', async (req, res) => {
    try {
        const result = await getTipos();
        return res.json(result)

    } catch (error) {
        console.log(error)
    }
})

module.exports = router