const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

// describe("SimpleStorage", () => {})
describe("Attanndance", function () {
    // let simpleStorageFactory
    // let simpleStorage
    let AttandanceFactory, attandance
    beforeEach(async function () {
        AttandanceFactory = await ethers.getContractFactory("SMA")
        console.log("Deploying contract...")
        attandance = await AttandanceFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const setAbsen = await attandance.setAbsen(
            "123",
            "Nanta",
            "XII MIpa 1",
            "Semarang",
            "10/11/2022"
        )
        await setAbsen.wait(1)

        const expectedValue =
            ("123", "Nanta", "XII MIpa 1", "Semarang", "10/11/2022")
        const currentValue = await attandance.getAbsen("Nanta", "10/11/2022")
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })

    // Extra - this is not in the video
    it.only("Should work correctly with the people struct and array", async function () {
        const expecteNIS = "123"
        const expectedName = "Nanta"
        const expectedKelas = "XII MIpa 1"
        const expectedAlamat = "Semarang"
        const transactionResponse = await attandance.setAbsen(
            expecteNIS,
            expectedName,
            expectedKelas,
            expectedAlamat
        )
        await transactionResponse.wait(1)
        const currentValue = await attandance.getAbsen("Nanta", "10/11/2022")
        // We could also do it like this
        // const person = await simpleStorage.people(0)
        // const favNumber = person.favoriteNumber
        // const pName = person.name

        assert.equal(currentValue.nis, expecteNIS)
        // assert.equal(favoriteNumber, expectedFavoriteNumber)
    })
})
