const router = require('express').Router();
const Thoughts = require('../../model/Thought');
const User = require('../../model/User');

router.get('/', (req, res) => {
    User.find().then(dbData => {
        res.json(dbData);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id).then(dbData => {
        if (!dbData) {
            res.status(404).json('No user by this id');
            return;
        }
        res.json(dbData);
    }).catch(err => res.status(400).json(err));
});

router.post('/', (req, res) => {
    User.create(req.body).then(dbData => {
        res.json(dbData);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.post('/:userID/friends/:friendId', (req, res) => {
    User.findByIdAndUpdate(req.params.userID,
        { $push: { friends: req.params.friendId } },
        { new: true })
        .then(dbData => {
            res.json(dbData);
        }).catch(err => {
            res.status(400).json(err);
        });
});

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(dbData => {
        if (!dbData) {
            res.status(404).json('no user by this id');
            return;
        }
        res.json(dbData);
    }).catch(err => {
        res.status(400).json(err)
    });
});

router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then(dbData => {
        if (!dbData) {
            res.status(404).json('no user by this id');
            return;
        }
        if(dbData.thoughts){
            dbData.thoughts.forEach(thought => {
                Thoughts.findByIdAndDelete(thought).then(dbdata => {
                    res.json('User deleted');
                    return;
                })
            });
        }
        console.log(dbData);
        res.json('User deleted');
    }).catch(err => {
        res.status(400).json(err)
    });
});

router.delete('/:userID/friends/:friendId', (req, res) => {
    User.findByIdAndUpdate(req.params.userID,
        { $pull: { friends: req.params.friendId } },
        { new: true })
        .then(dbData => {
            res.json(dbData);
        }).catch(err => {
            res.status(400).json(err);
        });
});



module.exports = router;