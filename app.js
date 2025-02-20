// Presale Configuration
const PHASE_DURATION = 6 * 24 * 60 * 60; // 6 days in seconds
let remainingTime = PHASE_DURATION;
let currentPhase = 1;
let tokensSold = 0;
const TOKENS_PER_PHASE = 10000000; // 10M tokens per phase

// Exchange Rates (1 SKTS = $0.0006)
const RATES = {
    'ETH': 0.0006 / 3500,  // Example: ETH price $3500
    'SOL': 0.0006 / 150,   // Example: SOL price $150
    'BNB': 0.0006 / 400,   // Example: BNB price $400
    'USDT': 0.0006         // 1 USDT = $1
};

let selectedCurrency = 'ETH';

// Timer System
function updateTimer() {
    const days = Math.floor(remainingTime / 86400);
    const hours = Math.floor((remainingTime % 86400) / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    document.getElementById('timer').textContent = 
        `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if(remainingTime > 0) {
        remainingTime--;
        setTimeout(updateTimer, 1000);
    } else {
        advancePhase();
    }
}

// Phase Management
function advancePhase() {
    currentPhase++;
    remainingTime = PHASE_DURATION;
    tokensSold = 0;
    updateProgress();
    alert(`Phase ${currentPhase} started!`);
}

// Currency Selection
document.querySelectorAll('.currency').forEach(img => {
    img.addEventListener('click', () => {
        document.querySelectorAll('.currency').forEach(c => 
            c.classList.remove('active'));
        img.classList.add('active');
        selectedCurrency = img.dataset.currency;
        calculateTokens();
    });
});

// Token Calculation
function calculateTokens() {
    const input = document.getElementById('cryptoInput').value;
    const amount = parseFloat(input) || 0;
    const tokens = amount / RATES[selectedCurrency];
    document.getElementById('tokenOutput').textContent = 
        `${tokens.toLocaleString()} SKTS`;
}

// Purchase Simulation
function processPurchase() {
    const tokens = parseFloat(
        document.getElementById('tokenOutput').textContent.replace(/,/g, '')
    );
    
    if(tokens > 0) {
        tokensSold += tokens;
        if(tokensSold >= TOKENS_PER_PHASE) advancePhase();
        updateProgress();
        alert(`Success! Purchased ${tokens.toLocaleString()} SKTS`);
    }
}

// Progress Updates
function updateProgress() {
    const progress = (tokensSold / TOKENS_PER_PHASE) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateTimer();
    calculateTokens();
});