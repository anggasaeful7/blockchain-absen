export const contractAddress = "0xDd426D10f6365E3c3075F9Ba1cF43B9f7bBAC483"
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
