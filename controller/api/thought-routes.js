const router = require('express').Router();
const Thoughts = require('../../model/Thought')

router.get('/', (req, res) => {
    Thoughts.find().then(dbData => {
        res.json(dbData);
    }).catch(err => {
        res.status(400).json(err)
    });
});

module.exports = router;