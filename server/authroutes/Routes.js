const express = require('express');
const router = express.Router();
const { addtodo, getlist , deletelist, updatelist, updateCheck} = require('../authcontroller/controllers.js');

router.route('/server/addtodo').post(addtodo).get(getlist);

router.route('/server/addtodo/:id').delete(deletelist);

router.route('/server/addtodo/:id/:to').patch(updatelist);

router.route('/server/update/:id/:check').patch(updateCheck);
module.exports = router;
