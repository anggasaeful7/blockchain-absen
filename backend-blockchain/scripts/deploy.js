// imports
const { ethers, run, network } = require("hardhat")

// async main
async function main() {
    const AttandanceFactory = await ethers.getContractFactory("Attandance")
    console.log("Deploying contract...")
    const attandance = await AttandanceFactory.deploy()
    await attandance.deployed()
    console.log(`Deployed contract to: ${attandance.address}`)
    // what happens when we deploy to our hardhat network?
    if (network.config.chainId === 80001 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        await attandance.deployTransaction.wait(6)
        await verify(attandance.address, [])
    }
}

// async function verify
const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
