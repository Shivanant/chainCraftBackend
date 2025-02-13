import analyseService from '../services/analyse.service.js';
import SuccessResponse from '../lib/success.res.js'
import ErrorResponse from '../lib/error.res.js'

const analyseContract = async (req , res , next )=>{
    const {contractAddress, chainId}= req.body;
    try {
        if(!contractAddress)return next(ErrorResponse.badRequest("please enter token address !"))
        if(!chainId)return next(ErrorResponse.badRequest("please enter chainId !"))
         const data = await analyseService.analyse(req,res,next);
        if  (data) SuccessResponse.ok(res,data.message,data.data)
        
    } catch (error) {
        
    }
}
export {analyseContract}