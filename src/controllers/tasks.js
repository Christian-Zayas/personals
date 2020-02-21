const {  Note } = require('../models/modelsindex');

let Tasks = {};
// Add One Tasks
Tasks.getAddNote = async (req , res) => {
    const { title , description } = req.body;
    const note =  await new Note();
         note.title = title.trim();
         note.description =  description.trim();
         note.IdUser = req.user.id;
         note.userName = req.user.name;
         await note.save( async (error , success) => {
            if (error) return console.error(error)
            req.flash('success_mgs' , 'save successfully');
            await res.redirect('/notes/AllTasks');
          })
}
// Redirect  a form add tasks
Tasks.getFormTasks =  async ( req , res ) => {
    res.render('notes/new-tasks')
}
// Show All  Tasks
Tasks.getAllTasks = async (req , res) => {
      await Note.find({IdUser: req.user.id }, async (error , success) => {
        if (error) return console.error(error)
        await res.render('notes/views-tasks' , { success });
    }).sort({createdAt: -1})
    
}

// Show one Tasks
Tasks.getOneTasks = async (req , res ) => {
    const { id } =  req.params;
    
     await Note.findOne({ _id :  id }, async (error , success) => {
        if (error) return console.error(error)
        if (success.IdUser != req.user.id) {
           req.flash('error_mgs' , 'Not Authorized');
           return res.redirect('/notes/AllTasks');
        }
        await res.render('notes/edict' , { success })
    })
}

// Updates One  Tasks
Tasks.getUpdateTasks =  async (req , res) => {
    const { id } = req.params;
    const { title , description } = req.body;
    await Note.updateOne({_id: id} , {$set : { title ,  description }} , async (error , success) => {
        if (error) return console.error(error)
        req.flash('success_mgs' , 'update successfully');
        await res.redirect('/notes/AllTasks');
    })
}
// Delete One Tasks
Tasks.getDeleteTasks = async (req , res) => {
    const { id } = req.params;
    await Note.deleteMany({_id : id } , async (error , success) => {
        if (error) return console.error(error)
        req.flash('success_mgs' , 'delete successfully');
        await res.redirect('/notes/AllTasks');    
    })
}


module.exports = { Tasks }