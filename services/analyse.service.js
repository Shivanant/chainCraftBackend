import networkData from "../utils/networks.js";
import SuccessResponse from '../lib/success.res.js'
import ErrorResponse from '../lib/error.res.js'

class AnalysisService{
    constructor(){

    }

    
    async isUpgradableToken(tokenAddress, apiUrl, apiKey,next) {
        try {
            // Fetch contract details from Etherscan or other block explorers
            const response = await fetch(`${apiUrl}?module=contract&action=getsourcecode&address=${tokenAddress}&apikey=${apiKey}`);
            const data = await response.json();
            console.log(data,14)
            
            if (data.status !== "1" || !data.result || data.result.length === 0) {
                console.error("Error fetching contract details.");
                return next(ErrorResponse.badRequest("Error fetching contract details."))
            }
    
            // Check if the contract contains proxy patterns or upgradeability indicators
            const contractInfo = data.result[0];
            const sourceCode = contractInfo.SourceCode;
            const proxy = contractInfo.Proxy;
            const implementationAddress = contractInfo.Implementation;
            console.log(implementationAddress,28)
            // result: [
            //     {
            //       SourceCode: '',
            //       ABI: 'Contract source code not verified',
            //       ContractName: '',
            //       CompilerVersion: '',
            //       OptimizationUsed: '',
            //       Runs: '',
            //       ConstructorArguments: '',
            //       EVMVersion: 'Default',
            //       Library: '',
            //       LicenseType: 'Unknown',
            //       Proxy: '0',
            //       Implementation: '',
            //       SwarmSource: ''
            //     }
            //   ]
            // } 14
            //  28
            // The token at 0x527193C3d3063549f82A164c90F6Db4C0eDF436F is NOT upgradable.
            // {
            //   status: '1',
            //   message: 'OK',
            //   result: [
            //     {
            //       SourceCode: '',
            //       ABI: 'Contract source code not verified',
            //       ContractName: '',
            //       CompilerVersion: '',
            //       OptimizationUsed: '',
            //       Runs: '',
            //       ConstructorArguments: '',
            //       EVMVersion: 'Default',
            //       Library: '',
            //       LicenseType: 'Unknown',
            //       Proxy: '0',
            //       Implementation: '',
            //       SwarmSource: ''
            //     }
            //   ]
            // } 14
            //  28
            // The token at 0x3d8c0880b366dfcf32949094c68f0c3e6dc811d8 is NOT upgradable.
            
            if (proxy === "1" || implementationAddress) {
                console.log(`The token at ${tokenAddress} is upgradable.`);
                return true;
            }
    
            if (sourceCode.includes("TransparentUpgradeableProxy") || sourceCode.includes("UUPSUpgradeable")) {
                console.log(`The token at ${tokenAddress} follows a known upgradeable proxy pattern.`);
                return true;
            }
    
            console.log(`The token at ${tokenAddress} is NOT upgradable.`);
            return false;
        } catch (error) {
            console.error("Error checking token upgradeability:", error);
            return next(ErrorResponse.serviceUnavailable("Error checking token upgradeability"));
        }
    }

    async analyse(req, res, next) {
        try {
            const { chainId, contractAddress } = req.body;

            // Check if the chainId exists in the networkData
            if (!networkData[chainId]) {
                return res.status(400).json({ error: `Invalid chainId: ${chainId}. Network not supported.` });
            }

            const { apiUrl, apiKey } = networkData[chainId];
            
            const isUpgradable = await this.isUpgradableToken(contractAddress, apiUrl, apiKey,next);
            return {
                data:{ contractAddress, isUpgradable },
                message:"Analysis Success!"
            }
            } catch (error) {
            console.error("Error analyzing contract:", error);
            return next(ErrorResponse.internalServer())
        }
    }
}

export default new AnalysisService();