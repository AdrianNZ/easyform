const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TimeSheetSchema = new Schema({
    job: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    from: {
        type: Date,
        default: Date.now()
    },
    to: {
        type: Date
    },

});

module.exports = User = mongoose.model('timesheet', TimeSheetSchema);