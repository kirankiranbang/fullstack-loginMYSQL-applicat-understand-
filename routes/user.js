const express = require('express');
const userController = require('../controllers/userControllers');
const router = express.Router();




//admin/signup for only posting
router.post('/signup',  userController.createUser);
 
//http://localhost:4000/admin/signup-data   related to controllers and using path htmlaxos.get(fetch All data from database)
router.get('/signup-data', userController.getSignupData);

   //http://localhost:4000/admin/signup-data /1..n  (fetch one by one data from database)
router.get('/signup-data/:id', userController.getUserById );


router.delete('/signup/:id', userController.deleteUser);

// http://localhost:4000/admin/signup/${id}
router.put('/signup/:id', userController.updateUser);






module.exports = router;
