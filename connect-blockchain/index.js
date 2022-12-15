import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const getGuruButton = document.getElementById("getGuruButton")
const getSiswaButton = document.getElementById("getSiswaButton")
const setGuruButton = document.getElementById("setGuruButton")
const setSiswaButton = document.getElementById("setSiswaButton")
connectButton.onclick = connect
getGuruButton.onclick = get_guru
getSiswaButton.onclick = get_siswa
setGuruButton.onclick = set_guru
setSiswaButton.onclick = set_siswa

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
    const get_tanggal = document.getElementById("get-tanggal-guru").value
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

async function get_siswa() {
    const get_nama = document.getElementById("get-nama").value
    const get_tanggal = document.getElementById("get-tanggal-siswa").value
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner("0x71dFB7Ad8a9fFbddA327AF27aD680C3b9ed4B3AC")
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const transactionResponse = await contract.getSiswa(get_nama, get_tanggal)
        console.log(transactionResponse)
        document.getElementById("nis").innerHTML = transactionResponse[0]
        document.getElementById("nama").innerHTML = transactionResponse[1]
        document.getElementById("kelas-siswa").innerHTML = transactionResponse[2]
        document.getElementById("mapel-siswa").innerHTML = transactionResponse[3]
        document.getElementById("long").innerHTML = transactionResponse[4]
        document.getElementById("lat").innerHTML = transactionResponse[5]
        document.getElementById("datetime-siswa").innerHTML = transactionResponse[6]
    } else {
        fundButton.innerHTML = "Please install MetaMask"
    }
}

async function set_guru() {
    var date = new Date()
    var current_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()

    var current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

    var date_time = current_date + " " + current_time

    console.log("set")
    const nis = document.getElementById("nip")
    const nama = document.getElementById("nama")
    const long = document.getElementById("long")
    const lat = document.getElementById("lat")
    const tanggal = date_time
    console.log(nis, nama, long, lat, tanggal)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner("0x71dFB7Ad8a9fFbddA327AF27aD680C3b9ed4B3AC")
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const transactionResponse = await contract.setGuru(nis, nama, long, lat, tanggal)
        await transactionResponse.wait(1)
        console.log(transactionResponse)
        document.getElementById("response-guru").innerHTML = "WORK GAN !!!!"
    } else {
        fundButton.innerHTML = "Please install MetaMask"
    }
}

async function set_siswa() {
    console.log("set")
    const nis = document.getElementById("nis").value
    const nama = document.getElementById("nama").value
    const kelas = document.getElementById("set-kelas-siswa").value
    const mapel = document.getElementById("set-mapel-siswa").value
    const long = document.getElementById("long").value
    const lat = document.getElementById("lat").value
    const tanggal = document.getElementById("set-datetime-siswa").value
    console.log(nis, nama, kelas, mapel, long, lat, tanggal)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner("0x71dFB7Ad8a9fFbddA327AF27aD680C3b9ed4B3AC")
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const transactionResponse = await contract.setSiswa(
            nis,
            nama,
            kelas,
            mapel,
            long,
            lat,
            tanggal
        )
        await transactionResponse.wait(1)
        console.log(transactionResponse)
        document.getElementById("response-siswa").innerHTML = "WORK GAN !!!!"
    } else {
        fundButton.innerHTML = "Please install MetaMask"
    }
}
