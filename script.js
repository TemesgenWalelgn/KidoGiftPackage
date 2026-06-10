// ==========================
// Tab Switching & Price Sorting
// ==========================
function showTab(tabId) {
    // 1. Hide all containers
    const containers = document.querySelectorAll('.container');
    containers.forEach(c => c.classList.remove('active'));

    // 2. Show selected container
    const activeContainer = document.getElementById(tabId);
    if (activeContainer) activeContainer.classList.add('active');

    // 3. Deactivate all tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));

    // 4. Activate clicked tab
    const activeTab = document.querySelector(`.tab-btn[onclick="showTab('${tabId}')"]`);
    if (activeTab) activeTab.classList.add('active');

    // 5. Reset sort dropdown and sort packages
    const priceSortDropdown = document.getElementById('price-sort');
    if (priceSortDropdown) priceSortDropdown.value = 'default';
    sortPackages(activeContainer);
}

function sortPackages(container = null) {
    // If container not passed, get the active one
    if (!container) container = document.querySelector('.container.active');
    if (!container) return; // exit if no active container

    const sortValue = document.getElementById('price-sort')?.value || 'default';
    const cards = Array.from(container.querySelectorAll('.card'));

    // Sort logic
    cards.sort((a, b) => {
        const priceA = parseInt(a.getAttribute('data-price')) || 0;
        const priceB = parseInt(b.getAttribute('data-price')) || 0;

        if (sortValue === 'low-to-high') return priceA - priceB;
        if (sortValue === 'high-to-low') return priceB - priceA;
        return 0; // default
    });

    // Re-append sorted cards
    cards.forEach(card => container.appendChild(card));
}

// Attach sorting on dropdown change
document.getElementById('price-sort')?.addEventListener('change', () => sortPackages());

// ==========================
// Order Button Handler
// ==========================
function handleOrder(event) {
    event.preventDefault();

    const button = event.currentTarget;
    const packageName = button.getAttribute('data-package-name');
    const telegramUsername = 'kido1222';

    // 1. Show confirmation feedback
    const originalText = button.innerHTML;
    button.innerHTML = 'ትዕዛዝ ተልኳል! ✅';
    button.classList.add('confirmed');
    button.disabled = true;

    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('confirmed');
        button.disabled = false;
    }, 2000);

    // 2. Telegram message
    const amharicPhrase = "ዌብሳይታችሁ ላይ ካየሁት ፓኬጅ ውስጥ ይሄንን ማዘዝ እፈልጋለው";
    const callToAction = "አመሰግናለው";
    const message = `ሰላም @${telegramUsername}፣\n\n${amharicPhrase}:\n\n*${packageName}*\n\n${callToAction}`;
    const encodedMessage = encodeURIComponent(message);
    const telegramUrl = `https://t.me/${telegramUsername}?text=${encodedMessage}`;

    // Open Telegram in new tab
    window.open(telegramUrl, '_blank');
}

function updateCountdown() {

    // Father's Day 2026
    const fathersDay = new Date("June 21, 2026 00:00:00").getTime();

    const now = new Date().getTime();
    const distance = fathersDay - now;

    if(distance < 0){
        document.getElementById("countdown").innerHTML =
        "🎉 Happy Father's Day!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24))
                 / (1000 * 60 * 60));

    const minutes = Math.floor((distance % (1000 * 60 * 60))
                   / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60))
                   / 1000);

    document.getElementById("countdown").innerHTML =
        `👔 Father's Day in ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ==========================
// Initialize on Page Load
// ==========================
document.addEventListener('DOMContentLoaded', () => {
    showTab('abat'); // set default tab
    
       // Attach the click handler to all 'Order Now' buttons
    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach(button => {
        button.addEventListener('click', handleOrder);
    });
});
//image click popup
function openImage(img){
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");

    modal.style.display = "flex";
    modalImg.src = img.src;
}

function closeImage(){
    document.getElementById("imageModal").style.display = "none";
}
