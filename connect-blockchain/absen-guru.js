import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const setGuruButton = document.getElementById("setGuruButton")
const setGuruButton2 = document.getElementById("setGuruButton2")
connectButton.onclick = connect
setGuruButton.onclick = set_guru
setGuruButton2.onclick = set_guru

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

async function set_guru() {
    var date = new Date()
    var current_date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()

    var current_time = date.getHours() + ":" + date.getMinutes()

    var date_time = current_date + " " + current_time

    const nis = document.getElementById("nip").innerText
    const nama = document.getElementById("nama").innerText
    const long = document.getElementById("long").innerText
    const lat = document.getElementById("lat").innerText
    const tanggal = date_time
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const transactionResponse = await contract.setGuru(nis, nama, long, lat, tanggal)
        await transactionResponse.wait(1)
    } else {
        fundButton.innerHTML = "Please install MetaMask"
    }
}
