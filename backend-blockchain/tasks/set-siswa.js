const { task } = require("hardhat/config")

task("set-siswa", "Set Siswa Attandance").setAction(async (taskArgs, hre) => {
    let nis = "123"
    let nama = "Agus"
    let kelas = "XII MIpa 4"
    let mapel = "Matematika"
    let longitude = "123.456"
    let latitude = "123.456"
    let datetime = "29/11/2022 22:00:00"
    const contract = await hre.ethers.getContractAt(
        "Attandance",
        "0x2BC7FE19E9e64d8F319B03eD5DCfe491E0C0Be40"
    )
    const setAbsen = await contract.setSiswa(
        nis,
        nama,
        kelas,
        mapel,
        longitude,
        latitude,
        datetime
    )
    await setAbsen.wait(1)
})

module.exports = {}
