const express = require('express');
const router = express.Router();

// Load validation
const validateTimeSheetInput = require('../../validation/timesheet');

// Load TimeSheet model
const TimeSheet = require('../../models/Timesheet');

// @route GET api/timesheet/test
// @desc Test timesheet route
// @access Public

router.get('/test', ( req, res ) => res.json({ msg: 'Users timesheet' }));

// @route GET api/timesheet/all
// @desc get timesheet info
// @access Public

router.get('/all', ( req, res ) => {
    const errors = {};

    TimeSheet.find()
        .then(timesheet => {
            if ( !timesheet ) {
                errors.notimesheet = 'There are no timesheets';
                return res.status(404).json(errors)
            }

            res.json(timesheet)
        })
        .catch(err => res.status(404).json({ msg: 'There are no timesheets' }))
});

// @route POST api/timesheet/start
// @desc create timesheet start
// @access Public

router.post('/start', ( req, res ) => {
    const { errors, isValid } = validateTimeSheetInput(req.body);

    // check validation
    if ( !isValid ) {
        return res.status(400).send(errors);
    }
    // get input value
    const newTimeSheet = new TimeSheet({
        job: req.body.job,
        name: req.body.name
    });

    // save
    newTimeSheet.save().then(timesheet => res.json(timesheet))
});


// @route POST api/timesheet/finish
// @desc create timesheet finish
// @access Public

router.post('/finish', ( req, res ) => {
    const { errors, isValid } = validateTimeSheetInput(req.body);

    // check validation
    if ( !isValid ) {
        return res.status(400).send(errors);
    }

    TimeSheet.findOne(
        {
            $and: [
                { job: req.body.job },
                { name: req.body.name }
            ]
        })
        .then(timesheet => {
            // todo!!! check user does not start work
            // todo!!! block update old data

            // finish time
            timesheet.to = Date.now();

            timesheet.save().then(timesheet => res.json(timesheet))
        })
        .catch(err => res.status(404).send({ msg: 'There is no timesheet data' }))
});

module.exports = router;
