import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const getGuruButton = document.getElementById("getGuruButton")
const getGuruButton2 = document.getElementById("getGuruButton2")
connectButton.onclick = connect
getGuruButton.onclick = get_guru

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }
        connectButton.innerHTML = "Connected"
        const accounts = await ethereum.request({ method: "eth_accounts" })
        console.log(accounts)
    } else {
        connectButton.innerHTML = "Please install MetaMask"
    }
}

async function get_guru() {
    const get_nama = document.getElementById("get-nama-guru").value
    const tanggal = document.getElementById("get-tanggal-guru").value
    const jam = document.getElementById("get-jam-guru").value
    const get_tanggal = tanggal + " " + jam
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const transactionResponse = await contract.getGuru(get_nama, get_tanggal)
        console.log(transactionResponse)
        document.getElementById("nip-guru").innerHTML = transactionResponse[0]
        document.getElementById("nama-guru").innerHTML = transactionResponse[1]
        document.getElementById("longitude-guru").innerHTML = transactionResponse[2]
        document.getElementById("latitude-guru").innerHTML = transactionResponse[3]
        document.getElementById("datetime-guru").innerHTML = transactionResponse[4]
    } else {
        fundButton.innerHTML = "Please install MetaMask"
    }
}
