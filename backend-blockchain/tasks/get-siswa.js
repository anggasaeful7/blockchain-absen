const { task } = require("hardhat/config")

task("get-siswa", "Get Information of Siswa Attandance").setAction(
    async (taskArgs, hre) => {
        let nama = "Agus"
        let datetime = "29/11/2022 22:00:00"
        const contract = await hre.ethers.getContractAt(
            "Attandance",
            "0xDd426D10f6365E3c3075F9Ba1cF43B9f7bBAC483"
        )
        const getAbsen = await contract.getSiswa(nama, datetime)

        console.log(`Who's absen : ${getAbsen[1]}`)
    }
)

module.exports = {}
