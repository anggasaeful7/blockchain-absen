export const contractAddress = "0x2bc7fe19e9e64d8f319b03ed5dcfe491e0c0be40"
export const abi = [
    {
        inputs: [
            {
                internalType: "string",
                name: "nama",
                type: "string",
            },
            {
                internalType: "string",
                name: "datetime",
                type: "string",
            },
        ],
        name: "getGuru",
        outputs: [
            {
                internalType: "string[]",
                name: "",
                type: "string[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "nama",
                type: "string",
            },
            {
                internalType: "string",
                name: "datetime",
                type: "string",
            },
        ],
        name: "getSiswa",
        outputs: [
            {
                internalType: "string[]",
                name: "",
                type: "string[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "nip",
                type: "string",
            },
            {
                internalType: "string",
                name: "nama",
                type: "string",
            },
            {
                internalType: "string",
                name: "longitude",
                type: "string",
            },
            {
                internalType: "string",
                name: "latitude",
                type: "string",
            },
            {
                internalType: "string",
                name: "datetime",
                type: "string",
            },
        ],
        name: "setGuru",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "nis",
                type: "string",
            },
            {
                internalType: "string",
                name: "nama",
                type: "string",
            },
            {
                internalType: "string",
                name: "kelas",
                type: "string",
            },
            {
                internalType: "string",
                name: "mapel",
                type: "string",
            },
            {
                internalType: "string",
                name: "longitude",
                type: "string",
            },
            {
                internalType: "string",
                name: "latitude",
                type: "string",
            },
            {
                internalType: "string",
                name: "datetime",
                type: "string",
            },
        ],
        name: "setSiswa",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]
