class AnalysisService{
    constructor(){

    }

    async analyse(req, res, next){
        const { chainId , contractAddress}= req.body;
        console.log(chainId, contractAddress);
    }
}

export default new AnalysisService();