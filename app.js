// Save Kitties Presale System
const PHASE_DURATION = 6 * 24 * 60 * 60; // 6 days in seconds
let remainingTime = PHASE_DURATION;
let currentPhase = 1;
let tokensSold = 0;
const PHASE_TOKENS = 10000000; // 10M tokens per phase

// DOM Elements
let cryptoInput, tokenOutput;

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
    }
}

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    cryptoInput = document.getElementById('cryptoInput');
    tokenOutput = document.getElementById('tokenOutput');
    
    // Event listeners
    document.querySelectorAll('.currency').forEach(img => {
        img.addEventListener('click', () => handleCurrencySelect(img));
    });
    
    cryptoInput.addEventListener('input', calculateTokens);
    
    // Start systems
    updateTimer();
    calculateTokens(); // Initial calculation
});

// Currency Selection Handler
function handleCurrencySelect(img) {
    document.querySelectorAll('.currency').forEach(c => 
        c.classList.remove('active'));
    img.classList.add('active');
    selectedCurrency = img.dataset.currency;
    calculateTokens();
}

// Rest of your code remains the same...
