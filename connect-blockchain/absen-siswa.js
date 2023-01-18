import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const setSiswaButton = document.getElementById("setSiswaButton")
const setSiswaButton2 = document.getElementById("setSiswaButton2")
connectButton.onclick = connect
setSiswaButton.onclick = set_siswa
setSiswaButton2.onclick = set_siswa

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }
        connectButton.innerHTML = "Connected"
        const accounts = await ethereum.request({ method: "eth_accounts" })
    } else {
        connectButton.innerHTML = "Please install MetaMask"
    }
}

async function set_siswa() {
    const today = new Date()
    const yyyy = today.getFullYear()
    let mm = today.getMonth() + 1 // Months start at 0!
    let dd = today.getDate()

    if (dd < 10) dd = "0" + dd
    if (mm < 10) mm = "0" + mm

    const current_date = yyyy + "/" + mm + "/" + dd

    var current_time = date.getHours() + ":" + date.getMinutes()

    var date_time = current_date + " " + current_time

    const nis = document.getElementById("nis").innerText
    const nama = document.getElementById("nama").innerText
    const long = document.getElementById("long").innerText
    const lat = document.getElementById("lat").innerText
    const tanggal = date_time
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const transactionResponse = await contract.setSiswa(nis, nama, long, lat, tanggal)
        await transactionResponse.wait(1)
    } else {
        fundButton.innerHTML = "Please install MetaMask"
    }
}
