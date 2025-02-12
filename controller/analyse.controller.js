
const analyseContract = async (req , res , next )=>{
    const {contractAddress, chainId}= req.body;
    try {
        if(!contractAddress)return Error;
        console.log(contractAddress, chainId, 5)
        
    } catch (error) {
        
    }
}
export {analyseContract}