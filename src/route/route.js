'use strict';
const { Router } = require('express');
const { Notes, Tasks } = require('../controllers/controllersIndex');
const { isAuthenticated , isNotAuthenticated } = require('../helpers/auth')
const router = Router();

router.get('/', Notes.Notes.getAll);
router.get('/login' , isNotAuthenticated , Notes.Notes.getLogin);
router.get('/register' , isNotAuthenticated,  Notes.Notes.getRegister);
router.post('/newusers', Notes.Notes.addUser)
router.get('/OneUser/:id', isAuthenticated , Notes.Notes.getOneUser);
router.put('/UserUpdate/:id', isAuthenticated, Notes.Notes.getUpdateUser);
router.delete('/UserDelete/:id', isAuthenticated,  Notes.Notes.getDeleteUser);
router.post('/signing' , Notes.Notes.signing)
router.get('/about', Notes.Notes.sendAbout);

// Router from the tasks

router.get('/AllTasks', isAuthenticated , Tasks.Tasks.getAllTasks);
router.get('/FormAddTasks', isAuthenticated , Tasks.Tasks.getFormTasks);
router.post('/AddTasks', Tasks.Tasks.getAddNote);

router.get('/OneTasks/:id', isAuthenticated, Tasks.Tasks.getOneTasks);
router.put('/UpdateTasks/:id', isAuthenticated , Tasks.Tasks.getUpdateTasks);
router.delete('/DeleteTasks/:id', isAuthenticated, Tasks.Tasks.getDeleteTasks);
router.get('/logout' , (req  , res) =>{
    req.logout();
    req.flash('success_mgs', 'You are logged out now.');
    res.redirect('/notes')
})

router.get('**' , (req , res  ) => {
    res.redirect('/notes')
})




module.exports = router;