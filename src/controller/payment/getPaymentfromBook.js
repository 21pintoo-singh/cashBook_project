const bookschema=require('../../module/book.schema')
const Payschema=require('../../module/cash.schema')


const getPaymenetList=async (req,res)=>{
    try{
    let bookid=req.params.bookId
    let userId=req.decodeToken.user
    let bookidverify=await bookschema.findOne({_id:bookid,isDeleted:false,userId:userId}).select({createdAt:0,updatedAt:0,__v:0}).catch(err=>null)
    if(!bookidverify) return res.status(404).send({status:false,message:"No Book found"})
    let paylist=await Payschema.find({bookId:bookid,userId:userId}) 
    let op={
        timeStamp:bookidverify.timeStamp,
        _id:bookidverify._id,
        name:bookidverify.name,
        userId:bookidverify.userId,
        remark:bookidverify.remark,
        isDelete:bookidverify.isDeleted,
        paymentList:paylist
    }
    res.send(op)
}
catch(er){
res.send(er.message)
}
}
module.exports=getPaymenetList