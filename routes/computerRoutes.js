// require express	
const express = require('express');
const { test, addComputer, getAllComputers, getComputerById, getComputersByBrand, deleteComputerById, updateComputerById } = require('../controllers/computerControllers');

//create a router
const router = express.Router();

// import the computer controller
router.get('/test', test)

router.post('/addComputer', addComputer)

router.get('/getAllComputers', getAllComputers)

// get computer by id
router.get('/getComputerById/:id', getComputerById);

// get computer by brand
router.get('/getComputerByBrand', getComputersByBrand);

// delete computer by id
router.delete('/deleteComputerById/:id', deleteComputerById);

// update computer by id
router.put('/updateComputerById/:id', updateComputerById);

// export the router
module.exports = router;