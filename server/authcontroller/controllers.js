const Todo = require('../model/todoModel');
exports.addtodo = async (req, res, next) => {
    const { addtodo, progress } = req.body;
    try {
        const response = await Todo.create({progress, message : addtodo});
        res.status(200).json({ message: 'Todo added successfully' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });
    }
};

exports.getlist = async(req, res, next)=>{
    try{
        const response = await Todo.find();
        res.status(200).json({list : response});
    }catch(err){
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });
    }
}

exports.deletelist = async (req,res,next)=>{

    const {id} = req.params;
    try{
        const response = await Todo.deleteOne({_id : id});
        res.status(200).json("updated");
    }catch(err){
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });;
    }
}

exports.updatelist = async (req,res,next)=>{
    const{id,to} = req.params;
    try{
         await Todo.updateOne({ _id: id }, { progress: to}); 
        res.status(200).json("updated");
    }catch(err){
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });;
    }
}

exports.updateCheck = async(req,res,next)=>{
    const {id,check}  = req.params;
    try{
        await Todo.updateOne({ _id: id }, { check: check}); 
        res.status(200).json("updated");
    }catch(err){
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });;
    }
}