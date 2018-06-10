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
        return res.status(400).json(errors);
    }

    // todo!! check user already worked
    TimeSheet.find(
        {
            $and: [
                { job: req.body.job },
                { name: req.body.name }
            ]
        })
        .sort({ from: -1 })
        .limit(1)
        .then(timesheet => {
            // return res.send(timesheet);

            // get request value
            const newTimeSheet = new TimeSheet({
                job: req.body.job,
                name: req.body.name
            });

            // if timesheet record not found
            if ( timesheet.length === 0 ) {
                // save
                return newTimeSheet.save().then(() => res.json({ msg: 'Save success' }))
            }

            if ( !timesheet[0].to ) {
                return res.status(400).json({ msg: 'This user already worked' })
            }
            // save
            newTimeSheet.save().then(() => res.json({ msg: 'Save success' }))
        })
        .catch(err => res.status(404).json({ msg: 'Not found' }))
});


// @route POST api/timesheet/finish
// @desc create timesheet finish
// @access Public

router.post('/finish', ( req, res ) => {
    const { errors, isValid } = validateTimeSheetInput(req.body);

    // check validation
    if ( !isValid ) {
        return res.status(400).json(errors);
    }

    TimeSheet.findOne(
        {
            $and: [
                { job: req.body.job },
                { name: req.body.name }
            ]
        })
        .sort({ from: -1 })
        .limit(1)
        .then(timesheet => {
            // return res.send(timesheet);

            if ( timesheet.to ) {
                return res.status(400).json({ msg: 'This user already finished work' })
            }
            // finish time
            timesheet.to = Date.now();

            timesheet.save().then(() => res.json({ msg: 'Save success' }))
        })
        .catch(err => res.status(404).json({ msg: 'There is no timesheet data' }))
});

module.exports = router;
