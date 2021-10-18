const router = require('express').Router();
const Thoughts = require('../../model/Thought');
const User = require('../../model/User');

router.get('/', (req, res) => {
    Thoughts.find().then(dbData => {
        res.json(dbData);
    }).catch(err => {
        res.status(400).json(err)
    });
});

router.get('/:id', (req, res) => {
    Thoughts.findById(req.params.id).then(dbData => {
        if (!dbData) {
            res.status(404).json('No thought by this id');
            return;
        }
        res.json(dbData);
    }).catch(err => {
        res.status(400).json(err)
    });
});

router.post('/', (req, res) => {
    Thoughts.create(req.body).then(dbData => {
        console.log(req.body.userId)
        User.findByIdAndUpdate(req.body.userId,
            { $push: { thoughts: dbData._id } },
            { new: true }).then(thoughtData => {
                res.json(thoughtData);
            }).catch(err => res.status(400).json(err))
    }).catch(err => {
        res.status(400).json(err)
    });
});

router.post('/:thoughtId/reactions', (req, res) => {
    Thoughts.findByIdAndUpdate(req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true })
        .then(dbData => {
            res.json(dbData);
        }).catch(err => {
            res.status(400).json(err);
        });
});

router.put('/:id', (req, res) => {
    Thoughts.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(dbData => {
        if (!dbData) {
            res.status(404).json('No thought by this id');
            return;
        }
        res.json(dbData);
    }).catch(err => {
        res.status(400).json(err)
    });
});

router.delete('/:id', (req, res) => {
    Thoughts.findByIdAndDelete(req.params.id).then(dbData => {
        if (!dbData) {
            res.status(404).json('no thought by this id');
            return;
        }
        res.json('Thought deleted.')
    }).catch(err => {
        res.status(400).json(err)
    });
});

router.delete('/:thoughtId/reactions/:reactionID', (req, res) => {
    Thoughts.findByIdAndUpdate(req.params.thoughtId,
        { $pull: { reactions: { reactionID: req.params.reactionID} } },
        { new: true, safe: true, multi: true })
        .then(dbData => {
            res.json(dbData);
        }).catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;