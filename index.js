import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
const balanceButton = document.getElementById("balanceButton")
const withdrawButton = document.getElementById("withdrawButton")
balanceButton.onclick = getBalance
connectButton.onclick = connect
fundButton.onclick = fund
withdrawButton.onclick = withdraw
console.log(ethers)

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        connectButton.innerHTML = "Connected"
        console.log("connected!")
    } else {
        connectButton.innerHTML = "Please INstall metamask"
    }
}

async function getBalance() {
    if (typeof window.ethereum != "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const balance = await provider.getBalance(contractAddress)
        console.log(ethers.utils.formatEther(balance))
    }
}

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value
    console.log(`Funding with ${ethAmount}...`)
    if (typeof window.ethereum !== "undefined") {
        //provider / connection to the blockchain
        // signer / wallet / someone with some gas
        //contract that we are interacting with
        // ^ABI & Address
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner() //metamask에 connect된 계정 eg.Account1
        console.log(signer)
        const contract = new ethers.Contract(contractAddress, abi, signer) //
        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })
            // listen for the tx to be mined
            await listenForTransactionMine(transactionResponse, provider)
            console.log("done!")
            // listen for an event <- I haven't learned about yet!
        } catch (error) {
            console.log(error)
        }
    }
    //not async
}
function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}...`)

    //listen for this transaction to finish
    return new Promise((resolve, reject) => {
        provider.once(
            transactionResponse.hash,
            /**listener */ (transactionReceipt) => {
                console.log(`Completed with ${transactionReceipt.confirmations} confirmations`)
                resolve()
            }
        )
    })
    //ethers
    //create a listener for the blockchain
}
async function withdraw() {
    if (typeof window.ethereum != "undefined") {
        console.log("Withdrawing...")
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.withdraw()
            await listenForTransactionMine(transactionResponse, provider)
        } catch (error) {
            console.log(error)
        }
    }
}
