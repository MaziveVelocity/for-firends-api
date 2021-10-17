const { Schema, Types, model } = require('mongoose');
const format = require('date-format');

const reactionSchema = new Schema({
    reactionID: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: new Date,
        default: Date.now,
        get: createdAtVal => format(createdAtVal)
    }
}, {
    toJSON: {
        getters: true
    },
    id: false
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        max: 280,
        min: 1
    },
    createdAt: {
        type: new Date,
        default: Date.now,
        get: createdAtVal => format(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

thoughtSchema.virtual('reactionsCount', function () {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts;