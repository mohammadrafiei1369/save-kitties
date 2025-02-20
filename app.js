document.addEventListener('DOMContentLoaded', () => {
    // Presale Configuration
    const config = {
        phaseDays: 6,
        tokenPrice: 0.0006,
        totalSupply: 115000000000,
        allocations: {
            presale: 50000000000,
            team: 15000000000,
            founders: 5000000000,
            liquidity: 20000000000,
            staking: 25000000000
        },
        currentPhase: 1,
        raised: 0
    };

    // DOM Elements
    const dom = {
        timer: document.getElementById('timer'),
        progressBar: document.getElementById('progressBar'),
        cryptoAmount: document.getElementById('cryptoAmount'),
        tokenAmount: document.getElementById('tokenAmount'),
        raised: document.getElementById('raised'),
        contractAddress: document.getElementById('contractAddress')
    };

    // Initialize Systems
    initTimer();
    initTokenomicsChart();
    initWallet();
    initConvertor();

    // Timer System
    function initTimer() {
        let seconds = config.phaseDays * 86400;
        setInterval(() => {
            seconds--;
            const days = Math.floor(seconds / 86400);
            const hours = Math.floor((seconds % 86400) / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            dom.timer.textContent = `${days}d ${hours}h ${minutes}m ${secs}s`;
        }, 1000);
    }

    // Tokenomics Chart
    function initTokenomicsChart() {
        new Chart(document.getElementById('tokenomicsChart'), {
            type: 'pie',
            data: {
                labels: ['Presale (50B)', 'Team (15B)', 'Founders (5B)', 'Liquidity (20B)', 'Staking (25B)'],
                datasets: [{
                    data: Object.values(config.allocations),
                    backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFEAA7', '#74B9FF', '#A55EEA']
                }]
            }
        });
    }

    // Currency Conversion
    function initConvertor() {
        dom.cryptoAmount.addEventListener('input', () => {
            const amount = parseFloat(dom.cryptoAmount.value) || 0;
            dom.tokenAmount.textContent = Math.floor(amount / config.tokenPrice).toLocaleString();
        });
    }

    // Wallet System
    function initWallet() {
        document.querySelectorAll('[data-chain]').forEach(btn => {
            btn.addEventListener('click', async () => {
                try {
                    if(window.ethereum) {
                        await window.ethereum.request({ method: 'eth_requestAccounts' });
                        dom.contractAddress.textContent = 'Connected: ' + btn.dataset.chain;
                    }
                } catch(error) {
                    console.error('Wallet error:', error);
                }
            });
        });
    }

    // Purchase Handler
    window.handlePurchase = () => {
        const tokens = parseInt(dom.tokenAmount.textContent.replace(/,/g, ''));
        if(tokens > 0) {
            config.raised += tokens * config.tokenPrice;
            dom.raised.textContent = config.raised.toLocaleString();
            dom.progressBar.style.width = `${(tokens / 10000000) * 100}%`;
            alert(`Success! Purchased ${tokens.toLocaleString()} SKTS`);
        }
    }

    // Contract Copy
    window.copyContract = () => {
        navigator.clipboard.writeText(dom.contractAddress.textContent);
        alert('Contract address copied!');
    }
});