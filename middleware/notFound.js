export const notFound = async function(req,res,next) { 
    res.status(404).send({msg:'Route not found !'});
    // next();
}