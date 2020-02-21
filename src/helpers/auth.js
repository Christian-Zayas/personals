const helpers = {} ;

helpers.isAuthenticated = async (req , res ,  next ) => {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('error_mgs' , 'Not Authorized');
    await res.redirect('/notes/login')
}

helpers.isNotAuthenticated = async (req , res , next) => {
    if(!req.isAuthenticated()){
        return next();
    }
     await res.redirect('/notes/AllTasks')
}


module.exports = helpers;