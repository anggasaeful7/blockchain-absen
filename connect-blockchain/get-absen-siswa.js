import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const getSiswaButton = document.getElementById("getSiswaButton")
connectButton.onclick = connect
getSiswaButton.onclick = get_siswa

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

async function get_siswa() {
    const get_nama = document.getElementById("get-nama").value
    const tanggal = document.getElementById("get-tanggal-siswa").value
    const new_tanggal = tanggal.replace(/-/g, "/")
    const jam = document.getElementById("get-jam-siswa").value
    const get_tanggal = new_tanggal + " " + jam
    console.log(get_nama, get_tanggal)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const transactionResponse = await contract.getSiswa(get_nama, get_tanggal)
        console.log(transactionResponse)
        document.getElementById("nis-siswa").innerHTML = transactionResponse[0]
        document.getElementById("nama-siswa").innerHTML = transactionResponse[1]
        document.getElementById("longitude-siswa").innerHTML = transactionResponse[2]
        document.getElementById("latitude-siswa").innerHTML = transactionResponse[3]
        document.getElementById("datetime-siswa").innerHTML = transactionResponse[4]
    } else {
        fundButton.innerHTML = "Please install MetaMask"
    }
}
