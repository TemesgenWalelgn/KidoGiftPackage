// ==========================
// Tab Switching & Price Sorting
// ==========================
function showTab(tabId) {
    const containers = document.querySelectorAll('.container');
    containers.forEach(c => c.classList.remove('active'));

    const activeContainer = document.getElementById(tabId);
    if (activeContainer) activeContainer.classList.add('active');

    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));

    const activeTab = document.querySelector(`.tab-btn[onclick="showTab('${tabId}')"]`);
    if (activeTab) activeTab.classList.add('active');

    const priceSortDropdown = document.getElementById('price-sort');
    if (priceSortDropdown) priceSortDropdown.value = 'default';
    sortPackages(activeContainer);
}

function sortPackages(container = null) {
    if (!container) container = document.querySelector('.container.active');
    if (!container) return;

    const sortValue = document.getElementById('price-sort')?.value || 'default';
    const cards = Array.from(container.querySelectorAll('.card'));

    cards.sort((a, b) => {
        const priceA = parseInt(a.getAttribute('data-price')) || 0;
        const priceB = parseInt(b.getAttribute('data-price')) || 0;
        if (sortValue === 'low-to-high') return priceA - priceB;
        if (sortValue === 'high-to-low') return priceB - priceA;
        return 0;
    });

    cards.forEach(card => container.appendChild(card));
}

// ==========================
// Order Button Handler (Event Delegation)
// ==========================
document.addEventListener('click', function(event) {
    // Check if the clicked element is an order button
    if (event.target.classList.contains('order-btn')) {
        event.preventDefault(); // Stop page jump
        handleOrder(event);
    }
});

function handleOrder(event) {
    const button = event.target;
    const packageName = button.getAttribute('data-package-name');
    const telegramUsername = 'kido1222';

    const originalText = button.innerHTML;
    button.innerHTML = 'ትዕዛዝ ተልኳል! ✅';
    button.classList.add('confirmed');
    button.disabled = true;

    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('confirmed');
        button.disabled = false;
    }, 2000);

    const amharicPhrase = "ዌብሳይታችሁ ላይ ካየሁት ፓኬጅ ውስጥ ይሄንን ማዘዝ እፈልጋለው";
    const callToAction = "አመሰግናለው";
    const message = `ሰላም @${telegramUsername}፣\n\n${amharicPhrase}:\n\n*${packageName}*\n\n${callToAction}`;
    const encodedMessage = encodeURIComponent(message);
    const telegramUrl = `https://t.me/${telegramUsername}?text=${encodedMessage}`;

    window.open(telegramUrl, '_blank');
}

// ==========================
// Initialization
// ==========================
// Defined empty function to prevent crash if updateCountdown is not used
function updateCountdown() {} 

document.addEventListener('DOMContentLoaded', () => {
    showTab('setoch'); // set default tab
    document.getElementById('price-sort')?.addEventListener('change', () => sortPackages());
});

// Image Popup
function openImage(img){
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    modal.style.display = "flex";
    modalImg.src = img.src;
}

function closeImage(){
    document.getElementById("imageModal").style.display = "none";
}