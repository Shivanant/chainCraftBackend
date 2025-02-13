import ENV from "../config/config.js";

const networkData = {
    // "80001": {
    //   "name": "Polygon Mumbai",
    //   "rpcUrl": "https://rpc-mumbai.maticvigil.com",
    //   "currencySymbol": "MATIC",
    //   "explorerUrl": "https://mumbai.polygonscan.com",
    //   "faucetUrl": "https://faucet.polygon.technology/",
    //   "apiKey": "YOUR_POLYGONSCAN_API_KEY",
    //   "apiUrl": "https://api-testnet.polygonscan.com/api"
    // },
    // "84531": {
    //   "name": "Base Goerli Testnet",
    //   "rpcUrl": "https://goerli.base.org",
    //   "currencySymbol": "ETH",
    //   "explorerUrl": "https://goerli.basescan.org",
    //   "faucetUrl": "https://www.base.org/faucet",
    //   "apiKey": "YOUR_BASESCAN_API_KEY",
    //   "apiUrl": "https://api-goerli.basescan.org/api"
    // },
    "11155111": {
      "name": "Ethereum Sepolia Testnet",
      "rpcUrl": "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID",
      "currencySymbol": "ETH",
      "explorerUrl": "https://sepolia.etherscan.io",
      "faucetUrl": "https://sepoliafaucet.com/",
      "apiKey": ENV.ETHERSCAN_API_KEY,
      "apiUrl": "https://api-sepolia.etherscan.io/api"
    },
    "80002": {
      "name": "Polygon Amoy Testnet",
      "rpcUrl": "https://rpc-amoy.polygon.technology",
      "currencySymbol": "MATIC",
      "explorerUrl": "https://amoy.polygonscan.com",
      "faucetUrl": "https://faucet.polygon.technology/",
      "apiKey": ENV.POLYGONSCAN_AMOY_API_KEY,
      "apiUrl": "https://api-amoy.polygonscan.com/api"
    },
    "84532": {
      "name": "Base Sepolia Testnet",
      "rpcUrl": "https://sepolia.base.org",
      "currencySymbol": "ETH",
      "explorerUrl": "https://sepolia.basescan.org",
      "faucetUrl": "https://www.base.org/faucet",
      "apiKey": ENV.BASESCAN_SEPOLIA_API_KEY,
      "apiUrl": "https://api-sepolia.basescan.org/api"
    }
  }
  
  export default networkData;