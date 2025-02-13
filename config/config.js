import dotenv from "dotenv"
dotenv.config()

const ENV= {
    port:process.env.port,
    BASESCAN_SEPOLIA_API_KEY:process.env.BASESCAN_SEPOLIA_API_KEY,
    POLYGONSCAN_AMOY_API_KEY:process.env.POLYGONSCAN_AMOY_API_KEY,
    ETHERSCAN_API_KEY:process.env.ETHERSCAN_API_KEY
}

export default ENV;