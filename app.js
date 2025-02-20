// Presale Configuration
const PRESALE_CONFIG = {
    phaseDuration: 6 * 24 * 60 * 60 * 1000, // 6 days in ms
    tokenPrice: 0.0006, // $0.0006 per token
    phaseTokens: 10000000, // 10M tokens per phase
    currentPhase: 1,
    tokensSold: 0,
    totalRaised: 0
};

// Initialize Web3
let web3;

// DOM Elements
const elements = {
    countdown: document.getElementById('countdown'),
    progressBar: document.getElementById('progressBar'),
    cryptoInput: document.getElementById('cryptoInput'),
    tokenAmount: document.getElementById('tokenAmount'),
    selectedCurrency: document.getElementById('selectedCurrency'),
    totalRaised: document.getElementById('totalRaised'),
    progressPercent: document.getElementById('progressPercent')
};

// Animated Loader
function showLoader() {
    document.body.classList.add('loading');
}

function hideLoader() {
    document.body.classList.remove('loading');
}

// Full Wallet Integration
async function connectWallet(chain) {
    try {
        showLoader();
        switch(chain) {
            case 'ethereum':
                if(window.ethereum) {
                    await window.ethereum.enable();
                    web3 = new Web3(window.ethereum);
                }
                break;
            // Add other chains similarly
        }
        updateUI();
    } catch(error) {
        console.error('Wallet Error:', error);
    } finally {
        hideLoader();
    }
}

// Complete Purchase Handler
async function handlePurchase() {
    if(!web3) {
        alert('Connect wallet first!');
        return;
    }

    const amount = parseFloat(elements.cryptoInput.value);
    const accounts = await web3.eth.getAccounts();
    
    try {
        const tx = await web3.eth.sendTransaction({
            from: accounts[0],
            to: 'YOUR_CONTRACT_ADDRESS',
            value: web3.utils.toWei(amount.toString(), 'ether')
        });
        
        updatePurchase(tx);
    } catch(error) {
        console.error('Transaction Failed:', error);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTimer();
    initCurrencySelector();
    initWallet();
});
