export const getAllTasks = async function (req,res) { 
    res.status(200).send({msg:'Tasks fetched successfully !'});
}