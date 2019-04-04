"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _models = require("../db/models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tokenAuth = _passport2.default.authenticate("jwt", {
    session: false
});
var User = _models2.default.User;

// instantiate a router (mini app that only handles routes)
var router = _express2.default.Router();

// get all buildings
router.get('/buildings', tokenAuth, function (req, res, next) {
    _models2.default.Building.findAll({ include: [{ model: _models2.default.User }] }).then(function (building) {
        res.status(200).json({
            buildings: building
        });
    }).catch(function (e) {
        return console.log(e);
    });
});

//get single building
router.get('/building/:id', function (req, res) {
    _models2.default.Building.findByPk(req.params.id, {
        include: [{
            model: _models2.default.User
        }]
    }).then(function (building) {
        res.status(200).json({
            building: building
        });
    }).catch(function (e) {
        return console.log(e);
    });
});

// // Get All buildings by user record ID
// router.get('user/:id/buildings', (req, res) => {
//     models.User.findByPk(req.params.id, {
//         include: [{
//             model: models.Building
//         }]
//     }).then(user => {
//         res.status(200).json({
//             user: user
//         });
//     });
// });


//Create new building
router.post("/building", tokenAuth, function (req, res, next) {
    _models2.default.Building.create({
        location: req.body.building.location,
        city: req.body.building.city,
        type: req.body.building.type,
        image: req.body.building.image,
        user_id: req.user.id,
        gender: req.body.building.gender,
        description: req.body.building.description
    }).then(function (buildingNewFromDb) {
        res.status(201).json({
            building: buildingNewFromDb
        });
    }).catch(function (e) {
        return console.log(e);
    });
});

// Update an existing building
router.put("/building/:id", tokenAuth, function (req, res, next) {
    _models2.default.Building.findByPk(req.params.id).then(function (building) {
        building.update({
            location: req.body.building.location,
            type: req.body.building.type,
            gender: req.body.building.gender,
            city: req.body.building.city,
            image: req.body.building.image,
            description: req.body.building.description
        }).then(function (building) {

            res.status(200).json({
                building: building
            });
        }).catch(function (e) {
            return console.log(e);
        });
    }).catch(function (e) {
        return console.log(e);
    });
});

//Delete
router.delete("/building/:id", function (req, res, next) {
    // console.log(req.user.id)
    _models2.default.Building.findByPk(req.params.id).then(function (building) {
        building.destroy().then(function () {
            res.status(200).json({
                result: "Record ID " + req.params.id + " Delete",
                success: true
            });
        });
    }).catch(function (e) {
        return console.log(e);
    });
});

exports.default = router;