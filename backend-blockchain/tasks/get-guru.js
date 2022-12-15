const { task } = require("hardhat/config")

task("get-guru", "Get Information of Guru Attandance").setAction(
    async (taskArgs, hre) => {
        let nama = "Pak Agus"
        let datetime = "29/11/2022 22:00:00"
        const contract = await hre.ethers.getContractAt(
            "Attandance",
            "0x2BC7FE19E9e64d8F319B03eD5DCfe491E0C0Be40"
        )
        const getAbsen = await contract.getGuru(nama, datetime)

        console.log(`Who's absen : ${getAbsen[1]}`)
    }
)

module.exports = {}
