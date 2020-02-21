'use strict';

const { User } = require('../models/modelsindex');
const passport = require('passport');
let Notes = {};


Notes.getLogin = async (req, res) => {
    res.render('users/login')
}

Notes.getRegister = async (req, res) => {
    res.render('users/register')
}

Notes.signing = passport.authenticate('local' ,{
    failureRedirect: '/notes/login',
    successRedirect: '/notes/AllTasks',
    failureFlash: true
})

// Add new users
Notes.addUser = async (req, res) => {
    const { name, email, password } = req.body;
    const users = await new User()
    users.name = name;
    users.email = email;
    users.password = users.encryptPassword(password);
    await users.save(async (error, success) => {
        if (error) {
            req.flash('error_mgs', 'All fields are required on Email exist');
            res.redirect('/notes/register');
        }
        req.flash('success_mgs', 'new user save successfully ');
        await res.redirect('/notes/login')
    })

}
//  Show all users
Notes.getAll = async (req, res) => {
    const userAll = await User.find({})
    res.render('index')
}

// Show one User

Notes.getOneUser = async (req, res) => {
    const { id } = req.params;
    await User.findOne({ _id: id }, async (error, success) => {
        if (error) return console.error(error)
        await res.status(200).json(success)
    })
}
// Updates One  Users
Notes.getUpdateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    await User.updateOne({ _id: id }, { $set: { name, email } }, async (error, success) => {
        if (error) return console.error(error)
        req.flash('success_mgs', 'user updated successfully ');
        await res.status(200).json(success)
    })
}
// Delete One User
Notes.getDeleteUser = async (req, res) => {
    const { id } = req.params;
    await User.deleteMany({ _id: id }, async (error, success) => {
        if (error) return console.error(error)
        req.flash('success_mgs', 'user deleted successfully ');
        await res.status(200).json(success)
    })
}


Notes.sendAbout = (req, res) => {
    res.render('about')
}

module.exports = {
    Notes
}
