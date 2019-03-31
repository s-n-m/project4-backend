import express from "express";
import passport from "passport";
import models from "../db/models";
const tokenAuth = passport.authenticate("jwt", {
    session: false
});
const User = models.User;

// instantiate a router (mini app that only handles routes)
const router = express.Router();


// get all buildings
router.get('/buildings',tokenAuth, (req, res, next) => {
models.Building.findAll().then(building =>{
    res.status(200).json({
        buildings:building
    });
}).catch(e => console.log(e));

});

//get single building
router.get('/building/:id', (req, res) => {
    models.Building.findByPk(req.params.id).then(building => {
        res.status(200).json({
            building: building
        });
    }).catch(e => console.log(e));
})

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
router.post("/building", tokenAuth, (req, res, next) => {
    models.Building.create(req.body)
        .then(buildingNewFromDb => {
            res.status(201).json({
                building: buildingNewFromDb
            });
        })
        .catch(e => console.log(e));
});


// Update an existing building
router.put("/building/:id", tokenAuth, (req, res, next) => {
    models.Building.findByPk(req.params.id).then(building => {
        building.update({
            location: req.body.location,
            type: req.body.type,
            gender: req.body.gender,
            city: req.body.city,
            image: req.body.image,
            description: req.body.description
        }).then(building => {

            res.status(200).json({
                building: building
            });
        }).catch(e => console.log(e));

    }).catch(e => console.log(e));
});

//Delete
router.delete("/building/:id", tokenAuth, (req, res, next) => {
    models.Building.findByPk(req.params.id)
        .then(building => {
            building.destroy().then(() => {
                res.status(200).json({
                    result: `Record ID ${req.params.id} Delete`,
                    success: true
                });
            })

        })
        .catch(e => console.log(e));
});








export default router;
